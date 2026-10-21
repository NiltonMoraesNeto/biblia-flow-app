# Estado da entrega — 21/10/2026

M0 concluída. Implementação M1-T01 integrada e validada nesta pasta, com status done e aprovação do proprietário no iPhone.
SDK atual: Expo 57.0.31, React 19.2.3 e React Native 0.86.3, conforme ADR-0009.
Migração solicitada pelo proprietário para revisão com Expo Go SDK 57. Em 21/10/2026,
o proprietário confirmou abertura no iPhone, seleção Sistema/Claro/Escuro e rolagem por toque.
Fonte de status: specs/tasks.json. M1-T02 e demais tarefas permanecem todo.

M1-T01 contém tokens semânticos, tipografia, provedor de tema e seletor sistema/claro/escuro.
Integração conferida sem reaplicar o patch; npm run check e exportações iOS/Android aprovados
em 21/10/2026 com Node 24.12.0. Testes adicionais de tema e texto ampliado aprovados pelo proprietário; ver M1-T01-validation.md.
Persistência da preferência após reinício permanece em M2. Próxima task: M1-T02, liberada e ainda todo.

O proprietário informou primeiro push bem-sucedido e CI verde. Origin pessoal observado:
`git@github.com-pessoal:NiltonMoraesNeto/biblia-flow-app.git`. Nenhuma mudança de autenticação neste incremento.

Pendências: mockup original indisponível; aprovar telas em M1; confirmar automático/frequência em M2;
licenciar ARC em M3; decidir proteção/backup do diário em M5; validar widgets em M8; backend em M9;
revisar alertas de dependências em M10-T01. Incremento aprovado no iPhone; VoiceOver/TalkBack, Android e revisão completa de F01 permanecem em M1-T02/T03.
