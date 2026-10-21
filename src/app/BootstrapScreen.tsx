import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, useColorScheme } from 'react-native';
import { ptBR } from '../i18n/pt-BR';
import { spacing, themes } from '../theme/tokens';

export default function BootstrapScreen() {
  const dark = useColorScheme() === 'dark';
  const theme = themes[dark ? 'dark' : 'light'];
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Text
        accessibilityRole="header"
        style={[styles.brand, { color: theme.accent }]}
      >
        {ptBR.appName}
      </Text>
      <Text
        accessibilityRole="header"
        style={[styles.title, { color: theme.text }]}
      >
        {ptBR.welcome}
      </Text>
      <Text style={[styles.body, { color: theme.text }]}>
        {ptBR.description}
      </Text>
      <Text style={[styles.body, { color: theme.text }]}>
        {ptBR.foundation}
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl * 2,
    gap: spacing.lg,
  },
  brand: { fontSize: 20, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: '600', lineHeight: 42 },
  body: { fontSize: 18, lineHeight: 28 },
});
