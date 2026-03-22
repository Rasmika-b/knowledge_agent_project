# Knowledge Agent

A fully local, private agentic AI that lets you build your own knowledge base and chat with it. No cloud APIs, no subscriptions, no data leaving your machine.

![LangChain](https://img.shields.io/badge/LangChain-0.3-blue)
![React](https://img.shields.io/badge/React-TypeScript-61DAFB)
![Ollama](https://img.shields.io/badge/Ollama-local-green)
![Node](https://img.shields.io/badge/Node.js-Express-yellow)

---

## Demo

> Paste any text into the knowledge base → ask questions → get answers grounded in your own documents. Fully offline.

[See screenshots and results](results.md)

---

## What it does

- Paste any text — articles, notes, research papers, meeting notes
- The agent converts it into vector embeddings and stores them in memory
- Ask questions in plain English
- The agent semantically searches your knowledge base and uses a local LLM to answer
- Everything runs on your machine — zero cloud dependency

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript (Vite) |
| Backend | Node.js + Express + TypeScript |
| AI Orchestration | LangChain.js |
| LLM | Ollama — qwen2:7b |
| Embeddings | Ollama — nomic-embed-text |
| Vector Store | LangChain MemoryVectorStore |

---

## Project structure
```
knowledge_agent_project/
├── backend/                       # Node.js + Express + LangChain
│   ├── src/
│   │   ├── index.ts               # Express server and API routes
│   │   ├── agent.ts               # LangChain RetrievalQA agent
│   │   └── vectorstore.ts         # MemoryVectorStore and embeddings
│   ├── package.json
│   └── tsconfig.json
├── frontend/                      # React + TypeScript (Vite)
│   ├── src/
│   │   ├── App.tsx                # Root layout and two-panel split
│   │   └── components/
│   │       ├── AddKnowledge.tsx   # Left panel — text input
│   │       └── ChatBox.tsx        # Right panel — chat interface
│   └── package.json
├── .gitignore
└── README.md
```

---

## Prerequisites

Install these before you begin:

- [Node.js](https://nodejs.org/) v18 or higher
- [Ollama](https://ollama.com/) installed and running locally

---

## Setup and installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/knowledge_agent_project.git
cd knowledge_agent_project
```

### 2. Pull the required Ollama models
```bash
ollama pull qwen2:7b
ollama pull nomic-embed-text
```

Verify both models are available:
```bash
ollama list
```

You should see both `qwen2:7b` and `nomic-embed-text` listed.

### 3. Set up and run the backend
```bash
cd backend
npm install
npm run dev
```

Expected output:
```
Backend running on http://localhost:3001
```

### 4. Set up and run the frontend

Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
➜  Local:   http://localhost:5173/
```

### 5. Open the app

Visit **http://localhost:5173** in your browser.

---

## How to use

**Step 1 — Add knowledge**

Paste any block of text into the left panel and click **Add to Knowledge Base**. Wait for the "Added successfully!" confirmation — this takes 10-15 seconds as the text is being embedded.

**Step 2 — Ask questions**

Type any question related to what you added into the right panel and press **Enter** or click **Ask**. The agent will search your knowledge base and respond in 20-30 seconds.

**Step 3 — Keep adding**

You can keep adding more text and asking more questions in the same session. All added documents stay available until you restart the backend.

---

## API reference

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | `/add` | `{ "texts": ["..."] }` | Add text to the knowledge base |
| POST | `/ask` | `{ "question": "..." }` | Ask the agent a question |
| GET | `/test` | — | Health check |
| GET | `/test-embed` | — | Test embedding model connection |

### Example — add text
```bash
curl -X POST http://localhost:3001/add \
  -H "Content-Type: application/json" \
  -d '{"texts": ["The Eiffel Tower was built in 1889 in Paris, France."]}'
```

### Example — ask a question
```bash
curl -X POST http://localhost:3001/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "When was the Eiffel Tower built?"}'
```

---

## Troubleshooting

**Port 3001 already in use**
```bash
kill $(lsof -t -i :3001)
cd backend && npm run dev
```

**UI stuck on "Adding..."**

The backend process may be stale. Kill and restart:
```bash
kill $(lsof -t -i :3001)
cd backend && npm run dev
```

**Ollama not responding**

Check if Ollama is running:
```bash
curl http://localhost:11434/api/tags
```

If it hangs, restart Ollama from your Applications or run `ollama serve` in a terminal.

**Slow first response**

This is normal. `qwen2:7b` takes 20-30 seconds on the first request while the model loads into memory. Subsequent responses are faster.

**Knowledge resets after restart**

This project uses in-memory vector storage — all added knowledge is lost when the backend restarts. Re-add your documents after each restart. See the Future Improvements section for the persistent storage plan.

---

## Limitations

- Knowledge base resets on every backend restart — in-memory only
- Text input only — no file upload support yet
- Single user — no authentication layer
- No conversation history — each question is independent

---

## Future improvements

- [ ] Persistent storage with ChromaDB or SQLite
- [ ] PDF and TXT file upload
- [ ] Streaming responses
- [ ] Conversation memory across questions
- [ ] Multiple named knowledge collections
- [ ] Dark mode UI
- [ ] Docker Compose setup for one-command startup