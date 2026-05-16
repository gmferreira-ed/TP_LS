import "./info-panel.css";

function InfoPanel({ jogador, combustivel, radar, tempoTurno, onRadar }) {

  return (
    <div id="panel-control">
      <div className="info-bloco">
        <span className="info-label">Jogador</span>
        <span className="info-valor">{jogador}</span>
      </div>
      <div className="info-bloco">
        <span className="info-label">Cronómetro</span>
        <span className={`info-valor ${tempoTurno <= 5 ? "alerta" : ""}`}>
          {tempoTurno}s
        </span>
      </div>
      <div className="info-bloco">
        <span className="info-label">Combustível</span>
        <span className="info-valor">{combustivel}L</span>
      </div>
      <div className="info-bloco">
        <span className="info-label">Radar</span>
        <button
          className={`radar-badge ${radar ? "disponivel" : "indisponivel"}`}
          onClick={onRadar}
          disabled={!radar}
        >
          {radar ? "Disponível" : "Indisponível"}
        </button>
      </div>
    </div>
  );
}

export default InfoPanel;