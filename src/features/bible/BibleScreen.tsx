import { AppText } from '../../components/AppText';
import { Screen } from '../../components/Screen';
import { Surface } from '../../components/Surface';
import { ptBR } from '../../i18n/pt-BR';

export default function BibleScreen() {
  return (
    <Screen>
      <AppText variant="title" accessibilityRole="header">
        {ptBR.navigation.bible}
      </AppText>
      <Surface>
        <AppText variant="heading" tone="onSurface" accessibilityRole="header">
          {ptBR.bible.title}
        </AppText>
        <AppText tone="onSurface">{ptBR.bible.description}</AppText>
      </Surface>
    </Screen>
  );
}
