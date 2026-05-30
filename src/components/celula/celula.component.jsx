import "./celula.css";

function Celula({ celula, linha, coluna, handleClique, isPC, debugMode }) {

    let extraClass = "";
    const mostrarBarco = !isPC || debugMode;

    if (celula.state === "unexplored") {
        if (celula.hasShip !== null && mostrarBarco) {
            extraClass = "barco";
        } else {
            extraClass = "agua";
        }
    } else if (celula.state === "miss") {
        extraClass = "falha";
    } else if (celula.state === "hit") {
        extraClass = "acerto";
    } else if (celula.state === "destroyed") {
        extraClass = "destruido";
    } else if (celula.state === "radar") {
        extraClass = "radar";
    }

    return (
        <div
            className={`ti-celula ${extraClass}`}
            onClick={() => handleClique(linha, coluna)}
        >
           {celula.state === "miss" && <span className="marca-falha">X</span>}
        </div>
    );
}

export default Celula;