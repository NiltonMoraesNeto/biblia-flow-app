# Arquitetura inicial

React Native + Expo + TypeScript strict. Base proveniente do template oficial blank-typescript,
SDK 58; versões exatas resolvidas pelo lockfile. Node 24 LTS para desenvolvimento e CI.

App.tsx → src/app/BootstrapScreen.tsx → theme/i18n. Sem domínio simulado no bootstrap.
M1-T02 introduz Expo Router; src/app passa a conter somente rotas e layouts.
Features possuem componentes, casos de uso e contratos. Services implementam interfaces de
armazenamento, relógio, notificações e catálogo. Components/hooks compartilhados só quando necessários.

Modelo proposto: ContentItem(id, kind, source, licenseId, revision), VerseReference(translation, book,
chapter, verse), Preferences(locale, theme, reminderSlots, automatic), JournalEntry(id, text,
createdAt, updatedAt, deletedAt), Favorite(contentId), ScheduledReminder(contentId, slot, timezone).
IDs persistentes e revisão de conteúdo evitam links quebrados e duplicatas.

Persistência local proposta: SQLite com migrações transacionais e rollback testado. Tokens de sessão
em armazenamento seguro, nunca no diário. Backup/exportação e política de criptografia serão decididos
antes de persistir dados reais. Nenhum backend instalado em M0.

Sincronização opcional: outbox, operações idempotentes, tombstones e resolução explícita de conflitos
de diário; não sobrescrever texto silenciosamente. Supabase é candidato a comparar, não dependência aprovada.
Widgets recebem apenas snapshot público/devocional autorizado e revisionado. Deep links validam IDs.
Permissão negada, item removido e ausência de rede têm estados definidos pelas specs.

Fontes verificadas em 21/10/2026: [SDK 58](https://docs.expo.dev/versions/v58.0.0/),
[SQLite](https://docs.expo.dev/versions/v58.0.0/sdk/sqlite/),
[notificações](https://docs.expo.dev/versions/v58.0.0/sdk/notifications/),
[development builds](https://docs.expo.dev/develop/development-builds/introduction/).
Consultar novamente APIs e compatibilidade na execução de cada task; não depender de memória do agente.
