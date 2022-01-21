import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import "./Flashcard.scss";

interface FlashcardProps {
  front: string;
  back: string;
  className?: string;
  reset?: boolean;
}

function Flashcard({ front, back, className, reset }: FlashcardProps) {
  const [isFlipped, setFlipped] = useState(false);

  // To reset flip state
  useEffect(() => {
    setFlipped(false);
  }, [reset]);

  return (
    <div className={`FlashcardWrapper ${className}`}>
      <div
        className={`FlashcardWrapper__item ${
          isFlipped ? "FlashcardWrapper__item--flip" : ""
        }`}
        onClick={() => setFlipped(!isFlipped)}
      >
        <div className="FlashcardWrapper__item--front">
          <div className="FlashcardWrapper__item--content">{front}</div>
        </div>
        <div className="FlashcardWrapper__item--back">
          <div className="FlashcardWrapper__item--content">{back}</div>
        </div>
      </div>
    </div>
  );
}

Flashcard.propTypes = {
  front: PropTypes.string,
  back: PropTypes.string,
  className: PropTypes.string,
};

Flashcard.defaultProps = {
  front: "front",
  back: "back",
  className: "",
};

export default Flashcard;
