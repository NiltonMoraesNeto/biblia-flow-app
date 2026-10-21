# F10 — Conta, sincronização e offline

Status: draft

Milestone: M9

Requisitos: R10

## Objetivo e escopo

Sincronização opcional preservando uso local.

## Critérios de aceite

- AC1: Uso sem conta permanece funcional; primeira sincronização exige consentimento e prévia dos dados.
- AC2: Conflitos de diário preservam ambas versões; outbox repete operações sem duplicação e propaga tombstones.
- AC3: Logout, troca de conta e exclusão não vazam dados entre usuários; acesso remoto por outro usuário é negado.
- AC4: Após período offline e reconexão, convergência é testada com dois clientes e falha parcial.

## Validação

Relacionar cada AC a teste automatizado ou roteiro manual com plataforma, data e resultado na evidence da task.
Cobrir caminho feliz, estado vazio, erro e offline quando aplicável. Specs draft precisam revisão antes de entrar em desenvolvimento.

## Fora de escopo

Qualquer funcionalidade não descrita; alterações exigem revisão desta spec e das tasks antes da implementação.

## Questões abertas

Ver ADRs propostos e docs/product/brief.md; decisões de plataforma/licença dependem da milestone correspondente.
