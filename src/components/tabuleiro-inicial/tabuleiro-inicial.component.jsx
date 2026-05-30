import { useState } from "react";
import "./tabuleiro-inicial.css";
import { Tabuleiro } from "../../components/";
import { FROTA, TAMANHO_TABULEIRO } from "../../constants";

function criarGrelhaVazia() {
    return Array(TAMANHO_TABULEIRO).fill(null).map(() => 
        Array(TAMANHO_TABULEIRO).fill(null).map(() => ({ hasShip: null, state: "unexplored" }))
    );
}

function TabuleiroInicial({ setTabuleiroValido }) {

    const [grelha, setGrelha] = useState(criarGrelhaVazia());
    const [orientacao, setOrientacao] = useState("H");

    const [barcoAtual, setBarcoAtual] = useState(0);

    const [colocados, setColocados] = useState([]);
    const [coordenadasBarcos, setCoordenadasBarcos] = useState([]);
    const [tabuleiroValidado, setTabuleiroValidado] = useState(false);

    const frotaCompleta = colocados.length === FROTA.length;

    const barco = FROTA[barcoAtual];

    const podeColocar = (linha, col, tamanho, orient) => {
        
        if (orient === "H" && col + tamanho > TAMANHO_TABULEIRO) return false;
        if (orient === "V" && linha + tamanho > TAMANHO_TABULEIRO) return false;

        for (let i = 0; i < tamanho; i++) {

            const LinhaAtual = orient === "V" ? linha + i : linha;
            const ColunaAtual = orient === "H" ? col + i : col;

            if (grelha[LinhaAtual][ColunaAtual].hasShip !== null) return false;
        }
        return true;
    };

    const handleClique = (linha, col) => {
        if (frotaCompleta) return;
        if (!podeColocar(linha, col, barco.tamanho, orientacao)) return;

        const novaGrelha = grelha.map(r => [...r]);
        const celulasDoBarco = [];

        for (let i = 0; i < barco.tamanho; i++) {

            const LinhaAtual = orientacao === "V" ? linha + i : linha;
            const ColunaAtual = orientacao === "H" ? col + i : col;

            novaGrelha[LinhaAtual][ColunaAtual] = { ...novaGrelha[LinhaAtual][ColunaAtual], hasShip: barco.id };
            celulasDoBarco.push({ l: LinhaAtual, c: ColunaAtual });
        }

        setGrelha(novaGrelha);
        setColocados([...colocados, barco.id]);
        setCoordenadasBarcos([...coordenadasBarcos, { id: barco.id, celulas: celulasDoBarco }]);
        setBarcoAtual(barcoAtual + 1);
    };
    
    const resetar = () => {
        setGrelha(criarGrelhaVazia());
        setBarcoAtual(0);
        setColocados([]);
        setCoordenadasBarcos([]);
        setTabuleiroValido(false);
        setTabuleiroValidado(false);
    };

    const verificarTabuleiro = () => {
        setTabuleiroValido({ valido: true, coordenadas: coordenadasBarcos, grelha });
        setTabuleiroValidado(true);
    };

    return (
        <div className="ti-wrapper">

            <div className="ti-controlos">
                <button
                    className={`btn-orientacao ${orientacao === "H" ? "ativo" : ""}`}
                    onClick={() => setOrientacao("H")}
                >
                    Horizontal
                </button>
                <button
                    className={`btn-orientacao ${orientacao === "V" ? "ativo" : ""}`}
                    onClick={() => setOrientacao("V")}
                >
                    Vertical
                </button>
                <button onClick={resetar}>Resetar</button>
            </div>

            <p className="ti-barco-info">
                {frotaCompleta ? "Frota completa! Podes validar." : `A colocar: ${barco.nome} (tamanho ${barco.tamanho})`}
            </p>

            <div className="ti-frota-lista">
                {
                    FROTA.map((barco, indice) => (
                        <span
                            key={barco.id}
                            className={`ti-frota-item
                                ${colocados.includes(barco.id) ? "colocado" : ""}
                                ${indice === barcoAtual ? "atual" : ""}
                            `}
                        >
                            {barco.nome} ({barco.tamanho})
                        </span>
                    ))
                }
            </div>

            <Tabuleiro
                grelha={grelha}
                handleClique={handleClique}
                frotaCompleta={frotaCompleta}
            />

            <button
                className="btn-validar"
                onClick={verificarTabuleiro}
                disabled={!frotaCompleta || tabuleiroValidado}
            >
                {tabuleiroValidado ? "Tabuleiro Validado" : "Validar Tabuleiro"}
            </button>

        </div>
    );
}

export default TabuleiroInicial;