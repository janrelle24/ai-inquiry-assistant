import { useState } from "react";

function ChatInput({onSend}) {
    const [input, setInput] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!input.trim()) return;

        
        onSend(input);
        setInput("");
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="border-t bg-white p-4"
        >
        <div className="flex gap-3">
            <input
            type="text"
            placeholder="Ask a medical question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border p-3 outline-none focus:border-blue-600"
            />

            <button
            className="rounded-xl bg-blue-600 px-6 text-white"
            >
            Send
            </button>
        </div>
        </form>
    );
}

export default ChatInput;