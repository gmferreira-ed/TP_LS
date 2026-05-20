function TabuleiroInicial({ setTabuleiroValido }) {

    const verificarTabuleiro = () => {

        const valido = true;

        setTabuleiroValido(valido);
    };

    return(
        <div>
            <p>Tabuleiro Inicial</p>

            <button onClick={verificarTabuleiro}>
                Validar Tabuleiro
            </button>
        </div>
    );
}

export default TabuleiroInicial;
