import "./panel-inicial.css";
import { useState } from "react";

function PanelInicial({ onStart }) {

  const [nome, setNome] = useState("");

  const [erro, setErro] = useState(false);

  const handleSubmit = () => {
    if (nome.trim() === "") {
      setErro(true);
      return;
    }

    setErro(false);
    onStart(nome.trim());
  };

  return (
    <div id="panel-inicial">
      <div id="setup">
        <label htmlFor="nome-jogador">O teu nome:</label>
        <input
          id="nome-jogador"
          type="text"
          value={nome}
          onChange={(e) => { setNome(e.target.value); setErro(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Introduz o teu nome"
          maxLength={20}
        />
        {erro && <p id="erro-nome">Introduz o teu nome para jogar.</p>}
        <button onClick={handleSubmit}>Jogar</button>
      </div>
    </div>
  );
}

export default PanelInicial;