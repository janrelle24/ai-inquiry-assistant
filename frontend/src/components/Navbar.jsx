import { MessageSquarePlus} from "lucide-react";
import ThemeToogle from "./ThemeToogle";


function Navbar({ onNewChat }) {
    return (
        <header className="flex items-center justify-end gap-2 border-b border-gray-200 bg-white px-6 py-3 dark:border-slate-700 dark:bg-slate-900">
            <ThemeToogle />
    
            <button
                onClick={onNewChat}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-blue-600 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-slate-800"
            >
                <MessageSquarePlus size={16} /> New Chat
            </button>
        </header>
    );
}

export default Navbar;