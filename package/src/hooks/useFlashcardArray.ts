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
  addCard: (index?: number) => void
  deleteCard: (index: number) => void
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

  // Adjust currentCard if it's out of bounds after deckLength changes
  useEffect(() => {
    if (deckLength === 0 && currentCard !== 0) {
      setCurrentCard(0)
      return
    }

    if (currentCard >= deckLength && deckLength > 0) {
      setCurrentCard(deckLength - 1)
    }
  }, [deckLength, currentCard])

  // Update cardsInDisplay when cycle or deckLength changes
  useEffect(() => {
    if (cycle) {
      if (deckLength === 0) {
        setCardsInDisplay([-1, 0, -1]) // Handle empty deck case
        return
      }
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
    if (!canGoNext) return
    const nextCardIndex = cycle
      ? (currentCard + 1) % totalCards
      : Math.min(currentCard + 1, totalCards - 1)

    flipHook.resetCardState()
    setCurrentCard(nextCardIndex)
    onCardChange?.(nextCardIndex)
  }, [currentCard, totalCards, cycle, flipHook, onCardChange, canGoNext])

  const prevCard = useCallback(() => {
    if (!canGoPrev) return
    const prevCardIndex = cycle
      ? (currentCard - 1 + totalCards) % totalCards
      : Math.max(currentCard - 1, 0)

    flipHook.resetCardState()
    setCurrentCard(prevCardIndex)
    onCardChange?.(prevCardIndex)
  }, [currentCard, totalCards, cycle, flipHook, onCardChange, canGoPrev])

  const deleteCard = useCallback(
    (indexToDelete: number) => {
      if (indexToDelete < 0 || indexToDelete >= deckLength) {
        console.warn(`Cannot delete card at index ${indexToDelete}: index out of bounds.`)
        return
      }

      if (currentCard > indexToDelete) {
        setCurrentCard((c) => c - 1)
      } else if (currentCard === indexToDelete && currentCard === deckLength - 1 && currentCard > 0) {
        setCurrentCard((c) => c - 1)
      }
    },
    [currentCard, deckLength]
  )

  const addCard = useCallback(
    (indexToAddAt?: number) => {
      const addIndex = indexToAddAt === undefined ? deckLength : indexToAddAt
      if (addIndex < 0 || addIndex > deckLength) {
        console.warn(`Cannot add card at index ${addIndex}: index out of bounds.`)
        return
      }
      if (currentCard >= addIndex && deckLength > 0) {
        setCurrentCard((c) => c + 1)
      }
    },
    [currentCard, deckLength]
  )

  return {
    cycle,
    deckLength,
    currentCard,
    flipHook,
    prevCard,
    nextCard,
    addCard,
    deleteCard,
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
        if (deckLength === 0) {
          setCurrentCard(0)
          return
        }
        const newIndex = cycle
          ? ((index % totalCards) + totalCards) % totalCards
          : Math.max(0, Math.min(index, totalCards - 1))

        setCurrentCard(newIndex)
      },
      [cycle, totalCards, deckLength]
    ),
  }
}