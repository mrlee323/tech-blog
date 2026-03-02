"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // 하이드레이션 에러 방지 (마운트 된 후 렌더링)
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />; 

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      aria-label="테마 변경"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-orange-300" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-700" />
      )}
    </button>
  );
}