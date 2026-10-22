# M1-T02 — navegação e recuperação

Data: 21/10/2026. macOS, Node 24.12.0, Expo SDK 57.
Dependência M1-T01 concluída, com aprovação registrada do proprietário.

## Implementação

- Entrada expo-router/entry, layout raiz com ThemeProvider e StatusBar.
- Quatro abas: Hoje (/), Bíblia (/biblia), Diário (/diario), Ajustes (/ajustes).
- BootstrapScreen movida para features/today; src/app somente com rotas/layouts.
- Tema em Ajustes preservado entre abas; preferência continua restrita à sessão.
- Tela inexistente com recuperação para Hoje via replace; não mostra parâmetros recebidos.
- Conteúdo rolável com safe areas e barra sem altura fixa; alvos mínimos de 48 unidades.
- Bíblia/Diário indisponíveis de forma explícita. Sem corpus, dados privados ou domínio simulado.
- Decisão de implementação e dependências: ADR-0010.

## Validação automatizada

- npm ci --offline --no-audit: aprovado pelo lockfile final, 907 pacotes.
- npm run check: aprovado (estrutura, TS strict, ESLint, Prettier, 11 testes Node e 8 de integração).
- Expo Doctor: 21/21 aprovados após alinhar expo-font 57.0.4 e eliminar duplicação com versão 58.
- Exportações Metro finais: aprovadas; iOS 1121 módulos (2,4 MB), Android 1257 módulos (2,7 MB).
- Versões: Router 57.0.29, safe-area-context 5.7.0, screens 4.26.2, linking 57.0.13,
  constants 57.0.22, font 57.0.4; jest-expo 57.0.6 e Testing Library RN 13.3.3.

Falhas intermediárias resolvidas: seleção automática de peers React DOM/worklets incompatíveis,
duplicação de expo-font, estilo em array sob Link asChild (normalizado com StyleSheet.flatten),
tipos Jest explícitos para TypeScript 6 e formatação de app.json gerada pelo instalador.
O gate identificou temporariamente o link para este relatório antes da criação do arquivo;
a validação final de links passou. Nenhuma falha foi ocultada com supressões ou legacy-peer-deps.

Auditoria online em 21/10/2026: 57 alertas (49 high, 8 moderate, zero critical), incluindo
cadeias Expo/RN/Router e ferramentas Jest. A instalação offline não é evidência de ausência
de vulnerabilidades. A análise/correção continua pendente em M10-T01, junto aos alertas
anteriores; não aplicar downgrade incompatível ou audit fix --force automaticamente.
Avisos conhecidos: MODULE_TYPELESS_PACKAGE_JSON nos testes Node, NO_COLOR/FORCE_COLOR no Metro
e deprecações transitivas do ambiente Jest. Não bloqueiam os checks registrados.

Os testes renderizam os arquivos reais em src/app pelo expo-router/testing-library, com
mocks nativos do jest-expo. Cobrem entradas diretas, seleção de abas, tema preservado e
recuperação de caminhos inexistentes, inclusive sob Bíblia/Diário, sem expor query params.
Não substituem teste visual ou de deep link entregue pelo sistema operacional.

## Teste manual parcial — iPhone, 21/10/2026

O proprietário relatou: “abriu certinho as 4 abas”. Abertura das quatro abas confirmada
no iPhone com Expo Go; modelo e versão do iOS não informados. Esse relato não confirma
preservação do tema, seleção acessível, links inválidos, fonte ampliada ou safe areas.
Android continua sem evidência manual. Status M1-T02 mantido em review.

Atualização somente documental: npm run check repetido; exports não repetidos,
pois não houve alteração de código, configuração ou dependências desde os bundles aprovados.

## Falha em fonte máxima e ajuste — 21/10/2026

O proprietário confirmou troca de temas entre abas. Ao colocar a fonte no máximo,
relatou corte em todos os textos, sem acesso ao excedente lateral. Esse cenário falhou;
não considerar a aprovação anterior de fonte ampliada M1-T01 como evidência para este layout.

Ajuste implementado dentro de M1-T02: Screen calcula largura útil com janela/insets/margens,
AppText fica limitado à largura disponível e usa altura de linha nativa em fonte grande,
sem teto de escala. Opções de tema passam a uma coluna, abas a duas colunas e cartões
usam menos margem em escala ≥1,5. Nenhuma dependência alterada.

Três testes adicionais usam Dimensions com escala 3,5 e larguras 320/390/1024, verificando
limite de largura e ampliação sem truncamento imposto por props, além de navegação/tema.
Não medem glifos nativos nem certificam ausência de cortes no iPhone; reteste pendente.
Causa exata não observada por captura/simulador; nenhuma aprovação visual presumida.
Após o ajuste, npm run check aprovado com 22 testes (11 Node + 11 integração);
exports iOS 1121 e Android 1257 módulos aprovados. Checklist de revisão novamente conferido.
M1-T02 retorna a review para reteste do proprietário, sem encerrar acessibilidade.

## Reteste: textos corrigidos, rótulo Ajustes com quebra — 21/10/2026

O proprietário confirmou que o ajuste de fonte máxima deu certo para os textos, restando
na aba Ajustes a quebra “Ajuste” / “s”. A barra agora usa onTextLayout: quando o rótulo
quebra, concede uma linha inteira àquela aba sem reduzir ou limitar a fonte.
A decisão é recalculada quando largura da janela ou escala de fonte mudam; um rótulo
que coube na nova largura não herda o alargamento da configuração anterior.
Teste de regressão dispara a quebra relatada dentro do rótulo da aba e verifica expansão
com as quatro abas ainda acessíveis. Reteste físico do rótulo pendente.
Após este ajuste, npm run check aprovado com 22 testes e exports iOS/Android aprovados
(1121/1257 módulos). Checklist de revisão conferido; sem commit/push.

## Segundo reteste do botão inferior Ajustes — 21/10/2026

O proprietário confirmou que a quebra persistiu especificamente no botão da barra inferior,
não no título da tela. A expansão por onTextLayout não resolveu no aparelho e foi removida.
Em fonte ampliada, a barra passa a uma linha com rolagem horizontal e botões de largura
intrínseca: sem limite de largura/flex shrink nem quebra interna do rótulo. O texto
mantém escala do sistema, sem redução. Posição da aba selecionada é revelada no layout
e ao navegar. Em fonte normal, a barra anterior com quatro abas permanece.

Os testes em escala 3,5 verificam navegação, nomes completos, seleção, barra horizontal
e ausência de encolhimento dos botões; não certificam a medição nativa. Não houve mudança
nos títulos nem nas correções do conteúdo rolável. Reteste no iPhone continua pendente.
Em fonte máxima, deslizar a barra para os lados para alcançar todas as abas.
Check final aprovado com 22 testes; exports iOS 1121 e Android 1257 módulos aprovados.
Checklist de revisão conferido. Nenhum commit/push; M1-T02 segue review para reteste físico.

## Retomada no novo Mac — 22/10/2026

- HEAD local e HEAD/main do repositório pessoal conferidos por HTTPS:
  `bf0761abb3fb3db344af715fe94c93e5080eb6ba`. Os 103 arquivos versionados estão
  presentes; git fsck aprovado e árvore inicialmente limpa, sem diff a preservar.
  A correção final da barra horizontal está incluída nesse commit.
- Node 24.12.0 e npm 11.6.2 disponíveis; Node atende .nvmrc e engines (>=24.3.0 <25).
- npm ci --no-audit --no-fund aprovado: 907 pacotes. Manifesto e lockfile intactos.
  Expo 57.0.31, React 19.2.3, RN 0.86.3 e Router 57.0.29 confirmados após instalação.
  expo install --check e Expo Doctor 1.21.5 (21/21 checks) aprovados;
  SDK 58 não instalado.
- npm run check aprovado: estrutura, TypeScript strict, lint, formatação,
  11 testes Node e 11 de integração. Exportações Metro aprovadas:
  iOS 1121 módulos (2,4 MB) e Android 1257 módulos (2,7 MB).
- Tentativas restritas de instalação/exportação encontraram limites de rede/cache
  e escrita em ~/.expo; repetidas com autorização e concluídas. Nenhuma mudança
  de credenciais globais, conta empresarial ou remote. O alias github.com-pessoal
  permanece no origin, mas sua autenticação neste Mac não foi validada; a comparação
  com GitHub usou HTTPS, sem fetch/pull/push.
- O proprietário respondeu “Retestei e funcionou” à confirmação de que Ajustes
  aparece inteiro em uma linha em fonte máxima e de que a barra permite acessar
  as quatro abas. Reteste físico dessa correção aprovado no iPhone.
  Em seguida, confirmou: “já abri o app todo e consegui mexer nele”, informando
  iPhone 14; versão do iOS não informada. Uso geral e navegação confirmados nesse
  aparelho. Não estender esse relato a safe areas, links inválidos via SO, offline
  ou leitores de tela sem confirmação específica; disponibilidade Android não informada.
- Este Mac tem Command Line Tools, sem simctl disponível. adb não encontrado.
  Não executados: teste físico Android, leitores de tela, safe areas e deep links
  entregues pelo sistema operacional, além do cenário offline do roteiro abaixo.
  Os testes com mocks e exports não substituem essas verificações.

Revisão pelo checklist .agents/workflows/review.md: task/dependência e diff conferidos;
somente evidências/status atualizados, sem mudança de implementação ou dependências.
Nenhum corpus, dado privado, segredo, commit ou push adicionado.
M1-T02 permanece review pelos cenários pendentes; M1-T03 permanece todo por depender
de M1-T02 done. Não há aprovação presumida para encerrar M1/F01.

## Critérios após a retomada

F01-AC1: preferência manual mantida ao navegar, coberta por integração. Resposta ao sistema
tem evidências M1-T01; novos cenários de estado/rolagem em navegação requerem aparelho.
F01-AC2: abas com nomes e seleção acessíveis, texto escalável e contraste pelos mesmos tokens.
VoiceOver/TalkBack e fonte ampliada nas quatro rotas ainda não executados pelo agente.
F01-AC3: recuperação exercitada no Router; safe areas implementadas, sem validação física
iOS/Android nesta sessão. Não há simulador iOS configurado nem aparelho Android conectado validado.

Mudança usa módulos distribuídos no Expo Go SDK 57; não houve prebuild, build nativo,
assinatura, publicação ou validação de binário. Revisão física completa nas duas plataformas pendente; abertura das abas no iPhone confirmada acima.
Na retomada inicial, M1-T02 permaneceu review após checks; aceite final registrado abaixo.

## Aceite e encerramento — 22/10/2026

Após ser informado das verificações pendentes, o proprietário autorizou explicitamente:
“pode concluir a M1-T02”. M1-T02 passa a done com base na implementação, testes das rotas
reais e recuperação de caminhos inválidos, src/app restrito a rotas/layouts, check com
22 testes e exports aprovados, além da navegação, tema e fonte máxima confirmados no iPhone 14.

Esse aceite encerra o incremento de navegação. Não declara executados os testes físicos
de safe areas, links entregues pelo SO, offline, leitores de tela ou Android. O roteiro
abaixo segue para M1-T03, cuja dependência agora está satisfeita. M1/F01 continuam abertas.
Mudança somente documental/de estado; exports desta sessão permanecem válidos, sem
repetição porque código, configuração e dependências não mudaram. Checklist de revisão
conferido novamente; sem commit/push.

## Roteiro de revisão em iOS e Android — continuar em M1-T03

1. Encerrar o servidor anterior e executar npm start -- --clear --lan; abrir o novo QR.
   No iPhone, Expo CLI e Expo Go precisam estar conectados à mesma conta Expo.
2. Percorrer Hoje → Bíblia → Diário → Ajustes; conferir rótulos e aba selecionada.
3. Em Ajustes, escolher Escuro; percorrer abas e confirmar tema mantido. Repetir Claro/Sistema.
4. Ampliar a fonte; conferir rótulos sem corte, conteúdo rolável e controles alcançáveis.
5. Conferir topo/notch e barra inferior acima do indicador de início/gestos, em ambas as plataformas.
6. VoiceOver/TalkBack: percorrer abas, confirmar nome e seleção e ativar cada destino.
7. No Expo Go, abrir exp://HOST:PORT/--/biblia e /--/ajustes com o endereço do QR atual;
   abrir /--/pagina-inexistente e /--/biblia/inexistente: mensagem pt-BR e Voltar para Hoje.
   Em development build, equivalentes bibliaflow:///biblia e bibliaflow:///pagina-inexistente.
8. Com bundle já carregado, ficar sem internet e percorrer abas/recuperação; não exigir
   primeiro carregamento do servidor Metro sem rede.
9. Registrar aparelho, versão do sistema, data, resultado e problemas. Não preencher por inferência.

## Revisão de entrega

Checklist .agents/workflows/review.md: escopo M1-T02 e dependência conferidos; mudanças
anteriores preservadas; sem secrets/corpus; sem backend/persistência; critérios automatizados
e limitações manuais discriminados. Sem commit/push pelo agente.
