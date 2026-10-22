import {
  act,
  fireEvent,
  renderRouter,
  screen,
  waitFor,
  within,
} from 'expo-router/testing-library';
import { ptBR } from '../src/i18n/pt-BR';
import { themes } from '../src/theme/tokens';
import * as ReactNative from 'react-native';

describe('M1-T02: rotas reais do aplicativo', () => {
  it.each([
    ['/', ptBR.welcome, ptBR.navigation.today],
    ['/biblia', ptBR.bible.title, ptBR.navigation.bible],
    ['/diario', ptBR.journal.title, ptBR.navigation.journal],
    ['/ajustes', ptBR.appearance.title, ptBR.navigation.settings],
  ])('abre diretamente %s com a aba correta', async (path, heading, tab) => {
    const router = renderRouter('./src/app', { initialUrl: path });
    expect(await screen.findByRole('header', { name: heading })).toBeTruthy();
    expect(router.getPathname()).toBe(path);
    expect(screen.getByRole('tab', { name: tab, selected: true })).toBeTruthy();
  });

  it('percorre as quatro abas e mantém a preferência de tema na sessão', async () => {
    const router = renderRouter('./src/app', { initialUrl: '/ajustes' });
    fireEvent.press(await screen.findByRole('radio', { name: 'Escuro' }));
    expect(
      screen.getByRole('radio', { name: 'Escuro', checked: true }),
    ).toBeTruthy();

    for (const [path, label] of [
      ['/', ptBR.navigation.today],
      ['/biblia', ptBR.navigation.bible],
      ['/diario', ptBR.navigation.journal],
      ['/ajustes', ptBR.navigation.settings],
    ] as const) {
      fireEvent.press(screen.getByRole('tab', { name: label }));
      await waitFor(() => expect(router.getPathname()).toBe(path));
      expect(
        screen.getByRole('tab', { name: label, selected: true }),
      ).toBeTruthy();
    }
    expect(
      screen.getByRole('radio', { name: 'Escuro', checked: true }),
    ).toBeTruthy();
    fireEvent.press(screen.getByRole('tab', { name: ptBR.navigation.today }));
    expect(await screen.findByText(ptBR.welcome)).toHaveStyle({
      color: themes.dark.text,
    });
  });

  it.each([
    '/pagina-inexistente',
    '/biblia/inexistente',
    '/diario/inexistente',
  ])('recupera %s sem exibir seus parâmetros', async (path) => {
    const router = renderRouter('./src/app', {
      initialUrl: `${path}?texto=conteudo-privado`,
    });
    expect(
      await screen.findByRole('header', { name: ptBR.notFound.title }),
    ).toBeTruthy();
    expect(screen.queryByText(/conteudo-privado/)).toBeNull();
    fireEvent.press(screen.getByRole('link', { name: ptBR.notFound.recover }));
    await waitFor(() => expect(router.getPathname()).toBe('/'));
    expect(
      await screen.findByRole('header', { name: ptBR.welcome }),
    ).toBeTruthy();
    expect(
      screen.getByRole('tab', { name: ptBR.navigation.today, selected: true }),
    ).toBeTruthy();
  });
});

describe('M1-T02: regressão de fonte ampliada', () => {
  const originalWindow = ReactNative.Dimensions.get('window');
  const originalScreen = ReactNative.Dimensions.get('screen');
  afterEach(() => {
    act(() =>
      ReactNative.Dimensions.set({
        window: originalWindow,
        screen: originalScreen,
      }),
    );
  });

  it.each([
    [320, 3.5],
    [390, 3.5],
    [1024, 3.5],
  ])(
    'mantém conteúdo dentro da largura %s com escala %s',
    async (width, fontScale) => {
      ReactNative.Dimensions.set({
        window: { width, height: 844, scale: 3, fontScale },
        screen: { width, height: 844, scale: 3, fontScale },
      });
      const router = renderRouter('./src/app', { initialUrl: '/' });
      const heading = await screen.findByRole('header', { name: ptBR.welcome });
      const content = screen.getByTestId('screen-content');
      const contentStyle = ReactNative.StyleSheet.flatten(content.props.style);
      // Native glyph layout still requires an iPhone; check the width contract here.
      expect(contentStyle.width).toBeLessThanOrEqual(width - 32);
      expect(contentStyle.width).toBeGreaterThan(0);
      expect(heading.props.allowFontScaling).toBe(true);
      expect(heading.props.maxFontSizeMultiplier).toBe(0);
      expect(heading.props.numberOfLines).toBeUndefined();
      expect(
        ReactNative.StyleSheet.flatten(heading.props.style).lineHeight,
      ).toBeUndefined();
      fireEvent.press(
        screen.getByRole('tab', { name: ptBR.navigation.settings }),
      );
      await waitFor(() => expect(router.getPathname()).toBe('/ajustes'));
      fireEvent.press(screen.getByRole('radio', { name: 'Escuro' }));
      expect(
        screen.getByRole('radio', { name: 'Escuro', checked: true }),
      ).toBeTruthy();
      expect(screen.getAllByRole('tab')).toHaveLength(4);
      const settingsTab = screen.getByRole('tab', {
        name: ptBR.navigation.settings,
      });
      const label = within(settingsTab).getByText(ptBR.navigation.settings);
      expect(label.props.numberOfLines).toBe(1);
      expect(label.props.maxFontSizeMultiplier).toBe(0);
      expect(settingsTab).toHaveStyle({ flexBasis: 'auto', flexShrink: 0 });
      expect(
        screen.getByLabelText(ptBR.navigation.scrollHint).props.horizontal,
      ).toBe(true);
      expect(screen.getAllByRole('tab')).toHaveLength(4);
    },
  );
});
