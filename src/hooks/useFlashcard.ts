import { useState } from 'react'
import { FlipState, type FlipDirection } from '../components/Flashcard/types'

export interface UseFlashcardProps {
  manualFlip?: boolean
  disableFlip?: boolean
  flipDirection?: FlipDirection
  onFlip?: (state: FlipState) => void
}

export interface UseFlashcard {
  state: FlipState
  manualFlip?: boolean
  disableFlip?: boolean
  resetCardState: () => void
  flipDirection: FlipDirection
  flip: (state?: FlipState) => void
}

export function useFlashcard({
  onFlip,
  disableFlip = false,
  manualFlip = false,
  flipDirection = 'bt',
}: UseFlashcardProps): UseFlashcard {
  const [flashcardSide, setFlashcardSide] = useState<FlipState>(FlipState.Front)

  const flip = (state?: FlipState) => {
    if (disableFlip) return
    setFlashcardSide((prev) => {
      const newState = state ?? (prev === FlipState.Front ? FlipState.Back : FlipState.Front)
      onFlip?.(newState)
      return newState
    })
  }

  const resetCardState = () => {
    setFlashcardSide(FlipState.Front)
  }

  return {
    state: flashcardSide,
    flip,
    manualFlip,
    flipDirection,
    resetCardState,
    disableFlip: disableFlip ? disableFlip : false,
  }
}
