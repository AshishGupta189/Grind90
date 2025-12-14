import { useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import socket from "../config/socket";

const ChatWindow = () => {
  const { activeChat } = useChat();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("response", (data) => {
      if (data.chat === activeChat._id) {
        setMessages((prev) => [
          ...prev,
          { role: "model", content: data.content },
        ]);
      }
    });

    return () => socket.off("response");
  }, [activeChat]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    socket.emit("message", {
      chat: activeChat._id,
      content: input,
    });

    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-2xl ${
              msg.role === "user" ? "ml-auto" : ""
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-[#10a37f] text-white"
                  : "bg-[#444654] text-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* input */}
      <div className="p-4 border-t border-gray-600">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-[#40414f] text-white p-3 rounded-md outline-none"
            placeholder="Send a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-[#10a37f] px-4 rounded-md text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
