import type { ReactElement, CSSProperties, RefObject } from "react";

export default interface FlashcardProps {
  /**
   * HTML string or JSX element to be displayed on the front of the card
   */
  frontHTML: string | ReactElement;
  /**
   * CSS styles to be applied to the front side of the card
   */
  frontCardStyle?: CSSProperties;
  /**
   *  CSS styles to be applied to the content of the front side of the card
   */
  frontContentStyle?: CSSProperties;
  /**
   * HTML string or JSX element to be displayed on the back of the card
   */
  backHTML: string | ReactElement;
  /**
   * CSS styles to be applied to the back side of the card
   */
  backCardStyle?: CSSProperties;
  /**
   * CSS styles to be applied to the content of the back side of the card
   */
  backContentStyle?: CSSProperties;
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
   * CSS styles to be applied to the wrapper div
   */
  style?: CSSProperties;
  /**
   *  Callback function to be called when the card is flipped
   */
  onCardFlip?: (state: boolean) => void;
  /**
   * when passed with a ref, ref.current object will contain reference to `flipCard()` function
   */
  manualFlipRef?: RefObject<() => void> | RefObject<null>;
}
