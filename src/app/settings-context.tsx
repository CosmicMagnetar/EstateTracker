"use client";
import { createContext, useContext, useEffect, useState } from "react";

type SettingsType = {
  isDark: boolean;
  notifications: boolean;
  compactMode: boolean;
  toggleDark: () => void;
  toggleNotifications: () => void;
  toggleCompactMode: () => void;
};

const SettingsContext = createContext<SettingsType | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  // Read from localStorage on first render
  useEffect(() => {
    const dark = localStorage.getItem("darkMode");
    const notify = localStorage.getItem("notifications");
    const compact = localStorage.getItem("compactMode");

    if (dark) setIsDark(dark === "true");
    if (notify) setNotifications(notify === "true");
    if (compact) setCompactMode(compact === "true");
  }, []);

  // Persist changes
  useEffect(() => {
    localStorage.setItem("darkMode", isDark.toString());
    localStorage.setItem("notifications", notifications.toString());
    localStorage.setItem("compactMode", compactMode.toString());
  }, [isDark, notifications, compactMode]);

  return (
    <SettingsContext.Provider
      value={{
        isDark,
        notifications,
        compactMode,
        toggleDark: () => setIsDark((prev) => !prev),
        toggleNotifications: () => setNotifications((prev) => !prev),
        toggleCompactMode: () => setCompactMode((prev) => !prev),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
};
