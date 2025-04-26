import React, { useState, useEffect } from "react";
import {setToLocalStorage, getFromLocalStorage} from "@utils/localStorage";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = getFromLocalStorage("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setToLocalStorage("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="font-bold text-2xl animate-pulse "
    >
      {theme === "light" ? "🌙": "☀️"}
    </button>
  );
};

export default ThemeToggle;
