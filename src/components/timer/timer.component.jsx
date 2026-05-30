import { useState, useEffect } from "react";
import "./timer.css";

function Timer({ setTurnoJogador, turnoJogador, jogoAtivo, onTimeout }) {

  const [tempo, setTempo] = useState(15);
  
  useEffect(() => {
    if (tempo === 0 && jogoAtivo) {
      if (turnoJogador === true) {
        if (onTimeout) onTimeout();
      } else {
        setTurnoJogador(true);
      }
    }
  }, [tempo, jogoAtivo, turnoJogador, onTimeout, setTurnoJogador]);

  useEffect(() => {
    setTempo(15);

    if (!jogoAtivo) return;

    const interval = setInterval(() => {
      setTempo((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [turnoJogador, jogoAtivo]);

  return (
    <div className="painel-grupo">

      <div className="turno-indicador">
        <span className={`turno-label ${turnoJogador ? "turno-ativo" : ""}`}>
          Jogador
        </span>
        <span className={`turno-label ${!turnoJogador ? "turno-ativo" : ""}`}>
          Máquina
        </span>
      </div>

      <div className="linha-info">

        <div className="info-bloco">
          <span className="info-label">Tempo Jogador</span>

          <span className={`info-valor ${turnoJogador === true && tempo <= 5 ? "alerta" : ""}`} >
            {turnoJogador ? `${tempo}s` : "--"}
          </span>
        </div>

        <div className="info-bloco">
          <span className="info-label">Tempo Máquina</span>

          <span className={`info-valor ${turnoJogador === false && tempo <= 5 ? "alerta" : ""}`} >
            {turnoJogador === false ? `${tempo}s` : "--"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Timer;