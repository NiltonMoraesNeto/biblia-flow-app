import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { ptBR } from '../i18n/pt-BR';
import { layout, radii, spacing } from '../theme/tokens';
import type { ThemePreference } from '../theme/tokens';
import { useTheme } from '../theme/ThemeProvider';
import { AppText } from './AppText';

const preferences: readonly ThemePreference[] = ['system', 'light', 'dark'];

export function ThemeSelector() {
  const { theme, preference, setPreference } = useTheme();
  const { fontScale } = useWindowDimensions();
  const largeText = fontScale >= layout.largeTextScale;
  return (
    <View style={styles.section}>
      <AppText variant="heading" accessibilityRole="header">
        {ptBR.appearance.title}
      </AppText>
      <AppText variant="caption" tone="textMuted">
        {ptBR.appearance.description}
      </AppText>
      <View style={[styles.options, largeText && styles.stacked]}>
        {preferences.map((option) => {
          const selected = option === preference;
          const label = ptBR.appearance.options[option];
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityLabel={label}
              accessibilityState={{ checked: selected }}
              onPress={() => setPreference(option)}
              style={({ pressed }) => [
                styles.option,
                largeText && styles.fullWidth,
                {
                  backgroundColor: selected
                    ? theme.primary
                    : pressed
                      ? theme.surface
                      : theme.controlBackground,
                  borderColor: theme.border,
                },
              ]}
            >
              {({ pressed }) => (
                <AppText
                  variant="control"
                  tone={selected ? 'onPrimary' : pressed ? 'onSurface' : 'text'}
                  style={styles.label}
                >
                  {label}
                </AppText>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  option: {
    flexGrow: 1,
    flexBasis: 120,
    minHeight: layout.touchTarget,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stacked: { flexDirection: 'column' },
  fullWidth: { width: '100%', flexBasis: 'auto', flexGrow: 0 },
  label: { textAlign: 'center' },
});
