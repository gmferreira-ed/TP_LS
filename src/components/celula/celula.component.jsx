
function Celula({ valor, linha, coluna, handleClique }) {

    return (
        <div
            className={`ti-celula ${valor !== null ? "barco" : ""}`}
            onClick={() => handleClique(linha, coluna)}
        />
    );
}

export default Celula;