export default interface FlashcardArrayProps {
  /**
   * Array of objects that populate the card.
   */
  cards: Array<{
    /**
     * Unique identifier for the card.
     */
    id: number;
    /**
     * HTML string for the front of the card.
     */
    frontHTML: string | JSX.Element;
    /**
     * HTML string for the back of the card.
     */
    backHTML: string | JSX.Element;
    /**
     * Styles for the front of the card.
     */
    frontCardStyle?: React.CSSProperties;
    /**
     * Styles for the content of the front facing card.
     */
    frontContentStyle?: React.CSSProperties;
    /**
     * Styles for the back of the card.
     */
    backCardStyle?: React.CSSProperties;
    /**
     * Styles for the content of the back facing card.
     */
    backContentStyle?: React.CSSProperties;
    /**
     * Class name for each card container.
     */
    className?: string;
    /**
     * Card Height in px|%|vh|vw.
     */
    height?: string;
    /**
     * Card Width in px|%|vh|vw.
     */
    width?: string;
    /**
     * Card border radius in px|%|vh|vw.
     * @default 1rem
     * @type string
     */
    borderRadius?: string;
    /**
     * Styles for the card container.
     */
    style?: React.CSSProperties;
  }>;
  /**
   * Show or hide control arrows
   * @default true
   * @type boolean
   */
  controls?: boolean;
  /**
   * when passed with a ref, ref.current object will contain reference to `nextCard()`, `prevCard()` and `resetArray()` functions
   */
  forwardRef?: null | React.MutableRefObject<{
    nextCard: () => void;
    prevCard: () => void;
    resetArray: () => void;
  }>;
  /**
   * Show or hide the current count of card
   */
  showCount?: boolean;
  /**
   * Style of all front cards
   */
  frontCardStyle?: React.CSSProperties;
  /**
   * Style of all front card content
   */
  frontContentStyle?: React.CSSProperties;
  /**
   * Style of all back cards
   */
  backCardStyle?: React.CSSProperties;
  /**
   * Style of all back card content
   */
  backContentStyle?: React.CSSProperties;
  /**
   * Flashcard container style
   */
  FlashcardArrayStyle?: React.CSSProperties;
  /**
   * Callback function that is called when card in view changes with card id and index
   */
  onCardChange?: (id: any, index: number) => void;
  /**
   * Callback function that is called when a card is flipped with card id and flip state
   */
  onCardFlip?: (id: any, index: number, state: boolean) => void;
  /**
   * when passed with a ref, ref.current object will contain reference to `flipCard()` for the current card
   */
  currentCardFlipRef?: React.MutableRefObject<() => void>;
  /**
   * When set to true, the cards will repeat from the beginning when the last card is reached.
   * @default false
   * @type boolean
   */
  cycle?: boolean;
}
