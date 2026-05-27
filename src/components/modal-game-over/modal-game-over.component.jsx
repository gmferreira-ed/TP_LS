import "./modal-game-over.css";

function ModalOver({show , score, setGameOver}) {

  if (show === false) return null;

  const closeModal = () => {
    setGameOver(false);
  };

  return (
     <div className="modal-overlay">
      <div className="modal-box">
        <h1 className="modal-title">Game Over</h1>
        <p className="modal-score">
          Pontuação: <strong>{score}</strong>
        </p>
        <button className="modal-btn-menu" onClick={closeModal}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default ModalOver;