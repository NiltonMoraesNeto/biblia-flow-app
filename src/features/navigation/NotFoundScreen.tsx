import { Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components/AppText';
import { Screen } from '../../components/Screen';
import { ptBR } from '../../i18n/pt-BR';
import { layout, radii, spacing } from '../../theme/tokens';
import { useTheme } from '../../theme/ThemeProvider';

export default function NotFoundScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.fill, { backgroundColor: theme.background }]}
    >
      <Screen>
        <AppText variant="title" accessibilityRole="header">
          {ptBR.notFound.title}
        </AppText>
        <AppText>{ptBR.notFound.description}</AppText>
        <Link href="/" replace asChild>
          <Pressable
            accessibilityRole="link"
            style={StyleSheet.flatten([
              styles.button,
              { backgroundColor: theme.primary },
            ])}
          >
            <AppText variant="control" tone="onPrimary">
              {ptBR.notFound.recover}
            </AppText>
          </Pressable>
        </Link>
      </Screen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  button: {
    minHeight: layout.touchTarget,
    padding: spacing.md,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
