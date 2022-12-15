import { useState } from "react";
import "./Flashcard.scss";

// added
// manualFlipRef?: React.MutableRefObject<() => void>;
// borderRadius?: string;
// jsx elements for frontHTML and backHTML

// removed
// default styles like padding, border radius and flex alignment for content

interface FlashcardProps {
  /**
   * HTML string or JSX element to be displayed on the front of the card
   */
  frontHTML: string | JSX.Element;
  /**
   * CSS styles to be applied to the front side of the card
   */
  frontCardStyle?: React.CSSProperties;
  /**
   *  CSS styles to be applied to the content of the front side of the card
   */
  frontContentStyle?: React.CSSProperties;
  /**
   * HTML string or JSX element to be displayed on the back of the card
   */
  backHTML: string | JSX.Element;
  /**
   * CSS styles to be applied to the back side of the card
   */
  backCardStyle?: React.CSSProperties;
  /**
   * CSS styles to be applied to the content of the back side of the card
   */
  backContentStyle?: React.CSSProperties;
  /**
   * CSS class to be applied to the wrapper div
   */
  className?: string;
  /**
   * CSS height of the wrapper div
   */
  height?: string;
  /**
   * CSS border-radius of the wrapper div
   */
  borderRadius?: string;
  /**
   * CSS width of the wrapper div
   */
  width?: string;
  /**
   * Boolean to reset the state of the card
   */
  resetState?: boolean;
  /**
   * CSS styles to be applied to the wrapper div
   */
  style?: React.CSSProperties;
  /**
   *  Callback function to be called when the card is flipped
   */
  onCardFlip?: (state: boolean) => void;
  /**
   * when passed with a ref, ref.current object will contain reference to `flipCard()` function
   */
  manualFlipRef?: React.MutableRefObject<() => void>;
}

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
  manualFlipRef = null,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  function onManualFlip() {
    setIsFlipped(!isFlipped);
    onCardFlip(!isFlipped);
  }
  if (manualFlipRef) manualFlipRef.current = onManualFlip;

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
          if (manualFlipRef) return;
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
