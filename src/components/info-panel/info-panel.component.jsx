import "./info-panel.css";

function InfoPanel({ jogador, combustivel, radar, radarAtivo, onRadar }) {

  let ClasseCombustivel = "";
  if (combustivel <= 20) {
    ClasseCombustivel = "combustivel-critico";
  } else if (combustivel <= 50) {
    ClasseCombustivel = "combustivel-baixo";
  }

  return (
    <div id="panel-control">
      <div className="painel-grupo">
        <div className="linha-info">
          <div className="info-bloco">
            <span className="info-label">Nome</span>
            <span className="info-valor">{jogador}</span>
          </div>

          <div className="info-bloco">
            <span className="info-label">Combustível</span>
            <span className={`info-valor ${ClasseCombustivel}`}>{combustivel}L</span>
          </div>

          <div className="info-bloco">
            <span className="info-label">Radar</span>

            <button
              className={`radar-badge ${radarAtivo ? "ativo" : radar ? "disponivel" : "indisponivel"}`}
              onClick={onRadar}
              disabled={!radar}
            >
              {radarAtivo ? "Ativado — Clica no tabuleiro" : radar ? "Disponível" : "Indisponível"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;