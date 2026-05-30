import "./game-panel.css";
import { useState, useEffect, useRef } from "react";

import { InfoPanel, Timer, TabuleiroInicial, TabuleiroJogo, ModalOver } from "../../components/";
import { COMBUSTIVEL_INICIAL, TEMPO_TURNO } from "../../constants";
import { ObterFrotaPreDefinida, GerarFrotaAleatoria } from "../../helpers/PcFleet";

function GamePanel({ jogador }) {
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [vencedor, setVencedor] = useState(null);
  const [jogadas, setJogadas] = useState(0);

  const [tabuleiroSetup, setTabuleiroSetup] = useState(null);
  const [erroSetup, setErroSetup] = useState(false);
  const [nivelBot, setNivelBot] = useState("basico");
  const [frotaBot, setFrotaBot] = useState("aleatoria");

  const [grelhaJogador, setGrelhaJogador] = useState(null);
  const [grelhaPC, setGrelhaPC] = useState(null);
  const [debugMode, setDebugMode] = useState(false);

  const [turnoJogador, setTurnoJogador] = useState(true);
  const [combustivel, setCombustivel] = useState(COMBUSTIVEL_INICIAL);
  const [radarDisponivel, setRadarDisponivel] = useState(false);
  const [radarAtivo, setRadarAtivo] = useState(false);

  const inicioTurnoRef = useRef(Date.now());
  const ultimoAcertoPC = useRef(null);

  const handleStartGame = () => {
    if (!tabuleiroSetup || !tabuleiroSetup.valido) {
      setErroSetup(true);
      return;
    }

    setErroSetup(false);
    setGrelhaJogador(tabuleiroSetup.grelha);

    let PcData;
    if (frotaBot === "aleatoria") {
      PcData = GerarFrotaAleatoria();
    } else {
      PcData = ObterFrotaPreDefinida(parseInt(frotaBot));
    }
    setGrelhaPC(PcData.grelha);

    setCombustivel(COMBUSTIVEL_INICIAL);
    setStart(true);
    setGameOver(false);
    setVencedor(null);
    setJogadas(0);
    setTurnoJogador(true);
    setRadarDisponivel(false);
    setRadarAtivo(false);
    inicioTurnoRef.current = Date.now();
  };

  const handleRestart = () => {
    setStart(false);
    setGameOver(false);
    setTabuleiroSetup(null);
    setGrelhaJogador(null);
    setGrelhaPC(null);
    setCombustivel(COMBUSTIVEL_INICIAL);
  };

  useEffect(() => {
    if (!start || gameOver) return;

    if (combustivel <= 0) {
      terminarJogo("Computador");
      return;
    }

    const FrotaPCDestruida = verificarFrotaDestruida(grelhaPC);
    if (FrotaPCDestruida) {
      terminarJogo(jogador);
      return;
    }

    const FrotaJogadorDestruida = verificarFrotaDestruida(grelhaJogador);
    if (FrotaJogadorDestruida) {
      terminarJogo("Computador");
      return;
    }

  }, [combustivel, grelhaPC, grelhaJogador, start, gameOver]);

  const verificarFrotaDestruida = (GrelhaVerificar) => {
    if (!GrelhaVerificar) return false;
    for (let LinhaAtual = 0; LinhaAtual < GrelhaVerificar.length; LinhaAtual++) {
      for (let ColunaAtual = 0; ColunaAtual < GrelhaVerificar[LinhaAtual].length; ColunaAtual++) {
        if (GrelhaVerificar[LinhaAtual][ColunaAtual].hasShip !== null && GrelhaVerificar[LinhaAtual][ColunaAtual].state !== "destroyed") {
          return false;
        }
      }
    }
    return true;
  };

  const terminarJogo = (VencedorNome) => {
    setGameOver(true);
    setVencedor(VencedorNome);
  };

  useEffect(() => {
    if (start && !gameOver) {
      inicioTurnoRef.current = Date.now();
      if (!turnoJogador) {
        setTimeout(jogadaPC, 1000);
      }
    }
  }, [turnoJogador]);

  const penalizarTempo = () => {
    setCombustivel(prev => prev - 5);
    setTurnoJogador(false);
  };

  const atualizarBarcoDestruido = (GrelhaAtual, NavioId) => {
    let Destruido = true;
    for (let LinhaAtual = 0; LinhaAtual < GrelhaAtual.length; LinhaAtual++) {
      for (let ColunaAtual = 0; ColunaAtual < GrelhaAtual[LinhaAtual].length; ColunaAtual++) {
        if (GrelhaAtual[LinhaAtual][ColunaAtual].hasShip === NavioId && GrelhaAtual[LinhaAtual][ColunaAtual].state !== "hit") {
          Destruido = false;
        }
      }
    }

    if (Destruido) {
      const NovaGrelha = GrelhaAtual.map(row => [...row]);
      for (let LinhaAtual = 0; LinhaAtual < NovaGrelha.length; LinhaAtual++) {
        for (let ColunaAtual = 0; ColunaAtual < NovaGrelha[LinhaAtual].length; ColunaAtual++) {
          if (NovaGrelha[LinhaAtual][ColunaAtual].hasShip === NavioId) {
            NovaGrelha[LinhaAtual][ColunaAtual] = { ...NovaGrelha[LinhaAtual][ColunaAtual], state: "destroyed" };
          }
        }
      }
      return NovaGrelha;
    }
    return GrelhaAtual;
  };

  const ataqueJogador = (LinhaClicada, ColunaClicada) => {
    if (!turnoJogador || gameOver) return;

    const CelulaAlvo = grelhaPC[LinhaClicada][ColunaClicada];
    if (CelulaAlvo.state !== "unexplored" && CelulaAlvo.state !== "radar") return;

    let NovoCombustivel = combustivel - 5;
    const TempoDecorrido = (Date.now() - inicioTurnoRef.current) / 1000;

    let NovaGrelhaPC = grelhaPC.map(row => [...row]);

    if (CelulaAlvo.hasShip !== null) {
      NovaGrelhaPC[LinhaClicada][ColunaClicada] = { ...CelulaAlvo, state: "hit" };
      NovoCombustivel = Math.min(100, NovoCombustivel + 15);

      if (TempoDecorrido < 3) {
        setRadarDisponivel(true);
      }

      NovaGrelhaPC = atualizarBarcoDestruido(NovaGrelhaPC, CelulaAlvo.hasShip);
    } else {
      NovaGrelhaPC[LinhaClicada][ColunaClicada] = { ...CelulaAlvo, state: "miss" };
    }

    setGrelhaPC(NovaGrelhaPC);
    setCombustivel(NovoCombustivel);
    setJogadas(prev => prev + 1);
    setTurnoJogador(false);
  };


  const jogadaPC = () => {
    if (gameOver) return;

    let LinhaAlvo, ColunaAlvo;
    let JogadaValida = false;

    if (nivelBot === "basico") {
      while (!JogadaValida) {
        LinhaAlvo = Math.floor(Math.random() * 10);
        ColunaAlvo = Math.floor(Math.random() * 10);
        if (grelhaJogador[LinhaAlvo][ColunaAlvo].state === "unexplored") {
          JogadaValida = true;
        }
      }
    } else {
      let celulasHit = [];
      for (let l = 0; l < 10; l++) {
        for (let c = 0; c < 10; c++) {
          if (grelhaJogador[l][c].state === "hit") {
            celulasHit.push({ l, c });
          }
        }
      }

      const VizinhosOffset = [
        { DeltaLinha: -1, DeltaColuna: 0 }, { DeltaLinha: 1, DeltaColuna: 0 }, { DeltaLinha: 0, DeltaColuna: -1 }, { DeltaLinha: 0, DeltaColuna: 1 }
      ];

      let EncontrouVizinho = false;

      for (let alvo of celulasHit) {
        for (let Vizinho of VizinhosOffset) {
          const NovaLinha = alvo.l + Vizinho.DeltaLinha;
          const NovaColuna = alvo.c + Vizinho.DeltaColuna;
          if (NovaLinha >= 0 && NovaLinha < 10 && NovaColuna >= 0 && NovaColuna < 10) {
            if (grelhaJogador[NovaLinha][NovaColuna].state === "unexplored") {
              LinhaAlvo = NovaLinha;
              ColunaAlvo = NovaColuna;
              JogadaValida = true;
              EncontrouVizinho = true;
              break;
            }
          }
        }
        if (EncontrouVizinho) break;
      }

      if (!EncontrouVizinho) {
        while (!JogadaValida) {
          LinhaAlvo = Math.floor(Math.random() * 10);
          ColunaAlvo = Math.floor(Math.random() * 10);
          if (grelhaJogador[LinhaAlvo][ColunaAlvo].state === "unexplored") {
            JogadaValida = true;
          }
        }
      }
    }

    let NovaGrelhaJogador = grelhaJogador.map(row => [...row]);
    const CelulaAlvoPC = NovaGrelhaJogador[LinhaAlvo][ColunaAlvo];

    if (CelulaAlvoPC.hasShip !== null) {
      NovaGrelhaJogador[LinhaAlvo][ColunaAlvo] = { ...CelulaAlvoPC, state: "hit" };

      NovaGrelhaJogador = atualizarBarcoDestruido(NovaGrelhaJogador, CelulaAlvoPC.hasShip);

    } else {
      NovaGrelhaJogador[LinhaAlvo][ColunaAlvo] = { ...CelulaAlvoPC, state: "miss" };
    }

    setGrelhaJogador(NovaGrelhaJogador);
    setTurnoJogador(true);
  };

  const ativarRadar = () => {
    if (radarDisponivel) {
      let RadarEncontrado = false;
      let NovaGrelhaPC = grelhaPC.map(row => [...row]);

      for (let LinhaAtual = 0; LinhaAtual < 9 && !RadarEncontrado; LinhaAtual++) {
        for (let ColunaAtual = 0; ColunaAtual < 9 && !RadarEncontrado; ColunaAtual++) {
          const CelulasArea = [
            NovaGrelhaPC[LinhaAtual][ColunaAtual], NovaGrelhaPC[LinhaAtual][ColunaAtual + 1],
            NovaGrelhaPC[LinhaAtual + 1][ColunaAtual], NovaGrelhaPC[LinhaAtual + 1][ColunaAtual + 1]
          ];

          const TemNavioEscondido = CelulasArea.some(cel => cel.hasShip !== null && cel.state === "unexplored");

          if (TemNavioEscondido) {
            if (NovaGrelhaPC[LinhaAtual][ColunaAtual].state === "unexplored") NovaGrelhaPC[LinhaAtual][ColunaAtual] = { ...NovaGrelhaPC[LinhaAtual][ColunaAtual], state: "radar" };
            if (NovaGrelhaPC[LinhaAtual][ColunaAtual + 1].state === "unexplored") NovaGrelhaPC[LinhaAtual][ColunaAtual + 1] = { ...NovaGrelhaPC[LinhaAtual][ColunaAtual + 1], state: "radar" };
            if (NovaGrelhaPC[LinhaAtual + 1][ColunaAtual].state === "unexplored") NovaGrelhaPC[LinhaAtual + 1][ColunaAtual] = { ...NovaGrelhaPC[LinhaAtual + 1][ColunaAtual], state: "radar" };
            if (NovaGrelhaPC[LinhaAtual + 1][ColunaAtual + 1].state === "unexplored") NovaGrelhaPC[LinhaAtual + 1][ColunaAtual + 1] = { ...NovaGrelhaPC[LinhaAtual + 1][ColunaAtual + 1], state: "radar" };
            RadarEncontrado = true;
          }
        }
      }
      setGrelhaPC(NovaGrelhaPC);
      setRadarDisponivel(false);
    }
  };

  return (
    <section className="game-panel">
      <div className="game-panel-topo">
        <InfoPanel
          jogador={jogador}
          combustivel={combustivel}
          radar={radarDisponivel}
          radarAtivo={radarAtivo}
          onRadar={ativarRadar}
        />

        <Timer
          turnoJogador={turnoJogador}
          setTurnoJogador={setTurnoJogador}
          jogoAtivo={start && !gameOver}
          onTimeout={penalizarTempo}
        />

        <div className="game-panel-acoes">
          <div className="acoes">
            {!start && (
              <>
                <select id="frota-bot" value={frotaBot} onChange={(e) => setFrotaBot(e.target.value)}>
                  <option value="aleatoria">Frota PC Aleatória</option>
                  <option value="1">Frota PC 1</option>
                  <option value="2">Frota PC 2</option>
                  <option value="3">Frota PC 3</option>
                </select>
                <select id="nivel-bot" value={nivelBot} onChange={(e) => setNivelBot(e.target.value)}>
                  <option value="basico">Nível Básico</option>
                  <option value="avancado">Nível Avançado</option>
                </select>
              </>
            )}

            {start && (
              <div className="debug-box">
                <label>
                  <input type="checkbox" checked={debugMode} onChange={(e) => setDebugMode(e.target.checked)} />
                  Modo Debug (Ver frota do PC)
                </label>
              </div>
            )}

            {!start && (
              <button id="btn-inicio" onClick={handleStartGame}>
                Iniciar Jogo
              </button>
            )}
          </div>
          {erroSetup && <p id="erro-nome">Valida o teu tabuleiro de jogo primeiro</p>}
        </div>
      </div>

      <hr className="divisor" />

      <div id="game" className="game">
        {!start ? (
          <TabuleiroInicial
            setTabuleiroValido={setTabuleiroSetup}
          />
        ) : (
          <TabuleiroJogo
            grelhaJogador={grelhaJogador}
            grelhaPC={grelhaPC}
            ataqueJogador={ataqueJogador}
            turnoJogador={turnoJogador}
            debugMode={debugMode}
          />
        )}
      </div>

      <ModalOver
        show={gameOver}
        score={jogadas}
        vencedor={vencedor}
        onRestart={handleRestart}
      />
    </section>
  );
}

export default GamePanel;