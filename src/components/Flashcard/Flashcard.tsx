import { useState, useCallback } from "react";
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
  borderRadius,
  width,
  resetState = false,
  onCardFlip = (state = false) => {},
  manualFlipRef = { current: null },
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function onManualFlip() {
    setIsFlipped(!isFlipped);
    onCardFlip(!isFlipped);
  }
  manualFlipRef.current = useCallback(onManualFlip, [isFlipped]);

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
            cursor: manualFlipRef ? "default" : "pointer",
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
            cursor: manualFlipRef ? "default" : "pointer",
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
