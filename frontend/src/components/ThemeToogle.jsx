import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

function ThemeToggle() {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="rounded-xl border p-2 transition hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Toggle theme"
        >
            {darkMode ? (
                <Sun size={16} />
            ) : (
                <Moon size={16} />
            )}
        </button>
    );
}

export default ThemeToggle;