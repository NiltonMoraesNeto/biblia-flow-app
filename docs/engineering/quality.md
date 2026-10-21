# Estratégia de validação

M0: validador de estrutura/IDs/links/dependências, testes do próprio gate, typecheck, lint,
formatação e exportações Metro iOS/Android. CI repete check e bundles usando npm ci e Node 24.
Gate de rastreabilidade falha com spec ausente, ciclo, dependência desconhecida ou done sem evidência.

Por feature: testes de domínio para licenciamento, agenda, troca de fuso, seleção de conteúdo,
conflitos e migrações; testes de integração para storage/adaptadores e componentes quando existirem.
Introduzir runner compatível com RN e testes de UI em M1, sem chamar teste de estrutura de teste visual.
E2E em aparelhos/builds nas duas plataformas: onboarding, offline, diário, favoritos, permissão negada,
notificações e widget/deep link. Nenhuma meta percentual substitui cobertura de cenários críticos.

Definition of Ready: spec com escopo, erros, critérios mensuráveis, dependências e questões resolvidas.
Definition of Done: implementação e revisão, aceite satisfeito, checks/evidências registrados,
docs/ADR atualizados, sem pendência ocultada. Regras nativas precisam evidência em aparelho real.
Publicação exige M10 e checklist de release; bundles Metro não comprovam build de loja.

Referências da CI: [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node).
Execução remota aguarda criação do repositório pessoal; validação local não equivale a CI executada.
