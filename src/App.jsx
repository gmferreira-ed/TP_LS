import "./assets/styles/App.css";
import { useState } from "react";
import {
  Header,
  Footer,
  GamePanel,
  PanelInicial,
} from "./components/";

function App() {
  const [jogador, setJogador] = useState(null); // null = ainda no setup

  const handleStart = (nome) => {
    setJogador(nome);
  };

  return (
    <div id="container">
      <Header />
      <main>
        {/* { jogador === null ? 
        //se ainda n tiver nome
        (<PanelInicial onStart={handleStart} />) : 

        //quando tiver nome
        (<div>
          <GamePanel jogador={jogador}/>  
         </div>)
        } */}

        <GamePanel jogador={"jogador"}/> 

      </main>
      <Footer />
    </div>
  );
}

export default App;
