# F01 — Design e navegação

Status: ready

Milestone: M1

Requisitos: R01

## Objetivo e escopo

Sistema visual e navegação acessíveis.

## Critérios de aceite

- AC1: Alternar tema do sistema sem perder estado; preferência manual prevalece.
- AC2: Fonte ampliada e leitor de tela percorrem Hoje/Bíblia/Diário/Ajustes; contraste medido.
- AC3: Rotas inválidas exibem recuperação; safe areas testadas em iOS/Android.

## Validação

Relacionar cada AC a teste automatizado ou roteiro manual com plataforma, data e resultado na evidence da task.
Cobrir caminho feliz, estado vazio, erro e offline quando aplicável. Specs draft precisam revisão antes de entrar em desenvolvimento.

## Fora de escopo

Qualquer funcionalidade não descrita; alterações exigem revisão desta spec e das tasks antes da implementação.

## Questões abertas

Ver ADRs propostos e docs/product/brief.md; decisões de plataforma/licença dependem da milestone correspondente.

## Incremento M1-T01

- Temas: sistema (padrão), claro e escuro; mudança manual prevalece até voltar a sistema.
- A seleção é mantida durante a sessão sem remontar a árvore; persistência após reinício pertence a M2.
- Scheme nativo ausente ou unspecified: usar claro. StatusBar acompanha o tema resolvido.
- AppText centraliza escala de fonte e tipografia; controles têm mínimo de 48 unidades lógicas,
  texto sem truncamento e quebra de linha. Sem alturas fixas para conteúdo textual.
- Contraste: texto normal ≥4,5:1; controles/bordas ≥3:1. Ver tabela em docs/design-system/README.md.
- Acessibilidade nativa, safe areas e navegação exigem os roteiros M1-T02/T03; esta entrega não as comprova.
- Revisão de escopo realizada em 21/10/2026 com base no pedido de continuidade; não significa aprovação visual.

## Incremento M1-T02

- Rotas / (Hoje), /biblia, /diario, /ajustes; abas visíveis com rótulos pt-BR e estado selecionado acessível.
- Preferência de tema disponível em Ajustes e preservada ao percorrer abas durante a sessão.
- Conteúdo de Hoje mantém o convite à pausa; Bíblia/Diário informam indisponibilidade, sem corpus ou escrita.
- Caminho inexistente, inclusive sob /biblia ou /diario, mostra recuperação para Hoje sem reproduzir parâmetros.
- src/app contém somente layouts e rotas; implementação de telas permanece em features.
- Safe areas implementadas para conteúdo e barra; validação física iOS/Android permanece obrigatória,
  sem confundir mocks dos testes de navegação com teste de acessibilidade/aparelho.
- Fonte máxima: conteúdo limitado à largura útil, com quebra de linha e rolagem vertical;
  tema empilhado; em fonte ampliada, barra de abas horizontal rolável com rótulos em uma linha
  e largura intrínseca, revelando a aba selecionada. Não reduzir/capar a ampliação para ocultar cortes.

## Incremento M1-T03 em andamento

- Maestro local como runner externo (ADR-0011), sem atualizar o SDK ou incluir dependência nativa no app.
- Fluxos para navegação/tema, links inválidos via SO e barra em fonte ampliada configurada no sistema.
- Roteiro manual de VoiceOver/TalkBack, safe areas, fonte máxima, offline e aprovação visual nas duas plataformas.
- Por decisão do proprietário (ADR-0012), executar a revisão em aparelhos físicos com Expo Go SDK 57,
  sem exigir simuladores ou automação iOS; fluxos Maestro ficam opcionais, sem dispensar os critérios nativos.
- Sintaxe aprovada ou teste com mocks não satisfaz revisão em aparelho. Evidência por cenário e plataforma
  em docs/engineering/M1-T03-validation.md; AC1–AC3 continuam exigidos para concluir F01/M1.
