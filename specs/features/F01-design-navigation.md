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
