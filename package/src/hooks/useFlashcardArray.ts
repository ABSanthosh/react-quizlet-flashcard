'use client'
import { useCallback, useMemo, useState, useEffect } from 'react'
import type { FlipState } from '../components/Flashcard/types'
import { useFlashcard, type UseFlashcard, type UseFlashcardProps } from './useFlashcard'

export interface UseFlashcardArray {
  cycle?: boolean
  showCount: boolean
  deckLength: number
  currentCard: number
  canGoPrev: boolean
  canGoNext: boolean
  prevCard: () => void
  nextCard: () => void
  showControls: boolean
  flipHook: UseFlashcard
  cardsInDisplay: number[]
  showProgressBar: boolean
  setCurrentCard: (index: number) => void
  progressBar: {
    current: number
    total: number
    percentage: number
  }
}

export interface UseFlashcardArrayProps extends Omit<UseFlashcardProps, 'onFlip'> {
  cycle?: boolean
  deckLength: number
  showCount?: boolean
  showControls?: boolean
  showProgressBar?: boolean
  onCardChange?: (cardIndex: number) => void
  onFlip?: (cardIndex: number, state: FlipState) => void
}

export function useFlashcardArray({
  cycle = false,
  onFlip,
  deckLength,
  manualFlip,
  disableFlip,
  onCardChange,
  flipDirection,
  showCount = true,
  showControls = true,
  showProgressBar = false,
}: UseFlashcardArrayProps): UseFlashcardArray {
  const [currentCard, setCurrentCard] = useState<number>(0)
  const [cardsInDisplay, setCardsInDisplay] = useState<number[]>(
    !cycle ? [-1, 0, 1] : [deckLength - 1, 0, 1]
  )

  const totalCards = useMemo(() => deckLength, [deckLength])

  const canGoPrev = useMemo(() => cardsInDisplay[0] !== -1, [cardsInDisplay])
  const canGoNext = useMemo(() => cardsInDisplay[2] !== -1, [cardsInDisplay])

  // Update cardsInDisplay when cycle or deckLength changes
  useEffect(() => {
    if (cycle) {
      setCardsInDisplay([
        (currentCard - 1 + deckLength) % deckLength,
        currentCard,
        (currentCard + 1) % deckLength,
      ])
    } else {
      const newLeft = currentCard - 1 < 0 ? -1 : currentCard - 1
      const newCenter = currentCard
      const newRight = currentCard + 1 >= deckLength ? -1 : currentCard + 1
      setCardsInDisplay([newLeft, newCenter, newRight])
    }
  }, [cycle, deckLength, currentCard])

  // check and update cardsInDisplay based on cycle state change.

  const memoizedOnFlip = useCallback(
    (state: FlipState) => {
      onFlip?.(currentCard, state)
    },
    [onFlip, currentCard]
  )

  const flipHook = useFlashcard({
    onFlip: memoizedOnFlip,
    manualFlip,
    disableFlip,
    flipDirection,
  })

  const nextCard = useCallback(() => {
    const nextCardIndex = cycle
      ? (currentCard + 1) % totalCards
      : Math.min(currentCard + 1, totalCards - 1)

    if (nextCardIndex === currentCard) return // No change, don't animate

    flipHook.resetCardState()
    setCurrentCard(nextCardIndex)

    if (cycle) {
      setCardsInDisplay((prev) => [
        prev[1], // Previous center becomes left
        prev[2], // Previous right becomes center
        (prev[2] + 1) % totalCards, // New right card
      ])
    } else {
      const newLeft = nextCardIndex - 1 < 0 ? -1 : nextCardIndex - 1
      const newCenter = nextCardIndex
      const newRight = nextCardIndex + 1 >= totalCards ? -1 : nextCardIndex + 1

      setCardsInDisplay([newLeft, newCenter, newRight])
    }

    onCardChange?.(nextCardIndex)
  }, [currentCard, totalCards, cycle, flipHook, onCardChange])

  const prevCard = useCallback(() => {
    const prevCardIndex = cycle
      ? (currentCard - 1 + totalCards) % totalCards
      : Math.max(currentCard - 1, 0)

    if (prevCardIndex === currentCard) return // No change, don't animate

    flipHook.resetCardState()
    setCurrentCard(prevCardIndex)

    if (cycle) {
      setCardsInDisplay((prev) => [
        (prev[0] - 1 + totalCards) % totalCards, // New left card
        prev[0], // Previous left becomes center
        prev[1], // Previous center becomes right
      ])
    } else {
      const newLeft = prevCardIndex - 1 < 0 ? -1 : prevCardIndex - 1
      const newCenter = prevCardIndex
      const newRight = prevCardIndex + 1 >= totalCards ? -1 : prevCardIndex + 1

      setCardsInDisplay([newLeft, newCenter, newRight])
    }

    onCardChange?.(prevCardIndex)
  }, [currentCard, totalCards, cycle, flipHook, onCardChange])

  return {
    cycle,
    deckLength,
    currentCard,
    flipHook,
    prevCard,
    nextCard,
    canGoPrev,
    canGoNext,
    cardsInDisplay,
    showCount,
    showControls,
    showProgressBar,
    progressBar: {
      current: currentCard + 1,
      total: totalCards,
      percentage: totalCards > 0 ? Math.round(((currentCard + 1) / totalCards) * 100) : 0,
    },
    setCurrentCard: useCallback(
      (index: number) => {
        const newIndex = cycle
          ? ((index % totalCards) + totalCards) % totalCards
          : Math.max(0, Math.min(index, totalCards - 1))

        console.log(`Setting current card to index: ${newIndex}`)
        setCurrentCard(newIndex)

        // Update cards in display for direct navigation
        if (cycle) {
          setCardsInDisplay([
            (newIndex - 1 + totalCards) % totalCards,
            newIndex,
            (newIndex + 1) % totalCards,
          ])
        } else {
          const newLeft = newIndex - 1 < 0 ? -1 : newIndex - 1
          const newCenter = newIndex
          const newRight = newIndex + 1 >= totalCards ? -1 : newIndex + 1

          setCardsInDisplay([newLeft, newCenter, newRight])
        }
      },
      [cycle, totalCards]
    ),
  }
}
