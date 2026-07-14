import { useState } from "react";

export default function useChat() {
    const [messages, setMessages] = useState([]);

    const sendMessage = (text) => {
        const userMessage = {
        id: Date.now(),
        role: "user",
        content: text,
        };

        setMessages((prev) => [...prev, userMessage]);

        // Fake AI response
        setTimeout(() => {
        const aiMessage = {
            id: Date.now() + 1,
            role: "assistant",
            content:
            "This is a sample AI response. Later, this will come from our Node.js backend.",
        };

        setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    return {
        messages,
        sendMessage,
    };
}