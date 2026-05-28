import { useState } from "react";
import "./tabuleiro-inicial.css";

// Barcos obrigatórios pelo enunciado
const FROTA = [
    { id: 1, tamanho: 5, nome: "Porta-Aviões" },
    { id: 2, tamanho: 4, nome: "Navio-Tanque" },
    { id: 3, tamanho: 3, nome: "Destroyer A" },
    { id: 4, tamanho: 3, nome: "Destroyer B" },
    { id: 5, tamanho: 2, nome: "Submarino A" },
    { id: 6, tamanho: 2, nome: "Submarino B" },
];

const TAMANHO = 10;

// Cria uma matriz 10x10 preenchida com null (célula vazia)
function criarGrelhaVazia() {
    return Array(TAMANHO).fill(null).map(() => Array(TAMANHO).fill(null));
}

function TabuleiroInicial({ setTabuleiroValido }) {

    // Matriz 10x10 — null = vazio, número = id do barco
    const [grelha, setGrelha] = useState(criarGrelhaVazia());

    // Orientação: "H" = horizontal, "V" = vertical
    const [orientacao, setOrientacao] = useState("H");

    // Índice do barco atual em FROTA
    const [barcoAtual, setBarcoAtual] = useState(0);

    // IDs dos barcos já colocados
    const [colocados, setColocados] = useState([]);

    // Coordenadas de cada barco: { id, celulas: [{l, c}, ...] }
    const [coordenadasBarcos, setCoordenadasBarcos] = useState([]);

    // true quando todos os barcos estão colocados — bloqueia a grelha
    const frostaCompleta = colocados.length === FROTA.length;

    // Barco a ser colocado agora
    const barco = FROTA[barcoAtual];

    // Verifica se o barco cabe na posição sem sair dos limites nem sobrepor
    const podeColocar = (linha, col, tamanho, orient) => {
        if (orient === "H" && col + tamanho > TAMANHO) return false;
        if (orient === "V" && linha + tamanho > TAMANHO) return false;

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
        if (frostaCompleta) return;

        // Ignora posição inválida
        if (!podeColocar(linha, col, barco.tamanho, orientacao)) return;

        // Copia a grelha (nunca mutar o estado diretamente)
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

    // Reseta tudo para o início
    const resetar = () => {
        setGrelha(criarGrelhaVazia());
        setBarcoAtual(0);
        setColocados([]);
        setCoordenadasBarcos([]);
        setTabuleiroValido(false);
    };

    // Valida e envia os dados para o GamePanel
    const verificarTabuleiro = () => {
        // setTabuleiroValido({ valido: true, coordenadas: coordenadasBarcos, grelha });
        setTabuleiroValido(true);
    };

    return (
        <div className="ti-wrapper">

            {/* Botões de orientação e reset */}
            <div className="ti-controlos">
                <button
                    className={orientacao === "H" ? "ativo" : ""}
                    onClick={() => setOrientacao("H")}
                >
                    Horizontal
                </button>
                <button
                    className={orientacao === "V" ? "ativo" : ""}
                    onClick={() => setOrientacao("V")}
                >
                    Vertical
                </button>
                <button onClick={resetar}>Resetar</button>
            </div>

            {/* Barco atual a colocar */}
            <p className="ti-barco-info">
                {frostaCompleta ? "✅ Frota completa! Podes validar." : `A colocar: ${barco.nome} (tamanho ${barco.tamanho})`}
            </p>

            {/* Lista de barcos com estado visual */}
            <div className="ti-frota-lista">
                {FROTA.map((b, i) => (
                    <span
                        key={b.id}
                        className={`ti-frota-item
                            ${colocados.includes(b.id) ? "colocado" : ""}
                            ${i === barcoAtual ? "atual" : ""}
                        `}
                    >
                        {b.nome} ({b.tamanho})
                    </span>
                ))}
            </div>

            {/* Grelha 10x10 — bloqueada quando frota está completa */}
            <div className={`ti-grelha ${frostaCompleta ? "bloqueada" : ""}`}>
                {grelha.map((linha, l) =>
                    linha.map((cel, c) => (
                        <div
                            key={`${l}-${c}`}
                            className={`ti-celula ${cel !== null ? "barco" : ""}`}
                            onClick={() => handleClique(l, c)}
                        />
                    ))
                )}
            </div>

            {/* Botão validar — só ativo quando frota completa */}
            <button
                onClick={verificarTabuleiro}
                disabled={!frostaCompleta}
            >
                Validar Tabuleiro
            </button>

        </div>
    );
}

export default TabuleiroInicial;