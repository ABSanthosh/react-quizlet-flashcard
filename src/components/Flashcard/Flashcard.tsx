import React, { useState, useCallback } from "react";
import FlashcardProps from "../../interfaces/IFlashcard";
import "./Flashcard.scss";

// added
// manualFlipRef?: React.MutableRefObject<() => void>;
// borderRadius?: string;
// jsx elements for frontHTML and backHTML

// removed
// default styles like padding, border radius and flex alignment for content

function Flashcard({
  frontHTML,
  frontCardStyle,
  frontContentStyle,
  backHTML,
  backCardStyle,
  backContentStyle,
  className = "",
  style,
  height,
  borderRadius = "1rem",
  width,
  onCardFlip = (state = false) => {},
  manualFlipRef = { current: null },
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function onManualFlip() {
    setIsFlipped(!isFlipped);
    onCardFlip(!isFlipped);
  }

  if (manualFlipRef.current !== null) {
    manualFlipRef.current = onManualFlip;
  }

  return (
    <div
      className={`FlashcardWrapper ${className}`}
      style={{
        height: height,
        width: width,
        ...style,
      }}
    >
      <div
        className={`FlashcardWrapper__item ${
          isFlipped ? "FlashcardWrapper__item--flip" : ""
        }`}
        style={{
          borderRadius: borderRadius,
        }}
        onClick={() => {
          if (manualFlipRef.current) return;
          setIsFlipped(!isFlipped);
          onCardFlip(!isFlipped);
        }}
      >
        <div
          className="FlashcardWrapper__item--front"
          style={{
            ...frontCardStyle,
            cursor: manualFlipRef.current ? "default" : "pointer",
          }}
        >
          {typeof frontHTML !== "string" ? (
            <div
              className="FlashcardWrapper__item--content"
              style={frontContentStyle}
            >
              {frontHTML}
            </div>
          ) : (
            <div
              className="FlashcardWrapper__item--content"
              dangerouslySetInnerHTML={{ __html: frontHTML }}
              style={frontContentStyle}
            />
          )}
        </div>
        <div
          className="FlashcardWrapper__item--back"
          style={{
            ...backCardStyle,
            cursor: manualFlipRef.current ? "default" : "pointer",
          }}
        >
          {typeof backHTML !== "string" ? (
            <div
              className="FlashcardWrapper__item--content"
              style={backContentStyle}
            >
              {backHTML}
            </div>
          ) : (
            <div
              className="FlashcardWrapper__item--content"
              dangerouslySetInnerHTML={{ __html: backHTML }}
              style={backContentStyle}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
