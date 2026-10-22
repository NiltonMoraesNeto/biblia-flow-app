import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { layout, spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeProvider';

export function Screen({ children }: PropsWithChildren) {
  const { theme } = useTheme();
  const { width, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const padding = fontScale >= layout.largeTextScale ? spacing.md : spacing.lg;
  // Percentages inside a padded ScrollView can exceed its readable viewport.
  const contentWidth = Math.max(
    0,
    Math.min(
      layout.contentMaxWidth,
      width - insets.left - insets.right - padding * 2,
    ),
  );
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[styles.fill, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.fill}
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: padding },
        ]}
      >
        <View
          testID="screen-content"
          style={[styles.content, { width: contentWidth }]}
        >
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  container: { flexGrow: 1, paddingVertical: spacing.lg, alignItems: 'center' },
  content: {
    minWidth: 0,
    alignSelf: 'center',
    gap: spacing.lg,
  },
});
