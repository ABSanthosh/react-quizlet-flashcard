import React, { useRef, useState } from "react";
import { storiesOf } from "@storybook/react";
const stories = storiesOf("Flashcard Array", module);
import "./storyStyle.scss";

import FlashcardArray from "../components/FlashcardArray/FlashcardArray";

const deck = {
  id: "nsh19mt",
  title: "First Deck",
  author: "Santhosh",
  description: "This is the first deck",
  cards: [
    {
      id: 1,
      frontHTML: "<p>What is the <u>capital</u> of Alaska?</p>",
      backHTML: "Juneau",
      options: ["Juneau", "Anchorage", "Fairbanks"],
    },
    {
      id: 2,
      frontHTML: "What is the capital of California?",
      backHTML: "Sacramento",
      options: ["Sacramento", "Los Angeles", "San Francisco"],
    },
    {
      id: 3,
      frontHTML: "What is the capital of New York?",
      backHTML: "Albany",
      options: ["Albany", "New York", "Buffalo"],
    },
    {
      id: 4,
      frontHTML: "What is the capital of Florida?",
      backHTML: "Tallahassee",
      options: ["Tallahassee", "Orlando", "Jacksonville"],
    },
    {
      id: 5,
      frontHTML: "What is the capital of Texas?",
      backHTML: "Austin",
      options: ["Austin", "Houston", "San Antonio"],
    },
    {
      id: 6,
      frontHTML: "What is the capital of New Mexico?",
      backHTML: "Santa Fe",
      options: ["Santa Fe", "Albuquerque", "Las Cruces"],
    },
    {
      id: 7,
      frontHTML: "What is the capital of Arizona?",
      backHTML: "Phoenix",
      options: ["Phoenix", "Tucson", "Mesa"],
    },
  ],
};

stories.add("Basic FlashcardArray", () => {
  return (
    <div className="storyContainer">
      <FlashcardArray cards={deck.cards} />
    </div>
  );
});

stories.add("Cycling FlashcardArray", () => {
  return (
    <div className="storyContainer">
      <FlashcardArray cards={deck.cards} cycle={true} />
    </div>
  );
});

stories.add("Custom Controls", () => {
  const controlRef = useRef({}); // {} should definitely be passed to useRef for it to work
  const currentCardFlipRef = useRef(); // nothing should be passed to useRef for it to work
  const [currentCard, setCurrentCard] = useState(1);

  return (
    <div className="storyContainer">
      <FlashcardArray
        cards={deck.cards}
        controls={false}
        showCount={false}
        forwardRef={controlRef}
        currentCardFlipRef={currentCardFlipRef}
        onCardChange={(id, index) => {
          setCurrentCard(index);
        }}
      />
      <br />
      <div className="storyContainer__row">
        <h2>Custom Controls</h2>
      </div>
      <div className="storyContainer__row">
        <button
          className="storyContainer--buttons"
          onClick={() => controlRef.current.prevCard()}
        >
          Prev
        </button>
        <button
          className="storyContainer--buttons"
          onClick={() => controlRef.current.resetArray()}
        >
          Reset
        </button>
        <p>
          {currentCard} / {deck.cards.length}
        </p>
        <button
          className="storyContainer--buttons"
          onClick={() => currentCardFlipRef.current()}
        >
          Flip
        </button>
        <button
          className="storyContainer--buttons"
          onClick={() => controlRef.current.nextCard()}
        >
          Next
        </button>
      </div>
    </div>
  );
});

stories.add("Custom Styles for all cards", () => {
  return (
    <div className="storyContainer">
      <FlashcardArray
        cards={deck.cards}
        frontContentStyle={{
          backgroundColor: "lightgoldenrodyellow",
          color: "black",
        }}
        backContentStyle={{
          backgroundColor: "turquoise",
        }}
      />
    </div>
  );
});

stories.add("Custom Styles for each cards", () => {
  return (
    <div className="storyContainer">
      <FlashcardArray
        cards={[
          {
            id: 1,
            frontHTML: (
              <>
                <span style={{ backgroundColor: "lawngreen" }}>Option 1</span>
                <span style={{ backgroundColor: "lawngreen" }}>Option 2</span>
                <span style={{ backgroundColor: "lawngreen" }}>Option 3</span>
              </>
            ),
            backHTML: "Juneau",
            options: ["Juneau", "Anchorage", "Fairbanks"],
            frontContentStyle: {
              backgroundColor: "lightgoldenrodyellow",
              color: "black",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "1fr",
              gap: "10px",
              padding: "10px",
            },
          },
          {
            id: 2,
            frontHTML: (
              <>
                <span style={{ backgroundColor: "pink" }}>Option 1</span>
                <span style={{ backgroundColor: "pink" }}>Option 2</span>
                <span style={{ backgroundColor: "pink" }}>Option 3</span>
              </>
            ),
            backHTML: "Sacramento",
            options: ["Sacramento", "Los Angeles", "San Francisco"],
            frontContentStyle: {
              backgroundColor: "lightgoldenrodyellow",
              color: "black",
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: "10px",
              padding: "10px",
            },
          },
        ]}
      />
    </div>
  );
});
