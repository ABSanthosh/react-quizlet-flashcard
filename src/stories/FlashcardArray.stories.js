import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";

const deck = {
  id: "nsh19mt",
  title: "First Deck",
  author: "Santhosh",
  description: "This is the first deck",
  cards: [
    {
      id: 1,
      front: "What is the capital of Alaska?",
      back: "Juneau",
      options: ["Juneau", "Anchorage", "Fairbanks"],
    },
    {
      id: 2,
      front: "What is the capital of California?",
      back: "Sacramento",
      options: ["Sacramento", "Los Angeles", "San Francisco"],
    },
    {
      id: 3,
      front: "What is the capital of New York?",
      back: "Albany",
      options: ["Albany", "New York", "Buffalo"],
    },
    {
      id: 4,
      front: "What is the capital of Florida?",
      back: "Tallahassee",
      options: ["Tallahassee", "Orlando", "Jacksonville"],
    },
    {
      id: 5,
      front: "What is the capital of Texas?",
      back: "Austin",
      options: ["Austin", "Houston", "San Antonio"],
    },
    {
      id: 6,
      front: "What is the capital of New Mexico?",
      back: "Santa Fe",
      options: ["Santa Fe", "Albuquerque", "Las Cruces"],
    },
    {
      id: 7,
      front: "What is the capital of Arizona?",
      back: "Phoenix",
      options: ["Phoenix", "Tucson", "Mesa"],
    },
  ],
};

import FlashcardArray from "../components/FlashcardArray/FlashcardArray";

const stories = storiesOf("Flashcard Array", module);

stories.add("default", () => {
  const arrayRef = useRef({});
  return (
    <div>
      <div>
        <FlashcardArray
          cards={deck.cards}
          forwardRef={arrayRef}
          onCardChange={(cardNumber) => {}}
        />
        <button onClick={() => arrayRef.current.prevCard()}>Prev</button>
        <button onClick={() => arrayRef.current.nextCard()}>Next</button>
      </div>
    </div>
  );
});
