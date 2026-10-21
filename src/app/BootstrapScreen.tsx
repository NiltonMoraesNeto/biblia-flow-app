import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { Surface } from '../components/Surface';
import { ThemeSelector } from '../components/ThemeSelector';
import { ptBR } from '../i18n/pt-BR';
import { layout, spacing } from '../theme/tokens';
import { useTheme } from '../theme/ThemeProvider';

export default function BootstrapScreen() {
  const { theme, name } = useTheme();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <StatusBar style={name === 'dark' ? 'light' : 'dark'} />
      <View style={styles.content}>
        <AppText variant="brand">{ptBR.appName}</AppText>
        <AppText variant="title" accessibilityRole="header">
          {ptBR.welcome}
        </AppText>
        <AppText tone="textMuted">{ptBR.description}</AppText>
        <Surface>
          <AppText
            variant="heading"
            tone="onSurface"
            accessibilityRole="header"
          >
            {ptBR.pause.title}
          </AppText>
          <AppText tone="onSurface">{ptBR.pause.description}</AppText>
        </Surface>
        <ThemeSelector />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl * 2,
  },
  content: {
    width: '100%',
    maxWidth: layout.contentMaxWidth,
    alignSelf: 'center',
    gap: spacing.lg,
  },
});
