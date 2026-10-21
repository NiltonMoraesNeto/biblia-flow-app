# Executar uma task

1. Ler AGENTS.md e localizar ID em specs/tasks.json. Verificar dependências done e questões abertas.
2. Ler spec, milestone e ADRs relacionados; atualizar spec se escopo mudar antes de implementar.
3. Alterar status para in_progress; preencher responsável (humano ou agente) e registrar bloqueios quando houver.
4. Implementar o menor incremento com casos de erro e privacidade. Testar regras relevantes, não espelhar código.
5. Rodar npm run check; exportar bundles se mudar aplicação. Registrar comandos e resultado em evidence.
6. Conferir critérios um por um; anexar evidência manual iOS/Android quando aplicável.
7. Usar review até revisão; done só com critérios satisfeitos e evidência. Atualizar docs/engineering/status.md.

Estados permitidos: todo → in_progress → review → done; blocked requer motivo e ação de desbloqueio.
Milestones só encerram quando todas as tasks e seus critérios de saída estiverem satisfeitos.
