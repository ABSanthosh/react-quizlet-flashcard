import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useFlashcardArray } from '../hooks/useFlashcardArray'

describe('useFlashcardArray', () => {
  describe('Initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 10 }))

      expect(result.current.currentCard).toBe(0)
      expect(result.current.deckLength).toBe(10)
      expect(result.current.cycle).toBe(false)
      expect(result.current.showControls).toBe(true)
      expect(result.current.showCount).toBe(true)
      expect(result.current.showProgressBar).toBe(false)
      expect(result.current.cardsInDisplay).toEqual([-1, 0, 1])
      // Test for new navigation state properties
      expect(result.current.canGoPrev).toBe(false)
      expect(result.current.canGoNext).toBe(true)
    })

    it('should initialize correctly when cycle is true', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 10, cycle: true }))

      expect(result.current.currentCard).toBe(0)
      // When cycling, the card to the "left" of the first card is the last card.
      expect(result.current.cardsInDisplay).toEqual([9, 0, 1])
      // When cycling, navigation should always be possible
      expect(result.current.canGoPrev).toBe(true)
      expect(result.current.canGoNext).toBe(true)
    })
  })

  describe('Navigation', () => {
    it('should go to the next card with nextCard()', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 5 }))

      act(() => {
        result.current.nextCard()
      })

      expect(result.current.currentCard).toBe(1)
      expect(result.current.cardsInDisplay).toEqual([0, 1, 2])
    })

    it('should go to the previous card with prevCard()', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 5 }))

      act(() => {
        result.current.nextCard() // Go to 1
      })
      act(() => {
        result.current.prevCard() // Go back to 0
      })

      expect(result.current.currentCard).toBe(0)
      expect(result.current.cardsInDisplay).toEqual([-1, 0, 1])
    })

    it('should not go past the last card if cycle is false', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 3 }))

      act(() => result.current.setCurrentCard(2)) // Go to last card
      expect(result.current.currentCard).toBe(2)
      expect(result.current.canGoNext).toBe(false)

      act(() => result.current.nextCard()) // Try to go further
      expect(result.current.currentCard).toBe(2) // Should not change
    })

    it('should not go before the first card if cycle is false', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 3 }))
      expect(result.current.currentCard).toBe(0)
      expect(result.current.canGoPrev).toBe(false)

      act(() => result.current.prevCard()) // Try to go back
      expect(result.current.currentCard).toBe(0) // Should not change
    })

    it('should cycle to the first card from the last when cycle is true', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 3, cycle: true }))
      act(() => result.current.setCurrentCard(2))

      act(() => result.current.nextCard())

      expect(result.current.currentCard).toBe(0)
      expect(result.current.cardsInDisplay).toEqual([2, 0, 1])
    })

    it('should cycle to the last card from the first when cycle is true', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 3, cycle: true }))

      act(() => result.current.prevCard())

      expect(result.current.currentCard).toBe(2)
      expect(result.current.cardsInDisplay).toEqual([1, 2, 0])
    })
  })

  describe('Direct Set and Callbacks', () => {
    it('should set the current card directly with setCurrentCard()', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 10 }))
      act(() => result.current.setCurrentCard(5))
      expect(result.current.currentCard).toBe(5)
      expect(result.current.cardsInDisplay).toEqual([4, 5, 6])
    })

    it('should limit out-of-bounds index in setCurrentCard() when not cycling', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 10 }))
      act(() => result.current.setCurrentCard(99))
      expect(result.current.currentCard).toBe(9) // Clamped to max
      act(() => result.current.setCurrentCard(-50))
      expect(result.current.currentCard).toBe(0) // Clamped to min
    })

    it('should call onCardChange when the card is changed', () => {
      const onCardChangeMock = vi.fn()
      const { result } = renderHook(() =>
        useFlashcardArray({ deckLength: 5, onCardChange: onCardChangeMock })
      )

      act(() => result.current.nextCard())
      expect(onCardChangeMock).toHaveBeenCalledOnce()
      expect(onCardChangeMock).toHaveBeenCalledWith(1)

      act(() => result.current.prevCard())
      expect(onCardChangeMock).toHaveBeenCalledTimes(2)
      expect(onCardChangeMock).toHaveBeenCalledWith(0)
    })

    it('should call onFlip with card index and flip state', () => {
      const onFlipMock = vi.fn()
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 5, onFlip: onFlipMock }))

      // Flip the first card (index 0)
      act(() => result.current.flipHook.flip())

      expect(onFlipMock).toHaveBeenCalledOnce()
      expect(onFlipMock).toHaveBeenCalledWith(0, 'back')
    })
  })

  describe('State Properties', () => {
    it('should calculate the progress bar percentage correctly', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 4 }))

      expect(result.current.progressBar.percentage).toBe(25) // Card 1 of 4

      act(() => result.current.nextCard())
      expect(result.current.progressBar.percentage).toBe(50) // Card 2 of 4

      act(() => result.current.nextCard())
      expect(result.current.progressBar.percentage).toBe(75) // Card 3 of 4

      act(() => result.current.nextCard())
      expect(result.current.progressBar.percentage).toBe(100) // Card 4 of 4
    })

    it('should handle zero deck length gracefully', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: 0 }))
      expect(result.current.progressBar.percentage).toBe(0)
      expect(result.current.currentCard).toBe(0)
      expect(result.current.cardsInDisplay).toEqual([-1, 0, -1])
    })
  })
})
