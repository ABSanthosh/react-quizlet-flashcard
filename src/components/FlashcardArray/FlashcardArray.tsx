import React, { useState } from "react";
import FlashcardArrayProps from "../../interfaces/IFlashcardArray";
import Flashcard from "../Flashcard/Flashcard";
import "./FlashcardArray.scss";

function FlashcardArray({
  cards,
  controls = true,
  showCount = true,
  onCardChange = () => {},
  frontCardStyle = {},
  frontContentStyle = {},
  backCardStyle = {},
  backContentStyle = {},
  forwardRef = null,
  FlashcardArrayStyle = {},
}: FlashcardArrayProps) {
  const [cardNumber, setCardNumber] = React.useState(0);
  const [cardsInDisplay, setCardsInDisplay] = React.useState([-1, 0, 1]);
  const [isOverFlow, setIsOverFlow] = React.useState("");

  const placeFillerCard = (
    <Flashcard
      className="FlashcardArrayWrapper__empty"
      width="100%"
      backHTML=""
      frontHTML=""
    />
  );

  const cardsList = cards.map((card, index) => (
    <Flashcard
      key={index}
      frontHTML={card.frontHTML}
      backHTML={card.backHTML}
      frontCardStyle={{ ...card.frontCardStyle, ...frontCardStyle }}
      frontContentStyle={{ ...card.frontContentStyle, ...frontContentStyle }}
      backCardStyle={{ ...card.backCardStyle, ...backCardStyle }}
      backContentStyle={{ ...card.backContentStyle, ...backContentStyle }}
      className={card.className}
      height={card.height || "100%"}
      width={card.width || "100%"}
      style={card.style}
      onCardFlip={(state) => {
        onCardChange(card.id, state);
        setIsOverFlow("hidden");
        setTimeout(() => {
          setIsOverFlow("");
        }, 3);
      }}
    />
  ));

  const numberOfCards =
    cardsList.length !== undefined ? cardsList.length - 1 : 0;

  const nextCard = () => {
    const currentCardNumber =
      cardNumber + 1 < numberOfCards ? cardNumber + 1 : numberOfCards;
    setCardNumber(currentCardNumber);

    if (currentCardNumber < numberOfCards) {
      setIsOverFlow("hidden");
      setTimeout(() => {
        setIsOverFlow("");
      }, 90);
    }

    setCardsInDisplay(
      currentCardNumber < numberOfCards
        ? [currentCardNumber - 1, currentCardNumber, currentCardNumber + 1]
        : [numberOfCards - 1, numberOfCards, -1]
    );
  };

  const prevCard = () => {
    const currentCardNumber = cardNumber - 1 >= 0 ? cardNumber - 1 : 0;
    setCardNumber(currentCardNumber);

    if (currentCardNumber !== 0) {
      setIsOverFlow("hidden");
      setTimeout(() => {
        setIsOverFlow("");
      }, 90);
    }

    setCardsInDisplay(
      currentCardNumber === 0
        ? [-1, 0, 1]
        : [currentCardNumber - 1, currentCardNumber, currentCardNumber + 1]
    );
  };

  // useEffect(() => {
  //   if (forwardRef) {
  //     forwardRef.current.nextCard = nextCard;
  //     forwardRef.current.prevCard = prevCard;
  //   }
  // });

  return (
    <div className="FlashcardArrayWrapper" style={FlashcardArrayStyle}>
      <div
        className="FlashcardArrayWrapper__CardHolder"
        style={{ overflow: isOverFlow }}
      >
        {cardsInDisplay[0] !== -1
          ? cardsList[cardsInDisplay[0]]
          : placeFillerCard}
        {cardsList[cardsInDisplay[1]]}
        {cardsInDisplay[2] !== -1
          ? cardsList[cardsInDisplay[2]]
          : placeFillerCard}
      </div>

      {(controls || showCount) && (
        <div className="FlashcardArrayWrapper__controls">
          {controls && (
            <button onClick={() => prevCard()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{ height: "24px", width: "24px" }}
              >
                <path
                  d="M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z"
                  style={{ fill: "#1c1b1e", height: "24px", width: "24px" }}
                  data-name="Left"
                />
              </svg>
            </button>
          )}
          {showCount && (
            <span className="FlashcardArrayWrapper__controls--count">
              {cardNumber + 1}/{cardsList.length}
            </span>
          )}
          {controls && (
            <button onClick={() => nextCard()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                style={{ height: "24px", width: "24px" }}
              >
                <path
                  d="m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z"
                  style={{ fill: "#1c1b1e", height: "24px", width: "24px" }}
                  data-name="Right"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FlashcardArray;