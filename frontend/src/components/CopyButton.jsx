import { useState } from "react";
import { Copy, Check } from "lucide-react";

function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(text);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    }

    return (
        <button
            onClick={handleCopy}
            className="mt-2 flex items-center gap-1 text-xs text-gray-500 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:text-blue-600 cursor-pointer"
            
        >
            {copied ? (
                <>
                    <Check size={14} />
                    Copied!
                </>
            ) : (
                <>
                    <Copy size={14} />
                    Copy
                </>
            )}
        </button>
    );
}

export default CopyButton;