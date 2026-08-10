import { useRef, useState } from "react";
import { sendChatMessage } from "../api/chatApi";

export default function useChat() {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const sessionId = useRef(crypto.randomUUID());

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
            const data = await sendChatMessage(text, sessionId.current);

            const aiMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: data.reply,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Chat Error:", error);

            let errorMessage = "Sorry, I couldn't reach the AI server.";

            if (error.response?.status === 429) {
                errorMessage =
                    "You've sent too many messages. Please wait a few minutes and try again.";
            }

            const aiMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content: errorMessage,
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