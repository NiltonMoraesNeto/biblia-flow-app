import { createContext, useContext, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { resolveThemeName, themes } from './tokens';
import type { Theme, ThemeName, ThemePreference } from './tokens';

type ThemeContextValue = {
  theme: Theme;
  name: ThemeName;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>('system');
  const name = resolveThemeName(preference, systemTheme);
  const value = useMemo(
    () => ({ theme: themes[name], name, preference, setPreference }),
    [name, preference],
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme requires ThemeProvider');
  return context;
}
