"use client";
// Marks this as a Client Component (Next.js App Router)
// Required because we use useState, useEffect, and browser APIs like localStorage

import { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  // State to store the current theme (default is "light")
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Get saved theme from localStorage (if it exists)
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;

    // If no saved theme, fallback to user's system preference
    const preferred =
      saved ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    // Update React state
    setTheme(preferred);

    // Apply theme to <html> using data attribute (used for CSS theming)
    document.documentElement.setAttribute("data-theme", preferred);
  }, []);
  // Runs only once when component mounts (initial render)

  const toggleTheme = () => {
    // Determine the next theme
    const next = theme === "light" ? "dark" : "light";

    // Update state
    setTheme(next);

    // Update HTML attribute for styling
    document.documentElement.setAttribute("data-theme", next);

    // Persist the selected theme in localStorage
    localStorage.setItem("theme", next);
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      // Accessibility: describes action for screen readers
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      // Tooltip text on hover
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span className={styles.icon}>
        {theme === "light" ? (
          // Icon shown when current theme is light (moon → switch to dark)
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          // Icon shown when current theme is dark (sun → switch to light)
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </span>
    </button>
  );
}