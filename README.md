# Ask HR — RAG-Based HR Policy Assistant

A retrieval-augmented generation (RAG) chatbot that answers employee HR
questions grounded in company policy documents. Built as a course project
demonstrating chatbot design, NLP-based retrieval, and LLM integration —
runs entirely on free-tier services (no credit card required).

## How it works

1. **Retrieval**: User questions are matched against a corpus of HR policy
   excerpts using a custom **TF-IDF vectorization + cosine similarity**
   engine (`lib/retrieval.ts`) — a classic information-retrieval technique.
2. **Augmentation**: The top-matching policy excerpts are inserted into the
   prompt as context.
3. **Generation**: Google's **Gemini API (gemini-2.5-flash)** generates a
   grounded, concise answer, instructed to only use the provided excerpts
   and to say so when it doesn't know something.
4. Sources are shown to the user as citation chips under each answer.

## Tech stack

- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS (custom "personnel file" design system)
- Google Gemini API (`gemini-2.5-flash`) for generation — **free tier, no
  credit card needed**
- Custom TF-IDF retrieval (no external vector DB needed — lightweight and
  serverless-friendly)

## Project structure

```
app/
  page.tsx          — chat UI
  layout.tsx        — fonts, metadata
  globals.css       — design tokens, background texture
  api/chat/route.ts — retrieval + Gemini call
lib/
  policies.ts        — sample HR policy documents (edit these!)
  retrieval.ts        — TF-IDF + cosine similarity engine
```

## Getting a free Gemini API key (no card required)

1. Go to https://aistudio.google.com/apikey
2. Sign in with any Google account
3. Click "Create API key" — copy it
4. That's it. No billing setup needed for the free tier.

Free tier limits (as of mid-2026) are generous for a demo/CV project:
roughly hundreds of requests per day on `gemini-2.5-flash`, more than
enough for testing and showing it off in an interview.

## Running locally

```bash
npm install
cp .env.example .env.local   # then paste your GEMINI_API_KEY
npm run dev
```

Visit http://localhost:3000

## Deploying to Vercel (also free)

1. **Push this project to GitHub.**
   ```bash
   cd hr-chatbot
   git init
   git add .
   git commit -m "Initial commit: Ask HR chatbot"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Import into Vercel.**
   - Go to https://vercel.com and sign in (GitHub login is easiest).
   - Click **Add New → Project**, select your repo, click **Import**.
   - Vercel auto-detects Next.js — no config changes needed.

3. **Add your API key.**
   - In the import screen (or later under Project → Settings →
     Environment Variables), add:
     - Name: `GEMINI_API_KEY`
     - Value: the key you copied from Google AI Studio
   - Apply to all environments, then **Deploy**.

4. **Done.** Vercel gives you a live URL like
   `https://your-project.vercel.app` — that's your CV link.

Both Google AI Studio and Vercel's hobby tier are free with no credit card,
so the whole project costs $0 to build, run, and host.

## Customizing with real policy documents

Edit `lib/policies.ts` — each entry is a `{ docTitle, docCode, section, text }`
chunk. Keep chunks focused on one topic (a few sentences each) for best
retrieval accuracy. No retraining or re-embedding step needed — TF-IDF
recomputes automatically from this array.

## Notes for the write-up / CV

- Architecture: RAG (Retrieval-Augmented Generation)
- Retrieval method: TF-IDF vectorization + cosine similarity (implemented
  from scratch, no external library)
- Generation: Google Gemini API
- Frontend: Next.js/React, deployed serverless on Vercel
- All policy content is placeholder/sample data written for demo purposes.
