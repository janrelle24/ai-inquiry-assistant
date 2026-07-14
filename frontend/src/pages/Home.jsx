import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

function Home() {
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (text) => {
        const newMessage = {
            id: Date.now(),
            role: "user",
            content: text,
        };
        setMessages((prev) => [...prev, newMessage]);
    }
    return (
        <div className="flex h-screen bg-slate-100">
        <Sidebar />

        <div className="flex flex-1 flex-col">
            <Navbar />

            <ChatWindow messages={messages} />

            <ChatInput onSend={handleSendMessage} />
        </div>
        </div>
    );
}

export default Home;