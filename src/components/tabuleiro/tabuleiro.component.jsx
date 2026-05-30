import { Celula } from "../../components/";
import "./tabuleiro.css";

function Tabuleiro({ grelha, handleClique, frotaCompleta = false, isPC = false, debugMode = false, turnoJogador = true }) {
    const Bloqueada = frotaCompleta || (isPC && !turnoJogador);

    return (
        <div className={`ti-grelha ${Bloqueada ? "bloqueada" : ""}`}>
            {
                grelha && grelha.map((linha, LinhaIndex) =>
                    linha.map((celula, ColunaIndex) => (
                        <Celula
                            key={`${LinhaIndex}-${ColunaIndex}`}
                            celula={celula}
                            linha={LinhaIndex}
                            coluna={ColunaIndex}
                            handleClique={handleClique}
                            isPC={isPC}
                            debugMode={debugMode}
                        />
                    ))
                )
            }
        </div>
    );
}

export default Tabuleiro;