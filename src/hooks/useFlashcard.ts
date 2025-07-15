import { useCallback, useMemo, useState } from 'react'
import { FlipState, type FlipDirection } from '../components/Flashcard/types'

export interface UseFlashcardProps {
  manualFlip?: boolean
  disableFlip?: boolean
  flipDirection?: FlipDirection
  onFlip?: (state: FlipState) => void
}

export interface UseFlashcard {
  state: FlipState
  manualFlip: boolean
  disableFlip: boolean
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

  const memoizedOnFlip = useCallback(
    (state: FlipState) => {
      if (onFlip) {
        onFlip(state)
      }
    },
    [onFlip]
  )

  const flip = useCallback(
    (state?: FlipState) => {
      if (disableFlip) return

      setFlashcardSide((prev) => {
        const newState = state ?? (prev === FlipState.Front ? FlipState.Back : FlipState.Front)
        // Only call onFlip if state actually changed
        if (newState !== prev) {
          memoizedOnFlip(newState)
        }
        return newState
      })
    },
    [disableFlip, memoizedOnFlip]
  )

  const resetCardState = useCallback(() => {
    setFlashcardSide(FlipState.Front)
  }, [])

  return useMemo(
    () => ({
      flip,
      manualFlip,
      disableFlip,
      flipDirection,
      resetCardState,
      state: flashcardSide,
      onFlip: memoizedOnFlip,
    }),
    [flashcardSide, flip, resetCardState, manualFlip, memoizedOnFlip, flipDirection, disableFlip]
  )
}
