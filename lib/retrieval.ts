import { POLICIES, PolicyChunk } from "./policies";

/**
 * Lightweight TF-IDF + cosine similarity retrieval engine.
 *
 * This avoids pulling in a heavyweight embedding model (which is overkill
 * for a small, fixed-size policy corpus and doesn't play nicely with
 * serverless cold starts on Vercel). TF-IDF vectorization + cosine
 * similarity is a standard information-retrieval technique and is what
 * powers the "R" (retrieval) in this Retrieval-Augmented Generation setup.
 */

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "to", "of", "in", "on", "for", "and", "or", "but", "if", "so",
  "i", "you", "he", "she", "it", "we", "they", "my", "your", "our",
  "do", "does", "did", "can", "could", "should", "would", "will",
  "what", "how", "when", "where", "who", "which", "with", "at", "by",
  "as", "this", "that", "these", "those", "there", "have", "has", "had",
  "get", "got", "me", "am",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

interface IndexedDoc {
  chunk: PolicyChunk;
  termFreq: Map<string, number>;
}

class TfIdfIndex {
  private docs: IndexedDoc[] = [];
  private idf: Map<string, number> = new Map();
  private vocabBuilt = false;

  constructor(chunks: PolicyChunk[]) {
    for (const chunk of chunks) {
      const tokens = tokenize(`${chunk.section} ${chunk.text}`);
      const termFreq = new Map<string, number>();
      for (const t of tokens) {
        termFreq.set(t, (termFreq.get(t) || 0) + 1);
      }
      this.docs.push({ chunk, termFreq });
    }
    this.buildIdf();
  }

  private buildIdf() {
    const df = new Map<string, number>();
    for (const doc of this.docs) {
      for (const term of doc.termFreq.keys()) {
        df.set(term, (df.get(term) || 0) + 1);
      }
    }
    const N = this.docs.length;
    for (const [term, count] of df.entries()) {
      this.idf.set(term, Math.log(1 + N / count));
    }
    this.vocabBuilt = true;
  }

  private vectorize(termFreq: Map<string, number>): Map<string, number> {
    const vec = new Map<string, number>();
    for (const [term, freq] of termFreq.entries()) {
      const idf = this.idf.get(term) ?? Math.log(1 + this.docs.length);
      vec.set(term, freq * idf);
    }
    return vec;
  }

  private cosineSim(a: Map<string, number>, b: Map<string, number>): number {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (const [term, val] of a.entries()) {
      normA += val * val;
      if (b.has(term)) dot += val * (b.get(term) as number);
    }
    for (const val of b.values()) normB += val * val;
    if (normA === 0 || normB === 0) return 0;
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  search(query: string, topK = 4): { chunk: PolicyChunk; score: number }[] {
    if (!this.vocabBuilt) this.buildIdf();
    const queryTokens = tokenize(query);
    const queryTf = new Map<string, number>();
    for (const t of queryTokens) queryTf.set(t, (queryTf.get(t) || 0) + 1);
    const queryVec = this.vectorize(queryTf);

    const scored = this.docs.map((doc) => ({
      chunk: doc.chunk,
      score: this.cosineSim(queryVec, this.vectorize(doc.termFreq)),
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK).filter((s) => s.score > 0);
  }
}

// Built once per serverless function instance (cheap: ~18 short docs).
let indexSingleton: TfIdfIndex | null = null;

export function getRetriever(): TfIdfIndex {
  if (!indexSingleton) {
    indexSingleton = new TfIdfIndex(POLICIES);
  }
  return indexSingleton;
}
