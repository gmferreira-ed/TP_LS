import "./game-panel.css";
import { InfoPanel } from "../../components/";

function GamePanel({ jogador }) {
  return (
    <section className="game-panel">

      <div className="game-panel-topo">
        <InfoPanel
          jogador={jogador}
          combustivel={100}
          radar={true}
          tempoTurno={15}
        />

        <div className="game-panel-acoes">
          <select id="nivel-bot">
            <option value="basico">Básico</option>
            <option value="intermedio">Intermédio</option>
            <option value="avancado">Avançado</option>
          </select>
          <button id="btn-inicio">Iniciar Jogo</button>
        </div>
      </div>

      <hr className="divisor" />

      <div id="game">
        <p>- Primeiro Tabuleiro de Posições</p><br></br>
        <p>- Segundo Tabuleiro OU Tabuleiros de JOGO</p>
      </div>

    </section>
  );
}

export default GamePanel;