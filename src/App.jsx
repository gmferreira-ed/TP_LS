import "./assets/styles/App.css";
import { useState } from "react";
import {
  Header,
  Footer,
  ControlPanel,
  GamePanel,
  GameOverModal,
} from "./components/";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");

  const handleGameStart = () => {
    if (gameStarted) {
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);
  };

  return (
    <div id="container">
      <Header />
      <main>
        <ControlPanel
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          selectedLevel={selectedLevel}
          onLevelChange={handleLevelChange}
        />
        <GamePanel selectedLevel={selectedLevel} />
      </main>
      <Footer />
    </div>
  );
}
export default App;
