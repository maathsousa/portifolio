import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const Theme = () => {
  const [IsDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  }, []);

  const toogleTheme = () => {
    if (IsDarkMode) {
      setIsDarkMode(false);
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <label
      className={cn(
        "cursor-pointer inline-flex items-center focus:outline-hidden select-none",
        // no desktop fica fixo, no mobile fica relativo
        "md:fixed md:top-2.5 md:right-5"
      )}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        checked={IsDarkMode}
        onChange={toogleTheme}
        aria-label={IsDarkMode ? "Ativar modo claro" : "Ativar modo escuro"}
      />
      <div
        className="
        w-20 h-8 rounded-full
    bg-gradient-to-r from-yellow-300 to-orange-400
    peer-checked:from-blue-400 peer-checked:to-indigo-500
    transition-all duration-500 relative overflow-hidden

    after:content-['☀️'] after:absolute after:top-1 after:left-1
    after:bg-white after:rounded-full after:h-6 after:w-6
    after:flex after:items-center after:justify-center
    after:leading-none after:text-md
    after:transition-all after:duration-500
    peer-checked:after:translate-x-[48px] 
    peer-checked:after:content-['🌙']
    after:shadow-md
      "
      />
    </label>
  );
};
