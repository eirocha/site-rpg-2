'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Theme = 'steampunk' | 'zombie' | 'home'

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>('home')

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}