import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeProviderContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(
  undefined
)

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'portfolio-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        return storedTheme
      }
    }

    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class and data attribute
    root.classList.add(theme)
    root.setAttribute('data-theme', theme)
    
    // Store in localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if no theme is stored in localStorage
      const storedTheme = localStorage.getItem(storageKey)
      if (!storedTheme) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [storageKey])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const value: ThemeProviderContextType = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

// Utility hook for theme-aware styles
export function useThemeStyles() {
  const { theme } = useTheme()
  
  return {
    isDark: theme === 'dark',
    isLight: theme === 'light',
    themeClass: theme,
  }
}
