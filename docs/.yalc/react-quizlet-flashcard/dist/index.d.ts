import { CSSProperties } from 'react';
import { JSX } from 'react/jsx-runtime';
import { ReactElement } from 'react';

export declare function Flashcard({ style, flipHook, className, front, back, }: FlashcardProps): JSX.Element;

export declare function FlashcardArray({ flipArrayHook, deck, style }: FlashcardArrayProps): JSX.Element;

export declare interface FlashcardArrayProps {
    flipArrayHook?: UseFlashcardArray;
    deck: IFlashcard[];
    style?: CSSProperties;
}

export declare interface FlashcardProps extends IFlashcard {
    manualFlip?: boolean;
    flipHook?: UseFlashcard;
}

export declare type FlipDirection = 'rtl' | 'ltr' | 'tb' | 'bt';

export declare type FlipState = 'front' | 'back';

export declare interface IFlashcard {
    className?: string;
    style?: CSSProperties;
    front: {
        html: ReactElement;
        style?: CSSProperties;
    };
    back: {
        html: ReactElement;
        style?: CSSProperties;
    };
}

declare interface UseFlashcard {
    state: FlipState;
    manualFlip: boolean;
    disableFlip: boolean;
    resetCardState: () => void;
    flipDirection: FlipDirection;
    flip: (state?: FlipState) => void;
}

export declare function useFlashcard({ onFlip, disableFlip, manualFlip, flipDirection, }: UseFlashcardProps): UseFlashcard;

export declare interface UseFlashcardArray {
    cycle?: boolean;
    showCount: boolean;
    deckLength: number;
    currentCard: number;
    prevCard: () => void;
    nextCard: () => void;
    showControls: boolean;
    flipHook: UseFlashcard;
    cardsInDisplay: number[];
    showProgressBar: boolean;
    setCurrentCard: (index: number) => void;
    progressBar: {
        current: number;
        total: number;
        percentage: number;
    };
}

export declare function useFlashcardArray({ cycle, onFlip, deckLength, manualFlip, disableFlip, onCardChange, flipDirection, showCount, showControls, showProgressBar, }: UseFlashcardArrayProps): UseFlashcardArray;

export declare interface UseFlashcardArrayProps extends Omit<UseFlashcardProps, 'onFlip'> {
    cycle?: boolean;
    deckLength: number;
    showCount?: boolean;
    showControls?: boolean;
    showProgressBar?: boolean;
    onCardChange?: (cardIndex: number) => void;
    onFlip?: (cardIndex: number, state: FlipState) => void;
}

declare interface UseFlashcardProps {
    manualFlip?: boolean;
    disableFlip?: boolean;
    flipDirection?: FlipDirection;
    onFlip?: (state: FlipState) => void;
}

export { }
