import "./modal-game-over.css";

function ModalOver({show, score, vencedor, onRestart}) {

  if (!show) return null;

  return (
     <div className="modal-overlay">
      <div className="modal-box">
        <h1 className="modal-title">Fim do Jogo</h1>
        <p className="modal-score">
          Vencedor: <strong>{vencedor}</strong>
        </p>
        <p className="modal-score">
          Jogadas efetuadas: <strong>{score}</strong>
        </p>
        <button className="modal-btn-menu" onClick={onRestart}>
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}

export default ModalOver;