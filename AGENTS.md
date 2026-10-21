# Guia dos agentes — BibliaFlow

Leia README.md, docs/product/brief.md, docs/architecture/overview.md e specs/README.md antes de editar.
Depois leia a spec da feature, a milestone e as regras em .agents/rules/engineering.md.

- Trabalhe em uma task de specs/tasks.json por vez. Confirme dependências e critérios antes de iniciar.
- Não sobrescreva trabalho existente. Inspecione status/diff e preserve mudanças alheias.
- Nenhuma feature fica pronta apenas por existir uma pasta ou uma tela de exemplo.
- Use TypeScript strict, tokens de src/theme e textos de src/i18n. Evite dependências sem necessidade.
- Consulte a documentação da versão do SDK em package.json antes de usar APIs Expo/RN.
- Não incorpore ARC ou outro corpus antes do registro de licença com escopo comprovado.
- Diário nunca entra em logs, analytics, push ou widgets; sincronização requer consentimento.
- Não prometa entrega exata de notificações ou execução contínua em segundo plano.
- Registre decisões em ADR; Supabase e solução de widgets são propostas, não escolhas implementadas.
- GitHub deve pertencer a uma conta pessoal; não configurar lab808. Nenhum remote é presumido.
- Execute npm run check e exportações Metro relevantes. Registre checks não executados e motivos.
- Commits/PRs referenciam task (ex.: feat(M1-T01): ...). Não marque done sem evidência verificável.
- Faça revisão pelo checklist .agents/workflows/review.md antes da entrega.

Ponto de entrada atual: App.tsx → src/app/BootstrapScreen.tsx. Expo Router será introduzido em M1-T02;
ao fazê-lo, mover BootstrapScreen para features e reservar src/app somente para rotas.
