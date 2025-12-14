import { useChat } from "../context/ChatContext.jsx";
import axiosInstance from "../config/axiosConfig.js";
import { useEffect } from "react";
const SideBar = () => {
  const { chats, setChats, setActiveChat } = useChat();
  useEffect(() => {
    axiosInstance
      .get('/chat')
      .then(res => setChats(res.data))
      .catch(err => console.error("Error loading chats", err));
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/auth/logout'); // Backend pe logout endpoint call karo
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
  const newChat = async () => {
    const title = prompt("Enter Chat Title");
    if (!title) return;

    const res = await axiosInstance.post("/chat", { title });
    console.log(res);
    
    setChats((prev) => [res.data, ...prev]);
    setActiveChat(res.data);
    
  };

  return (
    <div className="w-[18%] h-full bg-[#202123] text-white p-3 flex flex-col">
      <button
        onClick={newChat}
        className="border border-gray-500 rounded-md p-2 mb-3 hover:bg-gray-700"
      >
        + New Chat
      </button>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto space-y-1">
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => setActiveChat(chat)}
            className="p-2 rounded  hover:bg-gray-700 cursor-pointer text-sm truncate"
          >
            {chat.title}
          </div>
        ))}
      </div>

      <button onClick={handleLogout} className="text-sm border p-2 rounded cursor-pointer hover:bg-red-700 hover:text-white text-red-400">Logout</button>
    </div>
  );
};
export default SideBar;
