import { useState } from "react";

export default function useChat() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = (text) => {
        const userMessage = {
            id: Date.now(),
            role: "user",
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        // Fake AI response
        setTimeout(() => {
        const aiMessage = {
            id: Date.now() + 1,
            role: "assistant",
            content:
            "This is a sample AI response. Later, this will come from our Node.js backend.",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1000);
    };

    return {
        messages,
        sendMessage,
        isTyping,
    };
}