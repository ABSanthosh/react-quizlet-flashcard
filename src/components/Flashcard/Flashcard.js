import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Flashcard.css";

function Flashcard({
  front,
  frontChild,
  back,
  backChild,
  className,
  reset,
  height,
  width,
  FlashCardStyle,
  onClick,
  ...props
}) {
  const [isFlipped, setFlipped] = useState(false);

  // To reset flip state
  useEffect(() => {
    setFlipped(false);
  }, [reset]);

  // useEffect(() => {
  //   onClick(isFlipped);
  // }, [isFlipped]);

  return (
    <div
      className={`FlashcardWrapper ${className}`}
      style={{ height: height, width: width, ...FlashCardStyle }}
      {...props}
    >
      <div
        className={`FlashcardWrapper__item ${
          isFlipped ? "FlashcardWrapper__item--flip" : ""
        }`}
        onClick={() => {
          setFlipped(!isFlipped);
          onClick(!isFlipped);
        }}
      >
        <div className="FlashcardWrapper__item--front">
          <div className="FlashcardWrapper__item--content">
            <span dangerouslySetInnerHTML={{ __html: front }} />
            {frontChild}
          </div>
        </div>
        <div className="FlashcardWrapper__item--back">
          <div className="FlashcardWrapper__item--content">
            <span dangerouslySetInnerHTML={{ __html: back }} />
            {backChild}
          </div>
        </div>
      </div>
    </div>
  );
}

Flashcard.propTypes = {
  front: PropTypes.string,
  back: PropTypes.string,
  className: PropTypes.string,
  reset: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  frontChild: PropTypes.node,
  backChild: PropTypes.node,
  FlashCardStyle: PropTypes.object,
  onClick: PropTypes.func,
};

Flashcard.defaultProps = {
  front: "front",
  back: "back",
  className: "",
  reset: false,
  height: "",
  width: "",
  frontChild: null,
  backChild: null,
  FlashCardStyle: {},
  onClick: () => false,
};

export default Flashcard;
