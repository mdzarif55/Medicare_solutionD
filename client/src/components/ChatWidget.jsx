import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ChatWidget = () => {
  const { axios } = useAppContext();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! I’m your AI Support Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/support/ai", { message: input });
      if (data.success) {
        setMessages([...newMessages, { sender: "bot", text: data.reply }]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default behavior (adding a new line)
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dull transition"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-96 bg-white border shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white p-3 flex justify-between items-center rounded-t-lg">
            <span>AI Support</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 ${m.sender === "user" ? "text-right" : "text-left"}`}>
                <p className={`inline-block px-3 py-2 rounded-lg ${m.sender === "user" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}>
                  {m.text}
                </p>
              </div>
            ))}
            {loading && <p className="text-sm text-gray-400">AI is typing...</p>}
          </div>

          {/* Input */}
          <div className="p-2 flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}  // Handling Enter key press
              className="flex-1 px-2 py-1 border rounded"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-primary text-white px-3 py-1 rounded hover:bg-primary-dull transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
