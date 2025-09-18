import fetch from "node-fetch";

export const aiSupport = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.json({ success: false, message: "Message is required" });
    }

    // Connect to Ollama API
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tinyllama",  // Use the correct model
        prompt: message,
        stream: false        // Set to `true` for token-by-token streaming
      })
    });

    const data = await response.json();
    const reply = data.response || "⚠️ No reply generated.";
    res.json({ success: true, reply });

  } catch (err) {
    console.error("Ollama Error:", err.message);
    res.json({ success: false, message: err.message });
  }
};
