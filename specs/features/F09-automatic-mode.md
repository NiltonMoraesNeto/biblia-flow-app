# F09 — Modo automático

Status: draft

Milestone: M7

Requisitos: R09

## Objetivo e escopo

Selecionar conteúdo/agenda dentro do que a pessoa permitiu.

## Critérios de aceite

- AC1: Após confirmar semântica em M2, habilitar seleciona apenas categorias/fontes autorizadas e horários permitidos.
- AC2: Seleção determinística por data local e preferências evita repetições no dia; sem candidato retorna estado vazio.
- AC3: Desabilitar interrompe futuras seleções automáticas e reconcilia agenda sem alterar notas ou favoritos.
- AC4: Sem rede e sem execução contínua, usa catálogo local e horizonte agendado; não requer geração por IA.

## Validação

Relacionar cada AC a teste automatizado ou roteiro manual com plataforma, data e resultado na evidence da task.
Cobrir caminho feliz, estado vazio, erro e offline quando aplicável. Specs draft precisam revisão antes de entrar em desenvolvimento.

## Fora de escopo

Qualquer funcionalidade não descrita; alterações exigem revisão desta spec e das tasks antes da implementação.

## Questões abertas

Ver ADRs propostos e docs/product/brief.md; decisões de plataforma/licença dependem da milestone correspondente.
