import { Celula } from "../../components/";
;

function Tabuleiro({ grelha, handleClique, frotaCompleta }) {
    
    return (
        <div className={`ti-grelha ${frotaCompleta ? "bloqueada" : ""}`}>

            {
                grelha.map((linha, l) =>

                    linha.map((celula, c) => (

                        <Celula
                            key={`${l}-${c}`}
                            valor={celula}
                            linha={l}
                            coluna={c}
                            handleClique={handleClique}
                        />

                    ))
                )
            }

        </div>
    );
}

export default Tabuleiro;