//import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import useChat from "../hooks/useChat";

function Home() {
    const {messages, sendMessage, isTyping} = useChat();

    
    return (
        <div className="flex h-screen bg-slate-100">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Navbar />

                <ChatWindow 
                    messages={messages}
                    isTyping={isTyping}
                />

                <ChatInput onSend={sendMessage} />
            </div>
        </div>
    );
}

export default Home;