import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeContextType {
  isDark: boolean;
  dark: boolean;
  toggleTheme: () => void;
  toggle: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('agentic_theme_dark');
    return saved !== null ? saved === 'true' : true; // Dark by default
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    const saved = localStorage.getItem('agentic_reduced_motion');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    localStorage.setItem('agentic_theme_dark', isDark.toString());
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('agentic_reduced_motion', reducedMotion.toString());
  }, [reducedMotion]);

  const toggleTheme = () => setIsDark((prev) => !prev);
  const toggleReducedMotion = () => setReducedMotion((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        dark: isDark,
        toggleTheme,
        toggle: toggleTheme,
        reducedMotion,
        toggleReducedMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
