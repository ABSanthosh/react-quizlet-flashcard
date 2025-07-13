import { useState } from 'react'
import { FlipState, type FlipDirection, type UseFlashcard } from '../components/Flashcard/types'

export function useFlashcard({
  onFlip,
  disableFlip = false,
  flipDirection = 'bt',
}: {
  disableFlip?: boolean
  flipDirection?: FlipDirection
  onFlip?: (state: FlipState) => void
}): UseFlashcard {
  const [flashcardSide, setFlashcardSide] = useState<FlipState>(FlipState.Front)

  const flip = (state?: FlipState) => {
    if (disableFlip) return
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
    disableFlip: disableFlip ? disableFlip : false,
  }
}
