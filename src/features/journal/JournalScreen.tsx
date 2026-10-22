import { AppText } from '../../components/AppText';
import { Screen } from '../../components/Screen';
import { Surface } from '../../components/Surface';
import { ptBR } from '../../i18n/pt-BR';

export default function JournalScreen() {
  return (
    <Screen>
      <AppText variant="title" accessibilityRole="header">
        {ptBR.navigation.journal}
      </AppText>
      <Surface>
        <AppText variant="heading" tone="onSurface" accessibilityRole="header">
          {ptBR.journal.title}
        </AppText>
        <AppText tone="onSurface">{ptBR.journal.description}</AppText>
      </Surface>
    </Screen>
  );
}
