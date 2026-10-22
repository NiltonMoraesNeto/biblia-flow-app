import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import type { TextProps } from 'react-native';
import { layout, typography } from '../theme/tokens';
import { useTheme } from '../theme/ThemeProvider';

type AppTextProps = TextProps & {
  variant?: keyof typeof typography;
  tone?: 'text' | 'textMuted' | 'onSurface' | 'onPrimary';
};
export function AppText({
  variant = 'body',
  tone = 'text',
  style,
  ...props
}: AppTextProps) {
  const { theme } = useTheme();
  const { fontScale } = useWindowDimensions();
  const { lineHeight, ...font } = typography[variant];
  return (
    <Text
      {...props}
      allowFontScaling
      maxFontSizeMultiplier={0}
      lineBreakStrategyIOS="standard"
      style={[
        styles.text,
        font,
        fontScale < layout.largeTextScale ? { lineHeight } : null,
        { color: theme[tone] },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  text: { minWidth: 0, maxWidth: '100%', alignSelf: 'stretch' },
});
