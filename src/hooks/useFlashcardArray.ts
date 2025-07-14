import { useState } from 'react'
import { useFlashcard, type UseFlashcardProps } from './useFlashcard'
import type { IFlashcard, FlipState, UseFlashcard } from '../components/Flashcard/types'

export interface UseFlashcardArray {
  cycle?: boolean
  currentCard: number
  prevCard: () => void
  nextCard: () => void
  flipHook?: UseFlashcard
  setCurrentCard?: (index: number) => void
  onFlip?: (cardIndex: number, state: FlipState) => void
}

export interface FlashcardArrayProps extends Omit<UseFlashcardProps, 'onFlip'> {
  cycle?: boolean
  deck: IFlashcard[]
  onFlip?: (cardIndex: number, state: FlipState) => void
}

export function useFlashcardArray({
  cycle = false,
  deck,
  onFlip,
  disableFlip,
  flipDirection,
}: FlashcardArrayProps): UseFlashcardArray {
  const [currentCard, setCurrentCard] = useState<number>(0)
  const totalCards = deck.length

  const flipHook = useFlashcard({
    onFlip: (state) => {
      onFlip?.(currentCard, state)
    },
    disableFlip,
    flipDirection,
  })

  const prevCard = () => {
    setCurrentCard((prev) => (cycle ? (prev - 1 + totalCards) % totalCards : Math.max(prev - 1, 0)))
  }

  const nextCard = () => {
    setCurrentCard((prev) => (cycle ? (prev + 1) % totalCards : Math.min(prev + 1, totalCards - 1)))
  }

  return {
    cycle,
    currentCard,
    flipHook,
    prevCard,
    nextCard,
    setCurrentCard: (index: number) => {
      const newIndex = cycle
        ? ((index % totalCards) + totalCards) % totalCards
        : Math.max(0, Math.min(index, totalCards - 1))
      console.log(`Setting current card to index: ${newIndex}`)
      setCurrentCard(newIndex)
    },
  }
}
