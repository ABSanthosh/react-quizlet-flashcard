import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Flashcard from "../Flashcard/Flashcard";
import "./FlashcardArray.css";
import rightArrow from "../../assets/right.png";
import leftArrow from "../../assets/left.png";

function FlashcardArray({ cards, controls, count, onCardChange, forwardRef }) {
  const [cardNumber, setCardNumber] = useState(0);
  const [cardsInDisplay, setCardsInDisplay] = useState([-1, 0, 1]);

  const childArray = cards.map((item, index) => (
    <Flashcard
      key={item.id}
      reset={index === cardNumber}
      front={item.front}
      back={item.back}
      frontChild={item.frontChild ? item.frontChild : null}
      backChild={item.backChild ? item.backChild : null}
    />
  ));

  useEffect(() => {
    if (forwardRef) {
      forwardRef.current.nextCard = nextCard;
      forwardRef.current.prevCard = prevCard;
    }
  });

  useEffect(() => {
    onCardChange(cardNumber + 1);
  }, [cardNumber]);

  const placeFillerCard = (
    <Flashcard className="FlashcardArrayWrapper__empty" />
  );

  const numberOfCards =
    childArray.length !== undefined ? childArray.length - 1 : 0;

  const nextCard = () => {
    const currentCardNumber =
      cardNumber + 1 < numberOfCards ? cardNumber + 1 : numberOfCards;
    setCardNumber(currentCardNumber);
    setCardsInDisplay(
      currentCardNumber < numberOfCards
        ? [currentCardNumber - 1, currentCardNumber, currentCardNumber + 1]
        : [numberOfCards - 1, numberOfCards, -1]
    );
  };

  const prevCard = () => {
    const currentCardNumber = cardNumber - 1 >= 0 ? cardNumber - 1 : 0;
    setCardNumber(currentCardNumber);
    setCardsInDisplay(
      currentCardNumber === 0
        ? [-1, 0, 1]
        : [currentCardNumber - 1, currentCardNumber, currentCardNumber + 1]
    );
  };

  return (
    <div className="FlashcardArrayWrapper">
      <div className="FlashcardArrayWrapper__CardHolder">
        {cardsInDisplay[0] !== -1
          ? childArray[cardsInDisplay[0]]
          : placeFillerCard}
        {childArray[cardsInDisplay[1]]}
        {cardsInDisplay[2] !== -1
          ? childArray[cardsInDisplay[2]]
          : placeFillerCard}
      </div>

      {(controls || count) && (
        <div className="FlashcardArrayWrapper__controls">
          {controls && (
            <button onClick={() => prevCard()}>
              <img src={leftArrow} />
            </button>
          )}
          {count && (
            <span className="FlashcardArrayWrapper__controls--count">
              {cardNumber + 1}/{childArray.length}
            </span>
          )}
          {controls && (
            <button onClick={() => nextCard()}>
              <img src={rightArrow} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

FlashcardArray.propTypes = {
  cards: PropTypes.arrayOf(Object).isRequired,
  controls: PropTypes.bool,
  count: PropTypes.bool,
  onCardChange: PropTypes.func,
  forwardRef: PropTypes.object,
};

FlashcardArray.defaultProps = {
  controls: true,
  count: true,
  onCardChange: () => {},
  forwardRef: null,
};

export default FlashcardArray;
