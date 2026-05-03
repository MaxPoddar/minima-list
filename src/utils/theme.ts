export type Theme = "light" | "dark" | "black-yellow" | "blue-white" | "pink-white";

export function setTheme(theme : Theme) {
    const root = document.documentElement;

    root.classList.remove("light", "dark", "black-yellow", "blue-white", "pink-white");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
}

export function applySavedTheme() {
    const saved = localStorage.getItem("theme") as Theme | null;

    if (saved) {
        setTheme(saved);
    } else {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(systemTheme ? "dark" : "light");
    }
}