# Componentes compartilhados

- AppText: tipografia, cor semântica e escala de fonte do sistema.
- Surface: superfície de cartão; textos internos usam tone="onSurface".
- Screen: conteúdo rolável com área segura superior/lateral; abas ou recuperação cuidam da borda inferior.
- ThemeSelector: seleção acessível de sistema/claro/escuro, sem persistência neste incremento.

Componentes visuais sem regras de domínio. Todos usam ThemeProvider e tokens, sem cores hex locais.
