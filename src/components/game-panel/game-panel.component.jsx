import { useState, useEffect } from "react";
import "./game-panel.css";
import { Card } from "../index";
import { CARDS_LOGOS } from "../../constants";
import shuffleArray from "../../helpers/shuffle.js";

function GamePanel({ selectedLevel }) {
  const [cards, setCards] = useState([]);
  const gameClass =
    selectedLevel === "1"
      ? ""
      : selectedLevel === "2"
        ? "intermedio"
        : "avancado";

  useEffect(() => {
    function createPanel() {
      let numOfCardPairs;
      switch (selectedLevel) {
        // Level: Beginner
        case "1":
          numOfCardPairs = 3;
          break;
        case "2":
          numOfCardPairs = 6;
          break;
        // Level: Advanced
        case "3":
          numOfCardPairs = 10;
          break;
        default:
          numOfCardPairs = 0;
          break;
      }

      let initialCards = shuffleArray(CARDS_LOGOS);
      initialCards = initialCards.slice(0, numOfCardPairs);

      const doubledCardsObjects = [];
      initialCards.forEach((card) => {
        doubledCardsObjects.push({
          id: card,
          name: card,
        });
        doubledCardsObjects.push({
          id: `${card}-clone`,
          name: card,
        });
      });
      const doubledShuffledCardsObjects = shuffleArray(doubledCardsObjects);
      setCards([...doubledShuffledCardsObjects]);
    }
    createPanel();
  }, [selectedLevel]);

  return (
    <section className="game-panel">
      <h3 className="sr-only">Peças do Jogo</h3>
      <div id="game" className={gameClass}>
        {cards.map((elemento) => (
          <Card key={elemento.id} name={elemento.name} />
        ))}
      </div>
    </section>
  );
}

export default GamePanel;
