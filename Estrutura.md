# Estrutura do Projeto e Fluxo de Dados

Este documento mapeia todos os ficheiros, as variáveis principais de estado (`useState`) e as funções críticas que ditam o que é mostrado ao utilizador.

---

## Ficheiros Principais

### `App.jsx`
É o componente "Pai" de todos os outros. Controla o ecrã inicial vs o ecrã de jogo.

**Variáveis:**
- `jogador`: Começa como `null` (por defeito). Guarda o nome do jogador.

**Lógica Visível:** 
- Se `jogador` for `null`, apresenta o `PanelInicial`. Se tiver um texto (o nome), apresenta o `GamePanel`.

**Funções:**
- `handleStart(nome)`: Recebe o nome escrito pelo utilizador e guarda-o na variável `jogador`.

---

## Componentes

### `PanelInicial` (`panel-inicial.component.jsx`)
O ecrã de registo.

**Variáveis:**
- `nome`: Texto que o utilizador está a escrever no input.
- `erro`: `true/false`. Impede o utilizador de avançar com o nome em branco.

**Lógica Visível:**
- Apresenta a caixa de texto e o botão Jogar. Se `erro` for `true`, mostra mensagem a vermelho.

**Funções:**
- `handleSubmit()`: Verifica se o `nome` não está vazio e envia-o para o `App.jsx` definir o `jogador`.

---

### `GamePanel` (`game-panel.component.jsx`)
O núcleo do jogo. Controla todas as regras, turnos e lógica de vitória.

**Variáveis de Ecrã:**
- `start`: Começa a `false`. Quando `false`, mostra o ecrã de meter barcos (`TabuleiroInicial`). Quando `true`, o combate começa e mostra as duas grelhas de batalha (`TabuleiroJogo`).
- `gameOver`: Começa a `false`. Se passar a `true`, faz aparecer o ecrã de fim de jogo (`ModalOver`).

**Variáveis de Jogo:**
- `tabuleiroSetup`: Guarda a posição final dos barcos escolhidos pelo jogador.
- `grelhaJogador` / `grelhaPC`: As matrizes (linhas e colunas) onde o combate acontece. Guardam o estado de cada quadrado (água, barco, atingido, falhado).
- `turnoJogador`: Boolean `true/false`. Decide de quem é a vez de jogar e impede o utilizador de clicar na grelha no turno do PC.
- `combustivel`: Começa em 100. Desce a cada tiro e a cada penalização de tempo. Sobe 15 quando se acerta num navio. Se chegar a 0, despoleta o Game Over.

**Funções Principais:**
- `handleStartGame()`: Transforma `start` em `true`. Gera a grelha aleatória do PC e arranca o jogo.
- `ataqueJogador(linha, coluna)`: Ocorre quando clicas no tabuleiro inimigo. Tira-te 5 de combustível. Verifica a `grelhaPC` para ver se tinha barco: pinta "Acerto" ou "Falha". Troca o `turnoJogador` para `false`.
- `jogadaPC()`: Dispara automaticamente no turno do computador. Se o nível do bot for Básico, atira ao calhas. Se for Avançado, procura navios atingidos e tenta disparar nos quadrados à volta.

---

### `TabuleiroInicial` (`tabuleiro-inicial.component.jsx`)
Painel onde colocas os barcos antes da batalha.

**Variáveis:**
- `grelha`: A grelha temporária que estás a preencher durante o setup.
- `colocados`: Lista de IDs dos barcos que já inseriste no mapa.
- `frotaCompleta`: Um cálculo. É `true` apenas quando a quantidade de navios colocados é igual à lista total de navios.

**Lógica Visível:** 
- O botão "Validar Tabuleiro" só se ativa quando `frotaCompleta` é `true`.

**Funções:**
- `podeColocar()`: Matemática que impede que coloques um barco fora da grelha ou em cima de outro.
- `verificarTabuleiro()`: Pega em tudo e passa os dados definitivos para o `GamePanel`.

---

### `Timer` (`timer.component.jsx`)
O relógio que dita o tempo de cada turno.

**Variáveis:**
- `tempo`: Começa em 15. Desce 1 a cada segundo.

**Lógica Principal:** 
- Tem um `useEffect` sempre a vigiar o `tempo`. Quando `tempo === 0`, chama o método `penalizarTempo` do `GamePanel`, tirando 5 de combustível ao utilizador e passando a vez ao Computador.

---

### `InfoPanel` (`info-panel.component.jsx`)
A faixa no topo do jogo. Não tem estados nem funções de lógica matemática próprias. Serve apenas como mostrador.

**Lógica Visível:** 
- Mostra o nome do jogador, o nível do combustível (que fica vermelho a piscar se for <= 20) e o botão para ativar o radar.

---

### `ModalOver` (`modal-game-over.component.jsx`)
A caixa de "Game Over".

**Lógica Visível:** 
- Só é mostrada porque recebe a variável de fora `show`.
- Apresenta o nome do vencedor e quantas jogadas foram feitas. Tem um botão `onRestart` que limpa tudo e devolve o jogo ao modo de colocação de barcos (`start = false`).
