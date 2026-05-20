import { useState, useEffect } from "react";
import "./timer.css";

function Timer({ setTurnoJogador, turnoJogador, jogoAtivo }) {

  const [tempo, setTempo] = useState(15);
  
  //esxecuta oq está dentro dele sempre que cada uma das variaveis mudar 
  useEffect(() => {
    setTempo(15); // reseta sempre que jogoAtivo muda

    if (!jogoAtivo) return; // se for false ent n começa/cria o timer

    //cria um loop a cada 1 segundo
    const interval = setInterval(() => {
      
      //valor anterior do tempo atual
      setTempo((prev) => {

        if (prev <= 1) {

          // quando chegar a 0 muda de jogador para a máquina ouseja de true para false
          if (turnoJogador === true)
            setTurnoJogador(false);
          else
            setTurnoJogador(true);
          
          //reseta o tempo
          return 15;
        }

        //se não decrementa 1
        return prev - 1;
      });

    }, 1000); //1000 é 1 segundo


    //Impede múltiplos timers ao mesmo tempo
    // Sem isto, criavam-se vários intervals, o tempo acelerava sozinho
    return () => clearInterval(interval);

  }, [turnoJogador, setTurnoJogador, jogoAtivo]);

  return (
    <div className="painel-grupo">

      <div className="linha-info">

        <div className="info-bloco">
          <span className="info-label">Jogador</span>

          <span className={`info-valor ${turnoJogador === true && tempo <= 5 ? "alerta" : ""}`} >
            {turnoJogador ? `${tempo}s` : "--"}
          </span>
        </div>

        <div className="info-bloco">
          <span className="info-label">Máquina</span>

          <span className={`info-valor ${turnoJogador === false && tempo <= 5 ? "alerta" : ""}`} >
            {turnoJogador === false ? `${tempo}s` : "--"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Timer;