import { useChat } from "../context/ChatContext";
import EmptyState from "../pages/EmptyState";
import ChatWindow from "../pages/ChatWindow";

const Home = () => {
  const { activeChat } = useChat();

  return (
    <div className="w-[82%] h-full bg-[#343541]">
      {!activeChat ? <EmptyState /> : <ChatWindow />}
    </div>
  );
};

export default Home;
