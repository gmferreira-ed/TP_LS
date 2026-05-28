import "./game-panel.css";
import { useState } from "react";

import { InfoPanel, Timer, TabuleiroInicial, TabuleiroJogo , ModalOver} from "../../components/";

function GamePanel({ jogador }) {

  //Variavel para o Game start ou não
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [tabuleiroValido, setTabuleiroValido] = useState(false);
  const [erro, setErro] = useState(false);

  //true  -> jogador  |  false -> máquina
  const [turnoJogador, setTurnoJogador] = useState(true);

  const [score, setScore] = useState(0);


  //================= FUNÇÕES =================

  const mudaStart = () =>{
    if(start){
      setStart(false)
      setTabuleiroValido(false);
      setGameOver(true);
    }
    else{
      if (tabuleiroValido) {
        setStart(true);
        setErro(false);
        setGameOver(false);
      }
      else
        setErro(true);
    }
  }

  //=============================================

  return (
    <section className="game-panel">

      <div className="game-panel-topo">
        <InfoPanel
          jogador={jogador}
          combustivel={100}
          radar={start}
        />

        <Timer 
          turnoJogador = {turnoJogador}
          setTurnoJogador={setTurnoJogador} 
          jogoAtivo={start}
        />

        <div className="game-panel-acoes">
          <div className="acoes">
            <select id="nivel-bot" disabled={start}>
              <option value="basico">Básico</option>
              <option value="avancado">Avançado</option>
            </select>
            <button id="btn-inicio" onClick={mudaStart}>
              {start ? "Para jogo" : "Inicar Jogo"}
            </button>
          </div>
          {erro && <p id="erro-nome">Introduz os teus barcos primeiro</p>}
        </div>
      </div>

      <hr className="divisor" />

      <div id="game" className="game">
        <p>- Primeiro Tabuleiro de Posições</p><br></br>
        <p>- Segundo TabuleirOS de JOGO</p><br /><br />

        { start === false ? 
          (<TabuleiroInicial 
            setTabuleiroValido={setTabuleiroValido} jogoIniciou={start}
          />) 
          : 
          (<TabuleiroJogo jogoIniciou={start}/>  )
        }

      </div>

      <ModalOver
        show={gameOver}
        setGameOver = {setGameOver}
        score={score}
      />

    </section>
  );
}

export default GamePanel;