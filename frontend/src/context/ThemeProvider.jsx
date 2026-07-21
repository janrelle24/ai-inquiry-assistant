import { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        console.log("darkMode:", darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const toggleTheme = () => {
        console.log("Button clicked!");
        setDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;