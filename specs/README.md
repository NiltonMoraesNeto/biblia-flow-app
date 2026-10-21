# Desenvolvimento orientado por especificações

Fluxo: requisito Rxx → spec Fxx → ADR quando necessário → milestone Mx → task Mx-Txx → evidência.
Fonte de estado das tarefas: tasks.json. Status de feature draft/ready/implemented;
status de tarefa todo/in_progress/review/done/blocked. Dependências done são obrigatórias para concluir.
Cada task contém owner, dependsOn, specs, acceptance, evidence e blockedReason.
As milestones têm critérios de saída; não inferir progresso pelo número de documentos.

Antes de implementar, revisar spec draft e resolver premissas relevantes. Uma tarefa pode detalhar critérios,
mas não remover AC da feature. Evidência associa IDs AC a teste/roteiro, data, plataforma e resultado.
Atualizar o estado no mesmo PR da mudança. Validador garante integridade, não a veracidade do aceite.

Mapa: [requisitos](../docs/product/requirements.md), [roadmap](../docs/product/roadmap.md),
[tasks](tasks.json), [Definition of Done](../docs/engineering/quality.md).
