import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import { typography } from '../theme/tokens';
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
  return (
    <Text
      {...props}
      allowFontScaling
      style={[typography[variant], { color: theme[tone] }, style]}
    />
  );
}
