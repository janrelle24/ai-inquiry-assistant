import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import ConfirmModal from "../components/ConfirmModal";

import useChat from "../hooks/useChat";

function Home() {
    const [showConfirm, setShowConfirm] = useState(false);
    const {messages, sendMessage, isTyping, clearChat,} = useChat();
    
    const handleNewChat = () => {
        if(messages.length === 0) {
            clearChat();
            return;
        }
        setShowConfirm(true);
    }
    const confirmNewChat = () => {
        clearChat();
        setShowConfirm(false);
    };
    const cancelNewChat = () => {
        setShowConfirm(false);
    };

    
    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar
                onNewChat={handleNewChat}
            />
            
            <div className="flex flex-1 flex-col">
                <Navbar
                    onNewChat={handleNewChat}
                />

                <ChatWindow 
                    messages={messages}
                    isTyping={isTyping}
                />

                <ChatInput onSend={sendMessage} />
            </div>
            <ConfirmModal
                isOpen={showConfirm}
                title="🩺 New Chat"
                message="Start a new conversation? Your current chat will be cleared."
                onConfirm={confirmNewChat}
                onCancel={cancelNewChat}
            />
        </div>
    );
}

export default Home;