import { useState } from 'react'
import { FlipState, type FlipDirection, type UseFlashcard } from '../components/Flashcard/types'

export interface UseFlashcardProps {
  onFlip?: (state: FlipState) => void
  disableFlip?: boolean
  flipDirection?: FlipDirection
}

export function useFlashcard({
  onFlip,
  disableFlip = false,
  flipDirection = 'bt',
}: UseFlashcardProps): UseFlashcard {
  const [flashcardSide, setFlashcardSide] = useState<FlipState>(FlipState.Front)
  const [isAnimated, setIsAnimated] = useState<boolean>(true)

  const flip = (state?: FlipState) => {
    if (disableFlip) return
    setFlashcardSide((prev) => {
      const newState = state ?? (prev === FlipState.Front ? FlipState.Back : FlipState.Front)
      onFlip?.(newState)
      return newState
    })
  }

  const resetCardState = ({ isAnimated }: { isAnimated?: boolean }) => {
    setFlashcardSide(FlipState.Front)
    setIsAnimated(!!isAnimated)
  }

  return {
    state: flashcardSide,
    flip,
    flipDirection,
    isAnimated,
    setIsAnimated,
    resetCardState,
    disableFlip: disableFlip ? disableFlip : false,
  }
}
