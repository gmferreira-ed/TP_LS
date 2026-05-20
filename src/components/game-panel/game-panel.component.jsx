import "./game-panel.css";
import { useState } from "react";

import { InfoPanel, Timer, TabuleiroInicial, TabuleiroJogo } from "../../components/";

function GamePanel({ jogador }) {

  const [start, setStart] = useState(false);
  const [tabuleiroValido, setTabuleiroValido] = useState(false);
  const [erro, setErro] = useState(false);

  //true  -> jogador  |  false -> máquina
  const [turnoJogador, setTurnoJogador] = useState(true);

  const mudaStart = () =>{
    if(start){
      setStart(false)
      setTabuleiroValido(false);
    }
    else{
      if (tabuleiroValido === true) {
        setStart(true);
        setErro(false);
      }
      else
        setErro(true);
    }
  }

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
              <option value="intermedio">Intermédio</option>
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
            setTabuleiroValido={setTabuleiroValido} 
          />) 
          : 
          (<TabuleiroJogo />  )
        }

      </div>

    </section>
  );
}

export default GamePanel;