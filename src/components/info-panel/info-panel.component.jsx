import "./info-panel.css";

function InfoPanel({ jogador, combustivel, radar, onRadar }) {
  return (
    <div id="panel-control">
      {/* Jogador */}
      <div className="painel-grupo">
        <div className="linha-info">
          <div className="info-bloco">
            <span className="info-label">Nome</span>
            <span className="info-valor">{jogador}</span>
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
      </div>
    </div>
  );
}

export default InfoPanel;