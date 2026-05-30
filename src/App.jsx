import "./assets/styles/App.css";
import { useState } from "react";
import {
  Header,
  Footer,
  GamePanel,
  PanelInicial,
} from "./components/";

function App() {
  const [jogador, setJogador] = useState(null);

  const handleStart = (nome) => {
    setJogador(nome);
  };

  return (
    <div id="container">
      <Header />
      <main>
        {jogador === null ? (
          <PanelInicial onStart={handleStart} />
        ) : (
          <GamePanel jogador={jogador} />
        )}

      </main>
      <Footer />
    </div>
  );
}

export default App;
