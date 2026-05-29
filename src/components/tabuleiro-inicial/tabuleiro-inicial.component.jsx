import { useState } from "react";
import "./tabuleiro-inicial.css";
import { Tabuleiro } from "../../components/";
;

// Barcos obrigatórios pelo enunciado
const FROTA = [
    { id: 1, tamanho: 5, nome: "Porta-Aviões" },
    { id: 2, tamanho: 4, nome: "Navio-Tanque" },
    { id: 3, tamanho: 3, nome: "Destroyer A" },
    { id: 4, tamanho: 2, nome: "Destroyer B" },
];

const TAMANHO = 10;

// Cria uma matriz 10x10 preenchida com null (célula vazia)
function criarGrelhaVazia() {
    return Array(TAMANHO).fill(null).map(() => Array(TAMANHO).fill(null));
}

function TabuleiroInicial({ setTabuleiroValido }) {

    // Matriz 10x10 — null = vazio, número = id do barco
    const [grelha, setGrelha] = useState(criarGrelhaVazia());
    const [orientacao, setOrientacao] = useState("H");

    // Índice do barco atual em FROTA
    const [barcoAtual, setBarcoAtual] = useState(0);

    // IDs dos barcos já colocados
    const [colocados, setColocados] = useState([]);
    const [coordenadasBarcos, setCoordenadasBarcos] = useState([]);// Coordenadas de cada barco: { id, celulas: [{l, c}, ...] }

    // true quando todos os barcos estão colocados e bloqueia a grelha
    const frotaCompleta = colocados.length === FROTA.length;

    // Barco a ser colocado agora
    const barco = FROTA[barcoAtual];

    const podeColocar = (linha, col, tamanho, orient) => {
        
        //verifica se o barco cabe dentro da grelha de acordo com o seu tamanho e orientação
        if (orient === "H" && col + tamanho > TAMANHO) return false;
        if (orient === "V" && linha + tamanho > TAMANHO) return false;

        //verifica se 
        for (let i = 0; i < tamanho; i++) {

            const l = orient === "V" ? linha + i : linha;
            const c = orient === "H" ? col + i : col;

            if (grelha[l][c] !== null) return false;
        }
        return true;
    };

    // Quando o jogador clica numa célula
    const handleClique = (linha, col) => {
        // Bloqueia cliques se a frota já está completa
        if (frotaCompleta) return;

        // Ignora posição inválida
        if (!podeColocar(linha, col, barco.tamanho, orientacao)) return;

        // clona a grelha       percorre o ARRAY linha a linha, spread operator para copiar tudo
        const novaGrelha = grelha.map(r => [...r]);
        const celulasDoBarco = [];

        // Coloca o barco nas células correspondentes
        for (let i = 0; i < barco.tamanho; i++) {

            const l = orientacao === "V" ? linha + i : linha;
            const c = orientacao === "H" ? col + i : col;

            novaGrelha[l][c] = barco.id;
            celulasDoBarco.push({ l, c });
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
    };

    // Valida e envia os dados para o GamePanel
    const verificarTabuleiro = () => {
        setTabuleiroValido({ valido: true, coordenadas: coordenadasBarcos, grelha });
    };

    return (
        <div className="ti-wrapper">

            {/* Botões de orientação e reset */}
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

            {/* Barco atual a colocar */}
            <p className="ti-barco-info">
                {frotaCompleta ? "✅ Frota completa! Podes validar." : `A colocar: ${barco.nome} (tamanho ${barco.tamanho})`}
            </p>

            {/* Lista de barcos a colocar (oq fica em cima de grelha) */}
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

            {/* Grelha 10x10 — bloqueada quando frota está completa */}
            <Tabuleiro
                grelha={grelha}
                handleClique={handleClique}
                frotaCompleta={frotaCompleta}
            />

            {/* Botão validar — só ativo quando frota completa */}
            <button
                className="btn-validar"
                onClick={verificarTabuleiro}
                disabled={!frotaCompleta}
            >
                Validar Tabuleiro
            </button>

        </div>
    );
}

export default TabuleiroInicial;