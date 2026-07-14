function ChatMessage({ message }) {
    const isUser = message.role === "user";

    return (
        <div
            className={`mb-4 flex ${
            isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
            className={`max-w-md rounded-2xl px-5 py-3 ${
                isUser
                ? "bg-blue-600 text-white"
                : "bg-white shadow"
            }`}
            >
            {message.content}
            </div>
        </div>
    );
}

export default ChatMessage;