# Regras de engenharia e qualidade

Separar UI → casos de uso → contratos de domínio → adaptadores. Sem chamadas a SDK diretamente nas telas.
Tipar fronteiras e validar dados externos. Não usar any, ts-ignore ou supressões de lint para esconder defeitos.
Arquivos pequenos com nomes descritivos; comentários explicam decisões. Evitar abstrações sem caso de uso.
Erros recuperáveis têm mensagem em português e ação de recuperação; nunca registrar conteúdo privado.
Layout respeita safe areas, fonte ampliada, VoiceOver/TalkBack e alvos mínimos de 44 pt/48 dp.
Sem hex em telas; contraste deve ser medido por combinação, inclusive dark mode.
Fuso vem do dispositivo; formato pt-BR por padrão, arquitetura preparada para outros idiomas.

Portões de PR: instalação pelo lockfile, estrutura/rastreabilidade, TS, lint, formatação e testes relevantes.
Exportação Metro iOS/Android verifica bundle, não assinatura/compilação nativa nem comportamento em aparelho.
Mudanças nativas exigem build de desenvolvimento e evidência nas duas plataformas.
Credenciais só no ambiente seguro; EXPO_PUBLIC_* é público. Não versionar diário nem corpus restrito.
Dependências nativas via npx expo install com documentação do SDK; alterações de lockfile revisadas.
