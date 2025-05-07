import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 p-2 rounded-full z-20 transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
          : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;