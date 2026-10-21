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
  },
  dark: {
    background: palette.night,
    text: palette.mist,
    accent: palette.sand,
    surface: palette.forest,
  },
} as const;
export const spacing = { sm: 8, md: 16, lg: 24, xl: 32 } as const;
