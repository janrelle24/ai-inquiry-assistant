import { useState } from "react";
import { sendChatMessage } from "../api/chatApi";

export default function useChat() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const data = await sendChatMessage(text);

            const aiMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: data.reply,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);

            const aiMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: "Sorry, I couldn't reach the AI server.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } finally{
            setIsTyping(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
        setIsTyping(false);
    }

    return {
        messages,
        sendMessage,
        isTyping,
        clearChat,
    };
}