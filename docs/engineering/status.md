# Estado da entrega — 22/10/2026

Retomada no novo Mac: commit bf0761a corresponde ao HEAD/main pessoal no GitHub;
103 arquivos versionados presentes e árvore inicialmente limpa. Node 24.12.0,
npm ci (907 pacotes), check (22 testes), verificação de dependências Expo e exports
Metro iOS/Android aprovados; manifesto e lockfile preservados. Sem commit/push.
O proprietário confirmou o reteste da barra em fonte máxima: Ajustes inteiro e
quatro abas alcançáveis; confirmou também uso geral do app no iPhone 14.
iOS 26.6.2 informado posteriormente pelo proprietário. M1-T02 concluída por aceite explícito do proprietário
em 22/10/2026. Demais cenários manuais seguem no roteiro da M1-T03, especialmente
safe areas/deep links via SO, offline, leitores de tela e Android.
M1-T03 em andamento: Maestro 2.11.0/OpenJDK 27 instalados, três fluxos com sintaxe
aprovada, controles com testID e comandos npm para UI. Check com 22 testes e exports
iOS/Android aprovados após a instrumentação. Execução nativa e aprovação visual pendentes;
sem simulador iOS ou adb neste Mac. Android da esposa disponível futuramente; proprietário
instalará Expo Go SDK 57 no Android quando disponível. Por escolha explícita, revisão
manual nos aparelhos físicos, sem exigir Xcode ou simuladores. Maestro permanece opcional;
automação iOS fora desse fluxo. Roteiro em M1-T03-validation.md; decisões em ADR-0011/0012.

M1-T03, resultados manuais no iPhone 14 confirmados pelo proprietário: navegação,
Claro/Escuro, tema Sistema acompanhando o SO, fonte máxima, áreas seguras nas abas,
uso com/sem Wi-Fi e dados móveis e VoiceOver nas abas/opções de tema. Três links
inválidos abertos por QR (/pagina-inexistente, /biblia/inexistente, /diario/inexistente)
mostraram recuperação e retorno para Hoje; mensagem/botão sem cortes e VoiceOver
na recuperação também aprovados. iOS 26.6.2 informado pelo proprietário; versão do
Expo Go não informada. Android/TalkBack e revisão visual Android adiados a pedido
do proprietário para quando o app estiver mais completo, sem prazo definido.
M1-T03/M1/F01 não concluídas; adiamento não conta como aprovação Android.

M0 concluída. Implementação M1-T01 integrada e validada nesta pasta, com status done e aprovação do proprietário no iPhone.
SDK atual: Expo 57.0.31, React 19.2.3 e React Native 0.86.3, conforme ADR-0009.
Migração solicitada pelo proprietário para revisão com Expo Go SDK 57. Em 21/10/2026,
o proprietário confirmou abertura no iPhone, seleção Sistema/Claro/Escuro e rolagem por toque.
Fonte de status: specs/tasks.json. M1-T02 done, com aceite do proprietário, check (22 testes após ajuste de fonte máxima), Expo Doctor 21/21 e exports iOS/Android aprovados; M1-T03 in_progress e seguintes todo.

M1-T01 contém tokens semânticos, tipografia, provedor de tema e seletor sistema/claro/escuro.
Integração conferida sem reaplicar o patch; npm run check e exportações iOS/Android aprovados
em 21/10/2026 com Node 24.12.0. Testes adicionais de tema e texto ampliado aprovados pelo proprietário; ver M1-T01-validation.md.
Persistência da preferência após reinício permanece em M2.

M1-T02 introduz Expo Router 57, abas Hoje/Bíblia/Diário/Ajustes e recuperação de link inválido.
ThemeProvider no layout raiz; aparência em Ajustes. src/app somente com rotas/layouts;
BootstrapScreen movida para features/today. Leitura/diário ainda indisponíveis.
ADR-0010 registra implementação e dependências. M1-T02-validation.md registra o aceite
e o roteiro nativo pendente para M1-T03, agora em andamento. O proprietário confirmou a abertura das quatro abas
no iPhone e a troca de temas entre abas. Fonte máxima falhou com corte dos textos;
textos corrigidos e aprovados no reteste do proprietário; rótulo Ajustes ganhou
barra rolável em fonte ampliada após expansão de linha não resolver no aparelho.
Reteste do botão Ajustes aprovado em 22/10/2026; títulos não alterados. Demais cenários manuais permanecem pendentes.

O proprietário informou primeiro push bem-sucedido e CI verde. Origin pessoal observado:
`git@github.com-pessoal:NiltonMoraesNeto/biblia-flow-app.git`. Nenhuma mudança de autenticação neste incremento.

Pendências: mockup original indisponível; aprovar telas em M1; confirmar automático/frequência em M2;
licenciar ARC em M3; decidir proteção/backup do diário em M5; validar widgets em M8; backend em M9;
revisar alertas de dependências em M10-T01. Incremento aprovado no iPhone; VoiceOver/TalkBack, Android e revisão completa de F01 permanecem em M1-T03.
