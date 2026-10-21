# F05 — Diário e descoberta de pregações

Status: draft

Milestone: M5

Requisitos: R05

## Objetivo e escopo

Diário local privado e definição de escopo para pregações.

## Critérios de aceite

- AC1: Criar, editar, reabrir e excluir nota offline; falha de escrita não apaga versão anterior.
- AC2: Exportação e exclusão exigem ação explícita; conteúdo nunca entra em logs, widgets ou notificações.
- AC3: Decidir proteção em repouso e backup antes de persistir dados reais; pregações têm decisão documentada de escopo/licença.

## Validação

Relacionar cada AC a teste automatizado ou roteiro manual com plataforma, data e resultado na evidence da task.
Cobrir caminho feliz, estado vazio, erro e offline quando aplicável. Specs draft precisam revisão antes de entrar em desenvolvimento.

## Fora de escopo

Qualquer funcionalidade não descrita; alterações exigem revisão desta spec e das tasks antes da implementação.

## Questões abertas

Ver ADRs propostos e docs/product/brief.md; decisões de plataforma/licença dependem da milestone correspondente.
