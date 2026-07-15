/*import { useState } from "react";
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

export default ChatInput;*/

import { useRef, useState } from "react";
import { Paperclip, Smile, SendHorizontal, Lock, X } from "lucide-react";
import EmojiPicker from "./EmojiPicker.jsx";

const MAX_FILE_MB = 5;

function ChatInput({ onSend }) {
    const [input, setInput] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [attachError, setAttachError] = useState(null);

    const fileInputRef = useRef(null);

    function handleFileChange(e) {
        const file = e.target.files?.[0];
        e.target.value = "";

        if (!file) return;

        if (!file.type.startsWith("image/")) {
        setAttachError(
            "Only image files are supported (e.g. a photo of a document or ID)."
        );
        return;
        }

        if (file.size > MAX_FILE_MB * 1024 * 1024) {
        setAttachError(`Image is too large. Maximum ${MAX_FILE_MB}MB.`);
        return;
        }

        setAttachError(null);

        const reader = new FileReader();

        reader.onload = () => {
        setAttachment({
            name: file.name,
            dataUrl: reader.result,
        });
        };

        reader.readAsDataURL(file);
    }

    function handleEmojiSelect(emoji) {
        setInput((prev) => prev + emoji);
        setShowEmoji(false);
    }

    function sendMessage() {
        if (!input.trim() && !attachment) return;
        /*
        onSend({
        message: input,
        attachment,
        });*/
        onSend(input, attachment);

        setInput("");
        setAttachment(null);
        setAttachError(null);
        setShowEmoji(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage();
    }

    return (
        <footer className="border-t bg-white p-4 dark:bg-slate-900">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
            {attachment && (
            <div className="mb-3 flex items-center gap-2 rounded-xl border bg-gray-50 p-2 dark:bg-slate-800">
                <img
                src={attachment.dataUrl}
                alt={attachment.name}
                className="h-10 w-10 rounded-lg object-cover"
                />

                <span className="flex-1 truncate text-sm">
                {attachment.name}
                </span>

                <button
                type="button"
                onClick={() => setAttachment(null)}
                className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-slate-700"
                >
                <X size={16} />
                </button>
            </div>
            )}

            {attachError && (
            <p className="mb-2 text-xs text-red-500">
                {attachError}
            </p>
            )}

            <div className="flex items-end gap-3 rounded-2xl border bg-white p-3 shadow-sm dark:bg-slate-950">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
            >
                <Paperclip size={18} />
            </button>

            <div className="relative">
                <button
                type="button"
                onClick={() => setShowEmoji((prev) => !prev)}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                <Smile size={18} />
                </button>

                {showEmoji && (
                <EmojiPicker
                    onSelect={handleEmojiSelect}
                    onClose={() => setShowEmoji(false)}
                />
                )}
            </div>

            <textarea
                placeholder="Ask a medical question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="max-h-32 flex-1 resize-none border-none bg-transparent outline-none cursor-pointer"
            />

            <button
                type="submit"
                disabled={!input.trim() && !attachment}
                className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
                <SendHorizontal size={20} />
            </button>
            </div>
        </form>

        <p className="mx-auto mt-2 flex max-w-3xl items-center gap-1 text-xs text-gray-500">
            <Lock size={12} />
            Your conversations are not stored. Each chat is temporary and private.
        </p>
        </footer>
    );
}

export default ChatInput;