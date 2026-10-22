import { AppText } from '../../components/AppText';
import { Screen } from '../../components/Screen';
import { Surface } from '../../components/Surface';
import { ptBR } from '../../i18n/pt-BR';

export default function BootstrapScreen() {
  return (
    <Screen>
      <AppText variant="brand">{ptBR.appName}</AppText>
      <AppText variant="title" accessibilityRole="header">
        {ptBR.welcome}
      </AppText>
      <AppText tone="textMuted">{ptBR.description}</AppText>
      <Surface>
        <AppText variant="heading" tone="onSurface" accessibilityRole="header">
          {ptBR.pause.title}
        </AppText>
        <AppText tone="onSurface">{ptBR.pause.description}</AppText>
      </Surface>
    </Screen>
  );
}
