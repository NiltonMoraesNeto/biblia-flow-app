# Repositório pessoal e colaboração

O proprietário criou e informou o repositório pessoal: https://github.com/NiltonMoraesNeto/biblia-flow-app.git.
Origin foi configurado para essa URL e o remoto estava vazio na consulta de 21/10/2026.
Ainda não há commit/push, issues nem vínculo EAS. As orientações abaixo servem para o primeiro envio e colaboração.
Antes de criar o remoto, conferir `gh auth status` e a identidade pessoal com `gh api user`.
Nome sugerido: biblia-flow-app; confirmar visibilidade com o proprietário. Nunca usar organização lab808.
Escolher licença do código antes de torná-lo público; licenças de conteúdo permanecem independentes.

Depois de identificar a conta: criar o repo no namespace pessoal, configurar origin e conferir
`git remote -v` antes do primeiro push. CI já está preparada. Ativar proteção da branch principal
com check `quality`, revisão e bloqueio de force push conforme recursos da conta.
Não criar CODEOWNERS com identidade inventada. Issues podem espelhar tasks.json mantendo o mesmo ID;
registrar URL em evidence e não manter dois status divergentes.

Branches: feat/M1-T01-theme. Commits: feat(M1-T01): adiciona tokens. PR usa template e ID da task.
Sem deploy automático nem credenciais neste scaffold.
