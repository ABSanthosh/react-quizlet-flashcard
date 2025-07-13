import { useState } from 'react'

export enum FlipState {
  Front = 'front',
  Back = 'back',
}

// right-to-left
// left-to-right
// top-to-bottom
// bottom-to-top
export type FlipDirection = 'rtl' | 'ltr' | 'tb' | 'bt'

export interface UseFlashcard {
  state: FlipState
  flip: (state?: FlipState) => void
  // onFlip should be called when a card is flipped and when the flip state changes
  onFlip?: (state: FlipState) => void
  flipDirection: FlipDirection
}

export function useFlashcard({
  onFlip,
  flipDirection = 'bt',
}: {
  onFlip?: (state: FlipState) => void
  flipDirection?: FlipDirection
}): UseFlashcard {
  const [flashcardSide, setFlashcardSide] = useState<FlipState>(FlipState.Front)

  const flip = (state?: FlipState) => {
    setFlashcardSide((prev) => {
      const newState = state ?? (prev === FlipState.Front ? FlipState.Back : FlipState.Front)
      onFlip?.(newState)
      return newState
    })
  }

  return {
    state: flashcardSide,
    flip,
    onFlip,
    flipDirection,
  }
}
