import express from "express";
import cors from "cors";
import { runAgent } from "./agent";
import { addDocuments } from "./vectorstore";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  try {
    const answer = await runAgent(question);
    res.json({ answer });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/add", async (req, res) => {
  const { texts } = req.body;
  try {
    await addDocuments(texts);
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/test", async (req, res) => {
  res.json({ ok: true });
});

app.get("/test-embed", async (req, res) => {
  try {
    const { OllamaEmbeddings } = await import("@langchain/community/embeddings/ollama");
    const embeddings = new OllamaEmbeddings({
      model: "nomic-embed-text",
      baseUrl: "http://localhost:11434",
    });
    const result = await embeddings.embedQuery("hello world");
    res.json({ ok: true, dimensions: result.length });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));