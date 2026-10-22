import { AppText } from '../../components/AppText';
import { Screen } from '../../components/Screen';
import { ThemeSelector } from '../../components/ThemeSelector';
import { ptBR } from '../../i18n/pt-BR';

export default function SettingsScreen() {
  return (
    <Screen>
      <AppText variant="title" accessibilityRole="header">
        {ptBR.navigation.settings}
      </AppText>
      <ThemeSelector />
    </Screen>
  );
}
