import { useState, useRef, useEffect } from "react";
import axios from "axios";

type Message = { role: "user" | "agent"; text: string };

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    const q = question.trim();
    setMessages((m) => [...m, { role: "user", text: q }]);
    setQuestion("");
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3001/ask", { question: q });
      setMessages((m) => [...m, { role: "agent", text: data.answer }]);
    } catch {
      setMessages((m) => [...m, { role: "agent", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: "#fff",
      padding: "24px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      height: "100%",
    }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#185FA5", marginBottom: 4 }}>
          AI Agent
        </div>
        <div style={{ fontSize: 17, fontWeight: 500, color: "#042C53" }}>Ask a question</div>
        <div style={{ fontSize: 12, color: "#378ADD", marginTop: 2 }}>
          Agent searches your knowledge base to answer
        </div>
      </div>

      {/* Chat history */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        overflowY: "auto",
        minHeight: 300,
        maxHeight: 400,
        paddingRight: 4,
      }}>
        {messages.length === 0 && (
          <div style={{
            margin: "auto",
            textAlign: "center",
            color: "#85B7EB",
            fontSize: 13,
            padding: "40px 20px",
          }}>
            Add some knowledge on the left,<br />then ask a question here.
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%",
          }}>
            <div style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.06em",
              marginBottom: 3,
              color: msg.role === "user" ? "#185FA5" : "#5F5E5A",
              textAlign: msg.role === "user" ? "right" : "left",
            }}>
              {msg.role === "user" ? "You" : "Agent"}
            </div>
            <div style={{
              background: msg.role === "user" ? "#E6F1FB" : "#f5f5f5",
              border: msg.role === "user" ? "0.5px solid #85B7EB" : "0.5px solid #d3d1c7",
              borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              padding: "8px 14px",
              fontSize: 13,
              color: msg.role === "user" ? "#042C53" : "#2C2C2A",
              lineHeight: 1.6,
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {loading && (
          <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#378ADD" }}>
            <ThinkingDots />
            Agent is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask something about your knowledge base..."
          style={{
            flex: 1,
            border: "1.5px solid #85B7EB",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            color: "#042C53",
            background: "#fff",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          style={{
            background: loading ? "#378ADD" : "#185FA5",
            color: "#E6F1FB",
            border: "none",
            borderRadius: 10,
            padding: "10px 18px",
            fontSize: 13,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.2s",
          }}
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: "50%", background: "#378ADD",
          animation: `bounce 1s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}