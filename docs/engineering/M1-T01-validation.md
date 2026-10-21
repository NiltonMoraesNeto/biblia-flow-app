# M1-T01 — validação e revisão

Data: 21/10/2026. Ambiente: macOS, Node 24.22.0, Expo SDK 58, cópia de trabalho isolada.

Revalidação no projeto de destino em 21/10/2026: macOS, Node 24.12.0,
Expo 58.0.16 / React Native 0.88.0. Dependência M0-T03 está done.
Instalação pelo lockfile aprovada com npm ci --offline; npm run check aprovado com 11 testes;
exportações Metro iOS (624 módulos) e Android (622 módulos) aprovadas.
Nenhum pacote ou lockfile alterado. A instalação offline não substitui uma auditoria de segurança atualizada;
os alertas históricos continuam registrados para triagem em M10-T01.

## Migração SDK 57 — 21/10/2026

Solicitação explícita do proprietário para abrir no Expo Go SDK 57; decisão em ADR-0009.
Este registro sucede os resultados SDK 58 abaixo, preservados como histórico.
Versões instaladas: Expo 57.0.31, StatusBar 57.0.1, React 19.2.3, React Native 0.86.3,
@types/react 19.2.18; Node 24.12.0 e TypeScript 6.0.3 mantidos.

- Expo CLI install --fix alinhou dependências; Expo Doctor passou 21/21 verificações.
- npm ci --offline --no-audit com o lockfile atualizado: aprovado (561 pacotes).
- npm run check após instalação limpa: aprovado (estrutura, TypeScript, ESLint, Prettier e 11 testes).
- Exports iOS/Android: aprovados (589/587 módulos).
- ColorSchemeName em RN 0.86 admite unspecified: resolução passa a usar o fallback claro;
  teste também cobre preferência manual nessa condição. Não há supressão de tipagem.
- Expo CLI incluiu o config plugin expo-status-bar em app.json; sem configurações extras,
  sem prebuild ou diretórios nativos gerados. Plugin documentado na referência SDK 57.
- Avisos não bloqueantes: MODULE_TYPELESS_PACKAGE_JSON nos testes e NO_COLOR/FORCE_COLOR no Metro.
- npm audit: 15 alertas high, zero critical. Cadeias Expo/RN/Metro envolvem node-forge e
  braces/micromatch. A remediação automática sugere inclusive Expo 44/RN 0.72, incompatíveis
  com esta migração; não aplicada. Triagem de segurança permanece em M10-T01, sem alegar correção.
- Revisão completa em aparelho, fonte ampliada e leitores de tela continuam pendentes;
  teste parcial do proprietário no iPhone registrado abaixo.

Para retestar no iPhone: encerrar o servidor anterior com Ctrl+C, executar
npm start -- --clear --lan e abrir o novo QR no Expo Go compatível com SDK 57,
com computador e celular na mesma rede. Nenhum servidor anterior foi encerrado pelo agente.

Referências consultadas: [SDK 57](https://expo.dev/changelog/sdk-57),
[guia de alinhamento](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/),
[StatusBar SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/status-bar/).

## Encerramento M1-T01 — aprovação do proprietário, 21/10/2026

O proprietário confirmou “deu certo os testes, tudo aprovado” após o roteiro enviado:
Sistema acompanha alterações claro/escuro no iOS; preferência Claro mantém o app claro
com iOS escuro; texto ampliado permite ler e alcançar o conteúdo sem cortes.
Abertura, seleção dos três temas e rolagem por toque já tinham sido confirmadas.
Modelo/iOS e percentual de ampliação não informados; não assumir 200% nem outros cenários.

M1-T01 concluída: critérios da task satisfeitos por contraste automatizado, resolução de tema,
check/exportações SDK 57 aprovados e revisão do proprietário no iPhone.
A aprovação se refere a este incremento; não encerra M1 nem comprova toda F01.
VoiceOver/TalkBack, Android, safe areas, navegação e preservação de estado por UI
permanecem para M1-T02/T03. Nenhum desses testes foi inferido da aprovação genérica.
Checklist de entrega revisado; sem alteração de código nesta atualização. npm run check
reexecutado; exports não repetidos porque código, configuração e dependências permanecem iguais.
M1-T02 está liberada pela conclusão da dependência; ainda não iniciada.

## Histórico do teste manual parcial — iPhone, 21/10/2026

Fonte: relato direto do proprietário nesta conversa, após login na conta Expo no computador.
Expo Go SDK 57; modelo do iPhone e versão do iOS não informados.

- Abertura da tela inicial: aprovada pelo proprietário.
- Seleção das opções Escuro, Claro e Sistema: funcionamento confirmado pelo proprietário.
- Rolagem por toque: funcionamento confirmado pelo proprietário.

O relato não comprova mudança de aparência nas configurações do iOS, prevalência manual
sobre mudanças do sistema, StatusBar, preservação de posição, fonte ampliada, VoiceOver,
safe areas ou aprovação final da direção visual. Android ainda sem teste manual registrado.
Naquele momento, M1-T01 permanecia review; ver encerramento acima.

Checks desta atualização documental: npm run check; exportações Metro não repetidas,
pois nenhum código, dependência ou configuração foi alterado desde os bundles SDK 57 aprovados.

## Resultado automatizado anterior (SDK 58)

- npm run check: aprovado (estrutura/IDs/links, TypeScript, ESLint, Prettier e 11 testes).
- npm run export:ios: aprovado, 624 módulos, bundle Hermes.
- npm run export:android: aprovado, 622 módulos, bundle Hermes.
- Seleção de tema: sistema/claro/escuro, fallback e prevalência manual cobertos por teste da função de resolução.
- Contraste de todos os pares de texto usados ≥4,5:1; bordas/controles ≥3:1; tabela em design-system/README.md.
- Nenhuma dependência adicionada; package.json e lockfile preservados.

Aviso conhecido: Node identifica tokens.ts como módulo ES durante os testes e emite MODULE_TYPELESS_PACKAGE_JSON.
Não causa falha e não foi ocultado; o runtime do aplicativo é Metro/Hermes. Testes de UI ainda não instalados.

## Mapeamento de critérios

F01-AC1: resolução de tema testada e provider integrado sem mudança de keys/remontagem da raiz.
A preservação de estado e resposta ao sistema ainda precisam de teste de UI/em aparelho.
F01-AC2: contraste automatizado aprovado; escala de fonte habilitada, controles de 48 unidades mínimas,
sem truncamento. Leitores de tela e navegação completa dependem do roteiro abaixo/M1-T02/M1-T03.
F01-AC3: navegação e safe areas por plataforma permanecem pendentes nas próximas tasks.
M1-T01 concluída conforme encerramento acima; não considerar a milestone pronta.

## Integração conferida

A implementação foi transferida da cópia de trabalho e já está aplicada no projeto original.
Nesta sessão, diretório, diff e arquivos foram conferidos; alterações existentes preservadas, sem reaplicar patch.
Origin observado: git@github.com-pessoal:NiltonMoraesNeto/biblia-flow-app.git.
Nenhum commit/push executado. Revisão pelo checklist .agents/workflows/review.md realizada:
escopo M1-T01, dependência concluída, checks aprovados, sem corpus ou dados privados adicionados;
aceite do incremento confirmado pelo proprietário conforme encerramento acima; validação completa de F01 pendente.

## Preparar revisão em aparelho

Na pasta do projeto, usar Node 24 conforme .nvmrc e executar npm start -- --lan.
Conectar computador e celular à mesma rede; abrir o QR apresentado pelo Expo com um cliente
compatível com SDK 57 (Expo Go compatível ou development build). Não há development build preparado.
Conferir a tela real: título “Um momento de fé no seu dia.”, cartão “Um convite à pausa”
e controles Sistema/Claro/Escuro. Executar o roteiro abaixo e registrar resultados por plataforma.
O seletor permite comparar os dois temas sem mudar as configurações do aparelho.

Sem simulador iOS disponível (simctl ausente). A consulta Android não conseguiu iniciar o serviço
ADB por restrição de abertura de porta nesta sessão. Nenhuma captura ou aprovação visual foi produzida pelo agente; aprovação posterior do proprietário registrada acima.
O servidor Expo foi tentado, mas não apresentou URL/QR nesta sessão e foi encerrado;
nenhum servidor de prévia ficou ativo. O comando acima deve ser executado no terminal local para a revisão.

## Roteiro manual iOS e Android — verificações restantes

- [ ] Abrir e confirmar modo padrão Sistema.
- [ ] Alterar aparência no sistema: tema e StatusBar acompanham.
- [ ] Selecionar Claro; mudar SO para escuro: app continua claro. Repetir com Escuro.
- [ ] Voltar a Sistema e confirmar atualização imediata, sem salto de posição de rolagem.
- [ ] Ajustar fonte para 200%: textos, cartão e controles quebram linha sem corte; rolagem alcança o fim.
- [ ] Com VoiceOver/TalkBack, títulos anunciados e cada opção lida com nome e estado marcado/desmarcado.
- [ ] Confirmar área de toque, foco/ativação e safe areas em telas estreitas e tablet.
- [ ] Aprovar direção minimalista nos dois temas. Ao reiniciar, voltar a Sistema é esperado até M2.

Registrar aparelho/OS, data e resultado. Nenhum desses itens foi marcado como aprovado sem execução.
M1-T01 está done; itens restantes deste roteiro alimentam M1-T02/T03, sem bloqueio artificial da navegação.
