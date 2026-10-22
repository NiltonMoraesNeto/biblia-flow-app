# M1-T03 — testes de UI e aprovação visual

Data: 22/10/2026. Status: in_progress. Dependência M1-T02 done com aceite explícito.
Alterações anteriores de M1-T02 preservadas, sem commit/push. Decisões: ADR-0011 e ADR-0012.

## Fluxo escolhido pelo proprietário

Revisão manual em aparelhos físicos com Expo Go SDK 57: iPhone 14 e Android da esposa
quando disponível. O proprietário não deseja simuladores. Xcode, Android Studio,
simuladores e depuração USB não são requisitos para esse fluxo. Seguir o roteiro
manual abaixo e registrar resultados por cenário/plataforma. Automação iOS não será
executada neste fluxo nem ficará como condição adicional de encerramento; todos os
critérios de acessibilidade e aprovação visual da spec continuam exigidos (ADR-0012).

## Preparação e evidências locais

- Maestro 2.11.0 e OpenJDK 27 instalados via Homebrew; maestro --version confirmado.
  Seleção de JAVA_HOME por processo, sem editar shell, credenciais ou SDK do projeto.
  Aviso de reflexão do Java 27 observado; não impediu os comandos de sintaxe.
- npm run test:ui:syntax aprovado nos três fluxos, incluindo o helper referenciado.
  Isso valida parsing; seletores e gestos ainda não verificados no runtime nativo.
- npm run check aprovado: estrutura, TS strict, lint, formatação e 22 testes.
- Exports Metro iOS (1121 módulos, 2,4 MB) e Android (1257 módulos, 2,7 MB) aprovados
  após adicionar testID aos controles. Sem atualização do lockfile ou dependências do app.
- maestro list-devices não encontrou alvos móveis; listou somente Chromium web, fora
  do escopo. Sem Xcode completo/simulador iOS ou adb disponível neste Mac.
  Não executar fluxos contra navegador como substituto de validação iOS/Android.
- Proprietário confirmou iPhone 14; versão do iOS pendente. Android da esposa poderá
  ser usado quando disponível. Resultados manuais posteriores estão registrados ao final.

## Preparar os aparelhos físicos

Para teste manual Android, instalar [Expo Go SDK 57](https://expo.dev/go?device=true&platform=android&sdkVersion=57)
no aparelho, pela página oficial que seleciona a versão compatível. Não atualizar o
projeto para SDK 58. Mac e celular devem estar na mesma rede; usar o QR do Metro atual.
No iPhone, Expo CLI e Expo Go precisam estar conectados à mesma conta Expo.

No Mac, executar npm start -- --clear --lan e abrir o QR atual no Expo Go do celular.
O iPhone já possui Expo Go; nenhuma instalação adicional foi solicitada para ele.
Quando o Android estiver disponível, confirmar modelo, versão do sistema e Expo Go.

## Fluxos de automação preservados — opcionais

Esta seção documenta as ferramentas já preparadas. Não é o fluxo escolhido pelo
proprietário e não implica pedido de instalação adicional. No iPhone físico,
usar exclusivamente o roteiro manual; o Maestro local escolhido não o automatiza.

Maestro/Java são ferramentas externas ao npm ci. Para reproduzir em outro Mac:

```sh
brew install mobile-dev-inc/tap/maestro
export JAVA_HOME="$(brew --prefix openjdk)/libexec/openjdk.jdk/Contents/Home"
npm run test:ui:syntax
npm start -- --clear --lan
```

Abrir o projeto no Expo Go do alvo e resolver os diálogos iniciais antes dos fluxos.
Obter o identificador do Expo Go instalado e o endereço do QR. APP_URL deve ser a
base de deep link sem barra final: exp://HOST:PORT/--. Em build próprio, usar a base
do scheme configurado. Nenhum binário próprio foi criado nesta task.

Em outro terminal, com JAVA_HOME configurado e alvo móvel disponível:

```sh
npm run test:ui -- -e APP_ID=IDENTIFICADOR_DO_APP -e APP_URL=exp://HOST:PORT/-- --device ID_DO_ALVO
```

Substituir os valores em maiúsculas pelos reais; não executar literalmente esses
placeholders. Não limpar dados do Expo Go ou presumir persistência de tema após reinício.

O fluxo navigation percorre abas, aciona Escuro/Claro/Sistema e captura Ajustes;
a preservação de tema continua coberta também pelo teste de integração existente.
invalid-links abre três caminhos inexistentes via SO e verifica retorno para Hoje.
Para fonte ampliada, configurar a maior fonte de acessibilidade no sistema do alvo
e então executar separadamente:

```sh
npm run test:ui:large-text -- -e APP_ID=IDENTIFICADOR_DO_APP -e APP_URL=exp://HOST:PORT/-- --device ID_DO_ALVO
```

Esse fluxo exige barra rolável, busca e aciona as quatro abas e captura Hoje/Ajustes.
Mesmo passando, requer inspeção visual de glifos, rótulos e cortes. Fluxos comuns
esperam fonte padrão; o fluxo ampliado tem tag própria e não roda por engano junto.
Capturas e saídas ficam em artifacts/ui, ignoradas pelo Git. Examinar antes de anexar
somente as evidências relevantes ao relatório. Não usar diário real nem dados privados.

## Matriz inicial de aceite — resultados posteriores ao final

| Critério                       | Evidência existente                                                         | M1-T03 pendente                                                                         |
| ------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Runner de UI                   | Maestro instalado; três fluxos com sintaxe aprovada                         | Automação opcional; revisão manual em aparelhos físicos conforme ADR-0012               |
| F01-AC1 tema/estado            | Testes de integração e aceite iPhone de M1-T01/T02                          | Rever Sistema/Claro/Escuro e posição de rolagem nas quatro abas em ambas as plataformas |
| F01-AC2 fonte/contraste        | Contraste AA medido em testes; fonte máxima aprovada no iPhone 14 em M1-T02 | Revisar fonte máxima e telas; VoiceOver/TalkBack; Android                               |
| F01-AC3 recuperação/safe areas | Recuperação testada com Router; safe areas implementadas                    | Links entregues pelo SO e safe areas físicas iOS/Android                                |
| Offline e aprovação visual     | Ainda sem evidência específica                                              | Navegar com bundle carregado sem rede e obter aprovação das telas nas duas plataformas  |

## Roteiro manual em aparelho

Registrar para cada cenário: data, modelo, versão do SO/Expo Go, tema, tamanho da fonte,
resultado (passou/falhou/não executado), problema e captura quando útil. iPhone 14 é
o modelo conhecido; não presumir a versão do iOS nem preencher Android sem execução.

1. Percorrer as quatro abas em Claro, Escuro e Sistema. Conferir preferência mantida
   e comportamento ao alterar aparência no SO. Rolar conteúdo e voltar à aba para
   conferir estado. Não exigir persistência após reinício (M2).
2. Repetir com maior fonte de acessibilidade. Ler todo o conteúdo com rolagem vertical;
   deslizar a barra horizontal e abrir as quatro abas. Ajustes deve aparecer inteiro
   em uma linha, sem redução da fonte. Verificar todos os controles alcançáveis.
3. Conferir topo, notch e indicador de início/gestos: textos e botões não sobrepostos,
   incluindo tela de link inválido. Repetir no Android quando disponível.
4. VoiceOver: ativar em Ajustes → Acessibilidade → VoiceOver; percorrer com deslizes
   de um dedo e ativar com toque duplo. Conferir nomes Hoje/Bíblia/Diário/Ajustes,
   estado selecionado, opções de tema e retorno para Hoje; evitar foco preso ou oculto.
   Para desativar, usar o mesmo ajuste com os gestos do VoiceOver. Repetir com TalkBack
   no Android. Registrar o anúncio ouvido; assertVisible não comprova leitura correta.
5. Abrir links /biblia, /ajustes, /pagina-inexistente, /biblia/inexistente e
   /diario/inexistente pelo SO usando exp://HOST:PORT/-- como base do QR atual.
   Conferir mensagem e Voltar para Hoje, sem exibir parâmetros. Não usar texto privado.
6. Com o bundle já carregado, desligar a rede do aparelho e percorrer abas/temas;
   não recarregar o bundle. Registrar se houve erro e restaurar a rede após o teste.
   Não exigir primeiro carregamento Metro sem rede.
7. Proprietário revisa as quatro telas e a recuperação nos dois temas e fonte máxima.
   Registrar aprovação ou alterações solicitadas. Leitura/diário continuam indisponíveis.

## Revisão de entrega parcial

### Teste manual parcial — iPhone 14, 22/10/2026

Após o roteiro inicial de quatro etapas (navegação/tema, fonte máxima, áreas seguras
e uso com bundle carregado sem rede), o proprietário confirmou: “funcinou tudo.
com e sem wifi e 5g dark e light”. Registrar as quatro etapas como aprovadas pelo
relato no iPhone 14 com Expo Go: quatro abas, Claro/Escuro mantidos na navegação,
fonte máxima/barra rolável, conteúdo livre de sobreposição no topo e indicador
inferior nas abas, além de navegação com e sem Wi-Fi/dados móveis, sem recarregar.
Versões do iOS e Expo Go ainda não informadas; sem captura anexada nesta sessão.

Esse aceite não abrange mudança da aparência no SO em modo Sistema, VoiceOver,
links entregues pelo SO ou safe areas da recuperação, que não integravam esse
roteiro inicial. Android/TalkBack e aprovação visual completa continuam pendentes.
M1-T03 permanece in_progress. Nenhuma implementação alterada por esse relato.

### VoiceOver — iPhone 14, 22/10/2026

Após o roteiro de ativar VoiceOver, percorrer as quatro abas e opções de tema,
conferir nomes/seleção e ativar por toque duplo, o proprietário confirmou:
“deu certo o voiceOver”. Roteiro de VoiceOver aprovado pelo relato no iPhone 14
com Expo Go. Não foi fornecida transcrição dos anúncios, captura ou versão do iOS.
Esse resultado atualiza a pendência de VoiceOver do registro anterior; não inclui
a recuperação de links ainda não exercitada manualmente, nem TalkBack/Android.
M1-T03 continua in_progress, aguardando demais cenários e revisão nas duas plataformas.

### Link inexistente via QR — iPhone 14, 22/10/2026

Colar o endereço exp no navegador abriu uma pesquisa; isso não exercitou o Router.
Após escanear o QR de exp://192.168.50.148:8081/--/pagina-inexistente com a câmera,
o proprietário confirmou: “deu certo, nao encontramos essa pagina”. A entrega desse
link ao Expo Go e a mensagem de recuperação estão confirmadas no iPhone 14.
Retorno pelo botão Voltar para Hoje, caminhos aninhados sob Bíblia/Diário e áreas
seguras/acessibilidade da recuperação ainda sem confirmação específica.
Endereço de rede é somente a referência dessa execução, não configuração do app.

Em seguida, ao roteiro de acionar Voltar para Hoje e conferir mensagem/botão inteiros,
o proprietário respondeu “sim, retornou, deu certo”. Retorno para a aba Hoje aprovado
e revisão visual básica dessa recuperação confirmada pelo relato. Caminhos aninhados
sob Bíblia/Diário e VoiceOver na recuperação continuam pendentes; não inferir esses
resultados do teste da rota /pagina-inexistente.

Após escanear separadamente os QRs de /biblia/inexistente e /diario/inexistente,
o proprietário confirmou “sim, deu certo ambas” ao roteiro de verificar a mensagem
e retornar pelo botão Voltar para Hoje. Ambos os caminhos aninhados aprovados no
iPhone 14 via Expo Go. Não inclui VoiceOver na recuperação nem teste Android.

Após o roteiro adicional de abrir um QR com VoiceOver, ouvir a mensagem e ativar
Voltar para Hoje com toque duplo, o proprietário confirmou “voice over tbm deu certo”.
VoiceOver na recuperação e ativação do retorno aprovados por relato no iPhone 14.
Atualiza a pendência de acessibilidade da recuperação dos registros anteriores.
Android/TalkBack permanece sem teste; versão do iOS e revisão de Sistema nesta task
ainda pendentes. Nenhuma execução automatizada em aparelho foi declarada.

### Tema Sistema — iPhone 14, 22/10/2026

Após selecionar Sistema e alternar a aparência do iPhone entre claro e escuro,
o proprietário confirmou: “sim, o app acompanha a mudança de tema do sistema”.
Resposta do tema Sistema aprovada por relato, completando essa verificação em M1-T03.
Os testes orientados no iPhone até aqui foram aprovados; versões do iOS/Expo Go
ainda não informadas. Android/TalkBack e revisão visual Android aguardam o aparelho.
Não declarar M1/F01 ou M1-T03 concluídas sem evidências da outra plataforma.

### Plataforma informada e adiamento Android — 22/10/2026

O proprietário informou iOS 26.6.2 no iPhone 14 usado nos testes acima (versão
declarada pelo proprietário; versão do Expo Go não informada). Pediu que Android
seja testado quando o app estiver mais completo. Validação Android/TalkBack e
revisão visual Android ficam adiadas por essa decisão, sem prazo ou aprovação
presumidos. Não solicitar agora aparelho, instalação ou emulador para Android.
Os resultados positivos iOS permanecem registrados. M1-T03 continua in_progress;
adiamento não equivale a satisfazer os critérios nas duas plataformas. Alterar a
sequência das próximas tasks, se necessário, exige atualizar seu planejamento e
dependências explicitamente, sem marcar Android como validado.

Checklist .agents/workflows/review.md conferido: escopo/dependência, diff anterior
preservado, fontes oficiais consultadas, sem corpus/segredos/dados privados, sem
backend ou persistência antecipada. Instalação de runner e sintaxe não são evidência
de aprovação nativa. Preferência por aparelhos físicos registrada em ADR-0012;
alteração documental, sem repetir exports já aprovados porque código/configuração/
dependências não mudaram. M1-T03 permanece in_progress; M1/F01 e M2 não encerradas/iniciadas.
