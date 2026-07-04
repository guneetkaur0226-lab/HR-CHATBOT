"use client";

import { useEffect, useRef, useState } from "react";

interface Source {
  title: string;
  section: string;
  code: string;
  score: number;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  isError?: boolean;
}

const FILES = [
  { code: "HR-LV-01", title: "Leave Policy" },
  { code: "HR-WFH-02", title: "Remote & Hybrid Work" },
  { code: "HR-FIN-03", title: "Expense & Reimbursement" },
  { code: "HR-CD-04", title: "Code of Conduct" },
  { code: "HR-ON-05", title: "Onboarding Guide" },
  { code: "HR-BN-06", title: "Benefits Overview" },
  { code: "HR-EX-07", title: "Offboarding & Exit" },
];

const SUGGESTIONS = [
  "How many annual leave days do I get?",
  "What's the process for parental leave?",
  "Can I work remotely, and how many days?",
  "How long do I have to submit an expense claim?",
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello — I'm Ask HR. I answer questions using the company's actual policy documents, and I'll always point to the source. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const newHistory: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: newHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Something went wrong. Please try again.",
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer, sources: data.sources },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Couldn't reach the server. Please check your connection and try again.",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-72 shrink-0 bg-ink text-paper px-6 py-8 lg:min-h-screen flex flex-col">
        <div>
          <p className="font-mono text-[11px] tracking-[0.25em] text-brass-light uppercase">
            Personnel Files
          </p>
          <h1 className="font-display italic text-3xl mt-2 leading-tight">
            Ask HR
          </h1>
          <p className="text-sm text-paper/60 mt-3 leading-relaxed">
            Answers are grounded in the documents on file below — nothing is
            invented.
          </p>
        </div>

        <div className="mt-8 space-y-2">
          {FILES.map((f) => (
            <div
              key={f.code}
              className="flex items-center gap-3 bg-ink-light/70 border border-white/5 rounded-sm px-3 py-2.5"
            >
              <span className="font-mono text-[10px] text-brass-light shrink-0">
                {f.code}
              </span>
              <span className="text-sm text-paper/85">{f.title}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8 hidden lg:block">
          <p className="text-[11px] font-mono text-paper/35 leading-relaxed">
            Demo project — retrieval via TF-IDF + cosine similarity,
            generation via Google Gemini. Not affiliated with a real employer.
          </p>
        </div>
      </aside>

      {/* Chat panel */}
      <section className="flex-1 flex flex-col bg-paper">
        <header className="border-b border-charcoal/10 px-6 lg:px-10 py-5 flex items-center justify-between">
          <div>
            <p className="font-display italic text-xl">Ask a question about company policy</p>
            <p className="text-xs text-charcoal/50 mt-0.5">
              Grounded answers, with sources cited every time
            </p>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-sage bg-sage/10 border border-sage/25 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            live
          </span>
        </header>

        <div
          ref={scrollRef}
          className="chat-scroll flex-1 overflow-y-auto px-6 lg:px-10 py-8 space-y-6"
        >
          {messages.map((m, i) => (
            <div key={i} className="msg-in">
              {m.role === "user" ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] bg-ink text-paper rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="max-w-[85%]">
                    <div
                      className={`rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed border ${
                        m.isError
                          ? "bg-rust/5 border-rust/25 text-rust"
                          : "bg-white border-charcoal/10 text-charcoal"
                      }`}
                    >
                      {m.content}
                    </div>
                    {m.sources && m.sources.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2.5 pl-1">
                        {m.sources.map((s, si) => (
                          <div
                            key={si}
                            className="folder-tab bg-brass/15 border border-brass/40 px-3 py-1.5"
                            title={`Relevance score: ${s.score}`}
                          >
                            <span className="font-mono text-[10px] text-brass-light block leading-none mb-0.5">
                              {s.code}
                            </span>
                            <span className="text-[11px] text-charcoal/70 leading-none">
                              {s.title} — {s.section}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start msg-in">
              <div className="bg-white border border-charcoal/10 rounded-2xl rounded-tl-sm px-4 py-3.5 flex gap-1.5">
                <span className="dot w-1.5 h-1.5 rounded-full bg-charcoal/40" />
                <span className="dot w-1.5 h-1.5 rounded-full bg-charcoal/40" />
                <span className="dot w-1.5 h-1.5 rounded-full bg-charcoal/40" />
              </div>
            </div>
          )}

          {messages.length === 1 && (
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-wider text-charcoal/40 mb-3">
                Try asking
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left text-sm bg-white hover:bg-brass/10 border border-charcoal/10 hover:border-brass/40 rounded-lg px-3.5 py-3 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="border-t border-charcoal/10 px-6 lg:px-10 py-5"
        >
          <div className="flex items-center gap-3 bg-white border border-charcoal/15 focus-within:border-sage rounded-full pl-5 pr-2 py-2 transition-colors">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about leave, benefits, expenses, conduct..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-charcoal/35"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-ink text-paper text-sm font-medium rounded-full px-5 py-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink-light transition-colors"
            >
              Ask
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
