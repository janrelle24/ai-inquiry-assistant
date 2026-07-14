import { useState } from "react";
import { SendHorizontal } from "lucide-react";

function ChatInput({onSend}) {
    const [input, setInput] = useState("");
    
    const handleKeyDown = (e) => {
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            if(!input.trim()) return;

            onSend(input);
            setInput("");
        }
    }
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
        <div className="flex items-end gap-3 rounded-2xl border bg-white p-3 shadow-sm">
            <textarea
                type="text"
                placeholder="Ask a medical question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 resize-none border-none outline-none"
            />

            <button
                type="submit"
                className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 hover:cursor-pointer"
            >
                <SendHorizontal size={20} />
            </button>
        </div>
        </form>
    );
}

export default ChatInput;