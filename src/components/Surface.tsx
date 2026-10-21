import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';
import { radii, spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeProvider';

export function Surface({ style, ...props }: ViewProps) {
  const { theme } = useTheme();
  return (
    <View
      {...props}
      style={[styles.card, { backgroundColor: theme.surface }, style]}
    />
  );
}
const styles = StyleSheet.create({
  card: { padding: spacing.lg, borderRadius: radii.card, gap: spacing.md },
});
