import { StyleSheet, View, useWindowDimensions } from 'react-native';
import type { ViewProps } from 'react-native';
import { layout, radii, spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeProvider';

export function Surface({ style, ...props }: ViewProps) {
  const { theme } = useTheme();
  const { fontScale } = useWindowDimensions();
  return (
    <View
      {...props}
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          padding: fontScale >= layout.largeTextScale ? spacing.md : spacing.lg,
        },
        style,
      ]}
    />
  );
}
const styles = StyleSheet.create({
  card: {
    minWidth: 0,
    maxWidth: '100%',
    borderRadius: radii.card,
    gap: spacing.md,
  },
});
