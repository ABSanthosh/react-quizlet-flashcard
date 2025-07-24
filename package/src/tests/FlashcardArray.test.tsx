import { render, screen, fireEvent, act, renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FlashcardArray from '../components/FlashcardArray/index'
import { useFlashcardArray } from '../hooks/useFlashcardArray'
import type { IFlashcard } from '../components/Flashcard/types'

const mockDeck: IFlashcard[] = [
  { front: { html: <div>Card 1 Front</div> }, back: { html: <div>Card 1 Back</div> } },
  { front: { html: <div>Card 2 Front</div> }, back: { html: <div>Card 2 Back</div> } },
  { front: { html: <div>Card 3 Front</div> }, back: { html: <div>Card 3 Back</div> } },
]

// Helper to query for the navigation buttons using their accessible name.
const getPrevButton = () => screen.getByRole('button', { name: /Previous Card/i })
const getNextButton = () => screen.getByRole('button', { name: /Next Card/i })

describe('<FlashcardArray />', () => {
  describe('with default behavior (uncontrolled)', () => {
    it('should render the first card by default', () => {
      render(<FlashcardArray deck={mockDeck} />)
      expect(screen.getByText('Card 1 Front')).toBeInTheDocument()
      expect(screen.queryByText('Card 2 Front')).not.toBeInTheDocument()
      expect(screen.getByText('1/3')).toBeInTheDocument()
    })

    it('should navigate to the next card on "next" button click', () => {
      render(<FlashcardArray deck={mockDeck} />)
      fireEvent.click(getNextButton())
      expect(screen.getByText('Card 2 Front')).toBeInTheDocument()
      expect(screen.getByText('2/3')).toBeInTheDocument()
    })

    it('should navigate to the previous card on "prev" button click', () => {
      render(<FlashcardArray deck={mockDeck} />)
      fireEvent.click(getNextButton())
      expect(screen.getByText('Card 2 Front')).toBeInTheDocument()
      fireEvent.click(getPrevButton())
      expect(screen.getByText('Card 1 Front')).toBeInTheDocument()
      expect(screen.getByText('1/3')).toBeInTheDocument()
    })

    it('should disable the "prev" button on the first card', () => {
      render(<FlashcardArray deck={mockDeck} />)
      expect(getPrevButton()).toBeDisabled()
    })

    it('should disable the "next" button on the last card', () => {
      render(<FlashcardArray deck={mockDeck} />)
      fireEvent.click(getNextButton()) // -> Card 2
      fireEvent.click(getNextButton()) // -> Card 3
      expect(getNextButton()).toBeDisabled()
    })
  })

  describe('with an external flipArrayHook (controlled)', () => {
    it('should update view when external hook changes card', () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: mockDeck.length }))
      const { rerender } = render(
        <FlashcardArray
          deck={mockDeck}
          flipArrayHook={result.current}
        />
      )

      act(() => {
        result.current.nextCard()
      })

      rerender(
        <FlashcardArray
          deck={mockDeck}
          flipArrayHook={result.current}
        />
      )

      expect(screen.getByText('Card 2 Front')).toBeInTheDocument()
      expect(screen.getByText('2/3')).toBeInTheDocument()
    })

    it("should call the hook's nextCard function on click", () => {
      const { result } = renderHook(() => useFlashcardArray({ deckLength: mockDeck.length }))
      const nextCardSpy = vi.spyOn(result.current, 'nextCard')
      render(
        <FlashcardArray
          deck={mockDeck}
          flipArrayHook={result.current}
        />
      )

      fireEvent.click(getNextButton())
      expect(nextCardSpy).toHaveBeenCalledOnce()
    })
  })

  describe('UI conditional rendering', () => {
    it('should not render controls or count if hook props are false', () => {
      const { result } = renderHook(() =>
        useFlashcardArray({
          deckLength: mockDeck.length,
          showControls: false,
          showCount: false,
        })
      )
      render(
        <FlashcardArray
          deck={mockDeck}
          flipArrayHook={result.current}
        />
      )
      expect(screen.queryByRole('button', { name: /Next Card/i })).not.toBeInTheDocument()
      expect(screen.queryByText(/1\/3/)).not.toBeInTheDocument()
    })

    it('should render the progress bar when showProgressBar is true', () => {
      const { result } = renderHook(() =>
        useFlashcardArray({
          deckLength: mockDeck.length,
          showProgressBar: true,
        })
      )
      render(
        <FlashcardArray
          deck={mockDeck}
          flipArrayHook={result.current}
        />
      )
      const progressBarFill = document.querySelector('.flashcard-array__progress-bar-fill')
      expect(progressBarFill).toBeInTheDocument()
      // Initial percentage for 1/3 should be 33%
      expect(progressBarFill).toHaveStyle('width: 33%')
    })
  })
})
