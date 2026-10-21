# F07 — Notificações personalizáveis

Status: draft

Milestone: M7

Requisitos: R07

## Objetivo e escopo

Agenda local consentida com sugestão de cinco notificações diárias.

## Critérios de aceite

- AC1: Usuário aceita ou reduz/desativa cinco slots; horários únicos, janela de silêncio e categoria são editáveis.
- AC2: Editar/cancelar reconcilia identificadores sem duplicação; permissão negada/revogada tem recuperação.
- AC3: Mudança de fuso/DST e reinício são testados nas duas plataformas; respeitar limites do SO e não prometer entrega exata.
- AC4: Notificação abre conteúdo correto; texto respeita licença e nunca inclui diário.

## Validação

Relacionar cada AC a teste automatizado ou roteiro manual com plataforma, data e resultado na evidence da task.
Cobrir caminho feliz, estado vazio, erro e offline quando aplicável. Specs draft precisam revisão antes de entrar em desenvolvimento.

## Fora de escopo

Qualquer funcionalidade não descrita; alterações exigem revisão desta spec e das tasks antes da implementação.

## Questões abertas

Ver ADRs propostos e docs/product/brief.md; decisões de plataforma/licença dependem da milestone correspondente.
