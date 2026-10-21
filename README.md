# BibliaFlow

Base de engenharia para aplicativo bíblico minimalista em React Native + Expo + TypeScript, iOS/Android.
Esta entrega prepara M0; funcionalidades M1–M10 não estão implementadas.

## Começar

Node 24 (ver .nvmrc), npm e um ambiente Expo compatível.

```sh
npm ci
npm run check
npm start
```

`npm run ios` / `npm run android` abrem o desenvolvimento com ambiente compatível instalado.
`npm run export:ios` e `npm run export:android` verificam bundles, sem compilar ou assinar o aplicativo.
Widgets e outros recursos nativos exigirão development builds; não presumir suporte no Expo Go.
SDK e compatibilidade: [documentação Expo 58](https://docs.expo.dev/versions/v58.0.0/).

## Mapa de engenharia

- [AGENTS.md](AGENTS.md): entrada do harness; regras e workflows em .agents/.
- [Produto e premissas](docs/product/brief.md), [requisitos](docs/product/requirements.md) e [roadmap](docs/product/roadmap.md).
- [Specs](specs/README.md), [tasks rastreáveis](specs/tasks.json), milestones e templates.
- [ADRs](docs/adr/README.md), [arquitetura](docs/architecture/overview.md) e [design system](docs/design-system/README.md).
- [Qualidade](docs/engineering/quality.md), [status](docs/engineering/status.md), [validação](docs/engineering/validation.md).
- [GitHub pessoal](docs/engineering/github.md) e [gate de licenciamento](docs/architecture/content-licensing.md).

## Escopo e próximos passos

Direção 2 minimalista, paleta aprovada, tema por sistema e textos pt-BR centralizados.
ARC é preferência pendente de licença; nenhum corpus incluído. Diário, notificações, automático,
widgets e sincronização constam nas specs e tasks. Nenhum backend ou conta EAS configurado. Origin vinculado ao [repositório pessoal](https://github.com/NiltonMoraesNeto/biblia-flow-app); sem push nesta entrega.
Primeiro executar M1-T01; decisões do produto pendentes estão em M2 e licenciamento em M3.
Mockup original não recuperado; validar telas com o proprietário em M1.
