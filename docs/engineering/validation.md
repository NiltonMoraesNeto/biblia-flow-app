# Validação M0 — 21/10/2026

Ambiente de validação: macOS, Node 24.22.0 isolado, npm 10.9.2; nenhuma alteração do Node global.
Template oficial blank-typescript consultado no registro npm. Expo 58.0.16, React 19.3.0,
React Native 0.88.0 e TypeScript 6.0.3. Versões completas em package-lock.json.

| Verificação                               | Resultado                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------ |
| npm ci com Node 24, usando lockfile/cache | Aprovado                                                                 |
| npm run validate:structure                | Aprovado: 33 tasks, 11 requisitos, links locais e grafo sem ciclos       |
| npm run typecheck                         | Aprovado                                                                 |
| npm run lint                              | Aprovado, sem avisos                                                     |
| npm run format:check                      | Aprovado                                                                 |
| npm test                                  | 6 testes aprovados, incluindo casos negativos do gate                    |
| npm run export:ios                        | Aprovado, bundle Hermes, 620 módulos                                     |
| npm run export:android                    | Aprovado, bundle Hermes, 618 módulos                                     |
| expo install --check em modo offline      | Sem divergências locais; o próprio Expo ressalva confiabilidade sem rede |

O Node global 23.9.0 não satisfaz engines do SDK. A instalação e os checks foram repetidos com Node 24.
ESLint foi atualizado para a linha 10 compatível com typescript-eslint e validado novamente.

## Alertas reais de dependências

Auditoria inicial: 22 alertas (7 moderados, 15 altos, nenhum crítico), propagados principalmente pelas
cadeias Expo/Metro/RN: braces, node-forge e uuid. O npm sugeriu regressões para Expo 44/RN 0.72;
nenhum downgrade incompatível ou override não validado foi aplicado. Os números são snapshot da
consulta, não garantia de que todos os avisos afetem o app em produção. Revisar alcance e correções
suportadas em M10-T01 antes de release; a base não é declarada pronta para publicação.

## Limites da validação

Sem build nativo, assinatura, simulador, aparelho ou teste visual. Bundles não comprovam layout,
notificações, widgets, acessibilidade ou política das lojas. Nenhum desses recursos está implementado.
CI está configurada, mas não executada no GitHub. Nenhum remote, owner EAS, bundle ID de loja
ou conta Apple/Google foi presumido. Corpus ARC ausente e licença pendente.
Mockup original indisponível; tela inicial é bootstrap da direção minimalista e paleta fornecida.

## Integridade da entrega

Destino inicial inspecionado e vazio. A transferência recusa colisões, copia apenas fontes/configurações,
confere SHA-256 e executa novamente o gate no destino. Lista completa em files-created.md.
Dependências, cache, bundles e repositório do template não são copiados. Git local inicializado na
branch main, sem commit ou push. Após o proprietário informar a URL, origin foi configurado para
https://github.com/NiltonMoraesNeto/biblia-flow-app.git; consulta remota retornou sem referências (vazio). Para iniciar: Node 24, npm ci, npm start.
