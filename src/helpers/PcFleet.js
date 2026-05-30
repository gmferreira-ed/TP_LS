import { FROTA, TAMANHO_TABULEIRO } from "../constants";

export function CriarGrelhaVazia() {
    return Array(TAMANHO_TABULEIRO).fill(null).map(() =>
        Array(TAMANHO_TABULEIRO).fill(null).map(() => ({ hasShip: null, state: 'unexplored' }))
    );
}

function podeColocar(Grelha, LinhaIndex, ColunaIndex, Tamanho, Orientacao) {
    if (Orientacao === "H" && ColunaIndex + Tamanho > TAMANHO_TABULEIRO) return false;
    if (Orientacao === "V" && LinhaIndex + Tamanho > TAMANHO_TABULEIRO) return false;

    for (let i = 0; i < Tamanho; i++) {
        const LinhaAtual = Orientacao === "V" ? LinhaIndex + i : LinhaIndex;
        const ColunaAtual = Orientacao === "H" ? ColunaIndex + i : ColunaIndex;
        if (Grelha[LinhaAtual][ColunaAtual].hasShip !== null) return false;
    }
    return true;
}

function colocarBarco(Grelha, Barco, LinhaIndex, ColunaIndex, Orientacao) {
    const CelulasDoBarco = [];
    for (let i = 0; i < Barco.tamanho; i++) {
        const LinhaAtual = Orientacao === "V" ? LinhaIndex + i : LinhaIndex;
        const ColunaAtual = Orientacao === "H" ? ColunaIndex + i : ColunaIndex;
        Grelha[LinhaAtual][ColunaAtual].hasShip = Barco.id;
        CelulasDoBarco.push({ LinhaAtual, ColunaAtual });
    }
    return CelulasDoBarco;
}

export function GerarFrotaAleatoria() {
    const Grelha = CriarGrelhaVazia();
    const CoordenadasBarcos = [];

    FROTA.forEach((BarcoAtual) => {
        let Colocado = false;
        while (!Colocado) {
            const Orientacao = Math.random() > 0.5 ? "H" : "V";
            const LinhaIndex = Math.floor(Math.random() * TAMANHO_TABULEIRO);
            const ColunaIndex = Math.floor(Math.random() * TAMANHO_TABULEIRO);

            if (podeColocar(Grelha, LinhaIndex, ColunaIndex, BarcoAtual.tamanho, Orientacao)) {
                const Celulas = colocarBarco(Grelha, BarcoAtual, LinhaIndex, ColunaIndex, Orientacao);
                CoordenadasBarcos.push({ id: BarcoAtual.id, Celulas });
                Colocado = true;
            }
        }
    });

    return { grelha: Grelha, coordenadas: CoordenadasBarcos };
}

export function ObterFrotaPreDefinida(numero) {
    const grelha = CriarGrelhaVazia();
    const coordenadasBarcos = [];

    const frotas = [
        [
            { id: 1, LinhaInicial: 0, ColunaInicial: 0, orientacao: "H" },
            { id: 2, LinhaInicial: 2, ColunaInicial: 0, orientacao: "V" },
            { id: 3, LinhaInicial: 5, ColunaInicial: 5, orientacao: "H" },
            { id: 4, LinhaInicial: 7, ColunaInicial: 2, orientacao: "H" },
            { id: 5, LinhaInicial: 9, ColunaInicial: 8, orientacao: "H" },
            { id: 6, LinhaInicial: 0, ColunaInicial: 9, orientacao: "V" }
        ],
        [
            { id: 1, LinhaInicial: 9, ColunaInicial: 0, orientacao: "H" },
            { id: 2, LinhaInicial: 0, ColunaInicial: 5, orientacao: "H" },
            { id: 3, LinhaInicial: 2, ColunaInicial: 8, orientacao: "V" },
            { id: 4, LinhaInicial: 4, ColunaInicial: 2, orientacao: "H" },
            { id: 5, LinhaInicial: 6, ColunaInicial: 0, orientacao: "H" },
            { id: 6, LinhaInicial: 8, ColunaInicial: 8, orientacao: "H" }
        ],
        [
            { id: 1, LinhaInicial: 5, ColunaInicial: 0, orientacao: "V" },
            { id: 2, LinhaInicial: 2, ColunaInicial: 2, orientacao: "H" },
            { id: 3, LinhaInicial: 8, ColunaInicial: 4, orientacao: "H" },
            { id: 4, LinhaInicial: 0, ColunaInicial: 8, orientacao: "V" },
            { id: 5, LinhaInicial: 5, ColunaInicial: 8, orientacao: "H" },
            { id: 6, LinhaInicial: 9, ColunaInicial: 8, orientacao: "H" }
        ]
    ];

    const frotaEscolhida = frotas[numero - 1] || frotas[0];

    frotaEscolhida.forEach(pos => {
        const BarcoAtual = FROTA.find(b => b.id === pos.id);
        const Celulas = colocarBarco(grelha, BarcoAtual, pos.LinhaInicial, pos.ColunaInicial, pos.orientacao);
        coordenadasBarcos.push({ id: BarcoAtual.id, Celulas });
    });

    return { grelha, coordenadas: coordenadasBarcos };
}
