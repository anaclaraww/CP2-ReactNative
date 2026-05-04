import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@taskflow:darkMode';

interface ThemeContextData {
  darkMode: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  background: '#F9FAFB',
  surface: '#FFFFFF',
  border: 'rgba(0,0,0,0.1)',
  text: '#111827',
  textSecondary: '#6B7280',
  accent: '#cf10bf',
  accentLight: '#EEF2FF',
  accentDark: '#4e0639',
  success: '#059669',
  successBg: '#ECFDF5',
  warning: '#D97706',
  warningBg: '#FFFBEB',
  danger: '#DC2626',
  dangerBg: '#FEF2F2',
  progress: '#ed3ac0',
  progressBg: '#F5F3FF',
  tabBar: '#FFFFFF',
  card: '#FFFFFF',
  inputBg: '#F3F4F6',
};

const darkColors: typeof lightColors = {
  background: '#0F172A',
  surface: '#1E293B',
  border: 'rgba(255,255,255,0.1)',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  accent: '#818CF8',
  accentLight: '#1E1B4B',
  accentDark: '#C7D2FE',
  success: '#34D399',
  successBg: '#022C22',
  warning: '#FBBF24',
  warningBg: '#1C1006',
  danger: '#F87171',
  dangerBg: '#1F0A0A',
  progress: '#A78BFA',
  progressBg: '#1A0533',
  tabBar: '#1E293B',
  card: '#1E293B',
  inputBg: '#0F172A',
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then((val) => {
      if (val === 'true') setDarkMode(true);
    });
  }, []);

  function toggleTheme() {
    setDarkMode((prev) => {
      const next = !prev;
      AsyncStorage.setItem(THEME_KEY, String(next));
      return next;
    });
  }

  const colors = darkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextData {
  return useContext(ThemeContext);
}
