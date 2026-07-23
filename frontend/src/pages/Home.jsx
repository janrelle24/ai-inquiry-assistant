import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import ConfirmModal from "../components/ConfirmModal";

import useChat from "../hooks/useChat";

function Home() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        <div className="flex h-screen overflow-hidden bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onNewChat={handleNewChat}
            />
            
            <div className="flex flex-1 flex-col">
                <Navbar
                    onNewChat={handleNewChat}
                    onToggleSidebar={() => setSidebarOpen(true)}
                />

                <ChatWindow 
                    messages={messages}
                    isTyping={isTyping}
                />

                <ChatInput onSend={sendMessage} />
            </div>
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                />
            )}
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