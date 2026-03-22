import AddKnowledge from "./components/AddKnowledge";
import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f4f8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "1100px",
        borderRadius: "16px",
        overflow: "hidden",
        border: "0.5px solid #B5D4F4",
        boxShadow: "0 4px 32px rgba(24,95,165,0.10)",
      }}>
        {/* Top bar */}
        <div style={{
          background: "#042C53",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#85B7EB" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5DCAA5" }} />
          <span style={{ color: "#E6F1FB", fontSize: 15, fontWeight: 500, letterSpacing: "0.01em" }}>
            Personal Knowledge Agent
          </span>
          <span style={{ color: "#378ADD", fontSize: 12, marginLeft: "auto" }}>
            powered by qwen2 + LangChain
          </span>
        </div>

        {/* Two panels */}
        <div style={{ display: "flex", minHeight: "580px" }}>
          <div style={{ width: "40%", borderRight: "0.5px solid #85B7EB" }}>
            <AddKnowledge />
          </div>
          <div style={{ width: "60%" }}>
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;