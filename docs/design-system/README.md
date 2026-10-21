# Direção visual — proposta 2

Minimalismo, tipografia legível, hierarquia curta, cartões discretos e poucas imagens.
Sem imagem decorativa obrigatória; sem carrossel visual dominante. Priorizar a leitura.

| Token  | Cor     | Uso                                                 |
| ------ | ------- | --------------------------------------------------- |
| forest | #365B4C | texto e ação no tema claro                          |
| sage   | #A8B9A4 | superfícies de apoio                                |
| cream  | #F5F1E8 | fundo claro                                         |
| sand   | #D6BE91 | destaque discreto; evitar como texto em fundo claro |

Tokens implementados em src/theme/tokens.ts. Tema escuro inicial usa night/mist derivados;
sua aprovação visual está pendente. Não considerar cada par da paleta automaticamente acessível.
M1 deve medir contraste de texto normal ≥4,5:1, texto grande ≥3:1 e componentes ≥3:1.
Usar espaçamento 8/16/24/32, tipografia do sistema, suporte a escala de fonte, safe areas e foco semântico.
Botões 44 pt iOS/48 dp Android. Testar claro/escuro com VoiceOver/TalkBack.

Navegação proposta para M1: Hoje, Bíblia, Diário e Ajustes; favoritos acessíveis pela leitura.
Mockup original indisponível: a tela M0 é apenas bootstrap, não a proposta visual final.
