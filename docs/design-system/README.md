# Direção visual — proposta 2

Minimalismo, tipografia legível, hierarquia curta, cartões discretos e poucas imagens.
Sem imagem decorativa obrigatória; sem carrossel visual dominante. Priorizar a leitura.

| Token  | Cor     | Uso                                                 |
| ------ | ------- | --------------------------------------------------- |
| forest | #365B4C | texto e ação no tema claro                          |
| sage   | #A8B9A4 | superfícies de apoio                                |
| cream  | #F5F1E8 | fundo claro                                         |
| sand   | #D6BE91 | destaque discreto; evitar como texto em fundo claro |

Tokens implementados em src/theme/tokens.ts. Tema escuro inicial usa night/mist derivados;
sua aprovação visual está pendente. Não considerar cada par da paleta automaticamente acessível.
M1 deve medir contraste de texto normal ≥4,5:1, texto grande ≥3:1 e componentes ≥3:1.
Usar espaçamento 8/16/24/32, tipografia do sistema, suporte a escala de fonte, safe areas e foco semântico.
Botões 44 pt iOS/48 dp Android. Testar claro/escuro com VoiceOver/TalkBack.

Navegação proposta para M1: Hoje, Bíblia, Diário e Ajustes; favoritos acessíveis pela leitura.
Mockup original indisponível: a tela M0 é apenas bootstrap, não a proposta visual final.

## Tokens semânticos e comportamento M1-T01

Textos do cartão usam onSurface, pois forest sobre sage não é a combinação escolhida para leitura.
Controles selecionados usam primary/onPrimary; ao pressionar os demais, surface/onSurface.
Tipografia, espaçamentos, raios e tamanho mínimo de alvo ficam em src/theme/tokens.ts.
O seletor tem nomes acessíveis e estado checked; não depende apenas da cor para leitores de tela.
A preferência é da sessão; persistência em M2. Uso inicial segue o sistema, com fallback claro.

## Contraste medido (sRGB / WCAG)

| Tema  | Combinação                 | Medido  | Mínimo |
| ----- | -------------------------- | ------- | ------ |
| light | text / background          | 6.76:1  | 4.5:1  |
| light | textMuted / background     | 6.76:1  | 4.5:1  |
| light | onSurface / surface        | 7.68:1  | 4.5:1  |
| light | onPrimary / primary        | 6.76:1  | 4.5:1  |
| light | text / controlBackground   | 6.76:1  | 4.5:1  |
| light | border / controlBackground | 6.76:1  | 3:1    |
| light | primary / background       | 6.76:1  | 3:1    |
| dark  | text / background          | 13.30:1 | 4.5:1  |
| dark  | textMuted / background     | 7.68:1  | 4.5:1  |
| dark  | onSurface / surface        | 6.76:1  | 4.5:1  |
| dark  | onPrimary / primary        | 8.81:1  | 4.5:1  |
| dark  | text / controlBackground   | 13.30:1 | 4.5:1  |
| dark  | border / controlBackground | 7.68:1  | 3:1    |
| dark  | primary / background       | 8.81:1  | 3:1    |

Fonte da fórmula e limites: [WCAG contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
Testes automatizados usam os tokens reais e verificam pares de referência 1:1 e 21:1.
A medição não substitui revisão de layout, escala de fonte, safe area e VoiceOver/TalkBack.

Referências consultadas: [Appearance](https://reactnative.dev/docs/usecolorscheme),
[acessibilidade RN](https://reactnative.dev/docs/accessibility),
[Text](https://reactnative.dev/docs/text),
[StatusBar Expo 57](https://docs.expo.dev/versions/v57.0.0/sdk/status-bar/).

## Fonte máxima — ajuste M1-T02

Após relato de corte no iPhone, Screen calcula a largura útil da janela sem percentuais
no contêiner do texto. AppText ocupa a largura disponível, permite escala sem teto e
quebra padrão no iOS. Em escala ≥1,5, usa altura de linha nativa para acomodar os glifos,
menores margens/cartões e opções de tema empilhadas. Após segundo reteste, a barra inferior
em fonte ampliada usa rolagem horizontal, botões de largura intrínseca e nomes em uma linha,
com a aba selecionada revelada automaticamente. Isso substitui a tentativa de duas colunas
com expansão por onTextLayout, que não resolveu o botão Ajustes no aparelho.
Não há redução automática da fonte nem rolagem horizontal de parágrafos.
Reteste físico no tamanho máximo ainda necessário. Referências RN 0.86:
[Text](https://reactnative.dev/docs/0.86/text),
[ScrollView](https://reactnative.dev/docs/0.86/scrollview).
