# F11 — Qualidade e publicação

Status: draft

Milestone: M10

Requisitos: R11

## Objetivo e escopo

Publicar somente após aceite e direitos comprovados.

## Critérios de aceite

- AC1: Checklist docs/engineering/release-checklist.md completo com evidência e responsável.
- AC2: Builds assinados passam smoke iOS/Android, instalação limpa e upgrade; bundles não substituem isso.
- AC3: Remote GitHub pessoal conferido; IDs de loja e contas confirmados, sem vínculo lab808.

## Validação

Relacionar cada AC a teste automatizado ou roteiro manual com plataforma, data e resultado na evidence da task.
Cobrir caminho feliz, estado vazio, erro e offline quando aplicável. Specs draft precisam revisão antes de entrar em desenvolvimento.

## Fora de escopo

Qualquer funcionalidade não descrita; alterações exigem revisão desta spec e das tasks antes da implementação.

## Questões abertas

Ver ADRs propostos e docs/product/brief.md; decisões de plataforma/licença dependem da milestone correspondente.
