export const palette = {
  forest: '#365B4C',
  sage: '#A8B9A4',
  cream: '#F5F1E8',
  sand: '#D6BE91',
  night: '#17251F',
  mist: '#E8ECE5',
} as const;
export const themes = {
  light: {
    background: palette.cream,
    text: palette.forest,
    accent: palette.forest,
    surface: palette.sage,
    onSurface: palette.night,
    textMuted: palette.forest,
    primary: palette.forest,
    onPrimary: palette.cream,
    border: palette.forest,
    controlBackground: palette.cream,
  },
  dark: {
    background: palette.night,
    text: palette.mist,
    accent: palette.sand,
    surface: palette.forest,
    onSurface: palette.cream,
    textMuted: palette.sage,
    primary: palette.sand,
    onPrimary: palette.night,
    border: palette.sage,
    controlBackground: palette.night,
  },
} as const;
export const spacing = { sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const radii = { control: 12, card: 20 } as const;
export const typography = {
  brand: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  title: { fontSize: 32, lineHeight: 42, fontWeight: '600' },
  heading: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  body: { fontSize: 18, lineHeight: 28, fontWeight: '400' },
  caption: { fontSize: 14, lineHeight: 22, fontWeight: '400' },
  control: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
} as const;
export const layout = { contentMaxWidth: 560, touchTarget: 48 } as const;
export type ThemeName = keyof typeof themes;
export type ThemePreference = 'system' | ThemeName;
export type Theme = (typeof themes)[ThemeName];

export function resolveThemeName(
  preference: ThemePreference,
  systemTheme: ThemeName | 'unspecified' | null | undefined,
): ThemeName {
  if (preference !== 'system') return preference;
  return systemTheme === 'dark' ? 'dark' : 'light';
}
