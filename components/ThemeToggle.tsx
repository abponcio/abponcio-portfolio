"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-[72px] h-[34px]" />;

  const isDark = theme === "dark";

  const handleToggle = () => {
    document.documentElement.classList.add("theme-transitioning");
    setTheme(isDark ? "light" : "dark");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 400);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`flex items-center gap-2 ml-1.5 bg-transparent cursor-pointer whitespace-nowrap ${className}`}
      style={{
        border: "1px solid var(--line)",
        color: "var(--text)",
        padding: "8px 14px",
        borderRadius: "99px",
        fontFamily: "inherit",
        fontSize: "13px",
        fontWeight: 600,
      }}
    >
      <span
        className="shrink-0"
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
