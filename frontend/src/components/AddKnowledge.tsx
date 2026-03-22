import { useState } from "react";
import axios from "axios";

export default function AddKnowledge() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "adding" | "added">("idle");
  const [snippets, setSnippets] = useState<string[]>([]);

  const handleAdd = async () => {
    if (!text.trim()) return;
    setStatus("adding");
    try {
      await axios.post("http://localhost:3001/add", { texts: [text] });
      setSnippets((prev) => [text.slice(0, 60) + "...", ...prev].slice(0, 3));
      setText("");
      setStatus("added");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div style={{
      background: "#E6F1FB",
      padding: "24px 20px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      height: "100%",
    }}>
      {/* Header */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#185FA5", marginBottom: 4 }}>
          Knowledge base
        </div>
        <div style={{ fontSize: 17, fontWeight: 500, color: "#042C53" }}>Add knowledge</div>
        <div style={{ fontSize: 12, color: "#378ADD", marginTop: 2 }}>
          Paste any text — notes, articles, facts
        </div>
      </div>

      {/* Textarea */}
      <textarea
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"Paste text here...\n\ne.g. Albert Einstein was born in 1879 in Ulm, Germany..."}
        style={{
          width: "100%",
          borderRadius: 10,
          border: "1.5px solid #85B7EB",
          background: "#fff",
          padding: "12px 14px",
          fontSize: 13,
          color: "#042C53",
          resize: "none",
          outline: "none",
          fontFamily: "inherit",
          lineHeight: 1.6,
        }}
      />

      {/* Button */}
      <button
        onClick={handleAdd}
        disabled={status === "adding" || !text.trim()}
        style={{
          background: status === "adding" ? "#378ADD" : "#185FA5",
          color: "#E6F1FB",
          border: "none",
          borderRadius: 10,
          padding: "10px 0",
          fontSize: 13,
          fontWeight: 500,
          cursor: status === "adding" ? "not-allowed" : "pointer",
          width: "100%",
          letterSpacing: "0.01em",
          transition: "background 0.2s",
        }}
      >
        {status === "adding" ? "Adding..." : "+ Add to knowledge base"}
      </button>

      {/* Success badge */}
      {status === "added" && (
        <div style={{
          background: "#E1F5EE",
          border: "0.5px solid #5DCAA5",
          borderRadius: 8,
          padding: "8px 12px",
          fontSize: 12,
          color: "#085041",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1D9E75", flexShrink: 0 }} />
          Added successfully!
        </div>
      )}

      {/* Snippets */}
      {snippets.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 500, color: "#185FA5", letterSpacing: "0.06em" }}>
            Recently added
          </div>
          {snippets.map((s, i) => (
            <div key={i} style={{
              background: "#fff",
              border: "0.5px solid #B5D4F4",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 12,
              color: "#0C447C",
            }}>
              "{s}"
            </div>
          ))}
        </>
      )}
    </div>
  );
}