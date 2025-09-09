"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'high contrast' : 'light'} theme`}
      className="focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
    >
      {theme === 'light' ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="sr-only">
        {theme === 'light' ? 'Dark Mode' : theme === 'dark' ? 'High Contrast Mode' : 'Light Mode'}
      </span>
    </Button>
  );
}