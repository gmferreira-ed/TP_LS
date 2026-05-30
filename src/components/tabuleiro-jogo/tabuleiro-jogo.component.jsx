import "./tabuleiro-jogo.css";
import { Tabuleiro } from "../../components/";

function TabuleiroJogo({ grelhaJogador, grelhaPC, ataqueJogador, turnoJogador, debugMode }) {
    return(
        <div className="tj-container">
            <div className="tj-painel">
                <p>O Teu Tabuleiro</p>
                <Tabuleiro 
                    grelha={grelhaJogador} 
                    handleClique={() => {}}
                    isPC={false}
                />
            </div>

            <div className="tj-painel">
                <p>Tabuleiro do Computador</p>
                <Tabuleiro 
                    grelha={grelhaPC} 
                    handleClique={ataqueJogador}
                    isPC={true}
                    debugMode={debugMode}
                    turnoJogador={turnoJogador}
                />
            </div>
        </div>
    );
}

export default TabuleiroJogo;
