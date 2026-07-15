import {
    Sun,
    Moon,
    MessageSquarePlus,
} from "lucide-react";


function Navbar({ darkMode, onToggleDark, onNewChat }) {
    return (
        <header className="flex items-center justify-end gap-2 border-b border-line bg-panel px-6 py-3 dark:border-slate-800 dark:bg-slate-900">
            <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition hover:border-brand/40 dark:border-slate-700 dark:text-slate-200 cursor-pointer"
            >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
    
            <button
                onClick={onNewChat}
                className="flex items-center gap-2 rounded-lg border border-brand px-3 py-2 text-sm font-medium text-brand transition hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"
            >
                <MessageSquarePlus size={16} /> New Chat
            </button>
        </header>
    );
}

export default Navbar;