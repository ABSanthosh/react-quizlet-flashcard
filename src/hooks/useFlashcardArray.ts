import { useEffect, useState } from 'react'
import { useFlashcard, type UseFlashcard, type UseFlashcardProps } from './useFlashcard'
import type { IFlashcard, FlipState } from '../components/Flashcard/types'

export interface UseFlashcardArray {
  cycle?: boolean
  currentCard: number
  prevCard: () => void
  nextCard: () => void
  flipHook: UseFlashcard
  cardsInDisplay: number[]
  setCurrentCard: (index: number) => void
}

export interface FlashcardArrayProps extends Omit<UseFlashcardProps, 'onFlip'> {
  cycle?: boolean
  deck: IFlashcard[]
  onCardChange?: (cardIndex: number) => void
  onFlip?: (cardIndex: number, state: FlipState) => void
}

export function useFlashcardArray({
  cycle = false,
  deck,
  onFlip,
  manualFlip,
  disableFlip,
  flipDirection,
  onCardChange,
}: FlashcardArrayProps): UseFlashcardArray {
  const [currentCard, setCurrentCard] = useState<number>(0)
  const [cardsInDisplay, setCardsInDisplay] = useState<number[]>(
    !cycle ? [-1, 0, 1] : [deck.length - 1, 0, 1]
  )

  const totalCards = deck.length

  const flipHook = useFlashcard({
    onFlip: (state) => {
      onFlip?.(currentCard, state)
    },
    manualFlip,
    disableFlip,
    flipDirection,
  })

  const nextCard = () => {
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
  }

  const prevCard = () => {
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
  }

  return {
    cycle,
    currentCard,
    flipHook,
    prevCard,
    nextCard,
    cardsInDisplay,
    setCurrentCard: (index: number) => {
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
  }
}
