import { useEffect, useRef } from "react";
import WelcomeCard from "./WelcomeCard";
import ChatMessage from "./ChatMesage";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ messages, isTyping }) {
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);
    return (
        <main className="flex-1 overflow-y-auto bg-slate-100 p-8">
            {messages.length === 0 ? (
                <WelcomeCard />
            ) : (
                <>
                    {messages.map((message) =>(
                        <ChatMessage
                            key={message.id}
                            message={message}
                        />
                    ))}

                    {isTyping && <TypingIndicator />}
                    
                    <div ref={bottomRef} />
                </>
            )}
        </main>
    );
}

export default ChatWindow;