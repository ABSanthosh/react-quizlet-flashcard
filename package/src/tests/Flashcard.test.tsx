import { render, screen, fireEvent, act, renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Flashcard from '../components/Flashcard/index'
import { useFlashcard } from '../hooks/useFlashcard'

describe('<Flashcard />', () => {
  const frontContent = <div>Front Side</div>
  const backContent = <div>Back Side</div>

  it('should render the front content by default', () => {
    render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
      />
    )
    expect(screen.getByText('Front Side')).toBeInTheDocument()

    expect(screen.getByText('Front Side').closest('.flashcard__front')).toHaveAttribute(
      'aria-hidden',
      'false'
    )
    expect(screen.getByText('Back Side').closest('.flashcard__back')).toHaveAttribute(
      'aria-hidden',
      'false'
    )
  })

  it('should flip when clicked (uncontrolled)', () => {
    render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
      />
    )
    const flashcard = screen.getByRole('region')
    expect(flashcard).toHaveAttribute('data-flip', 'false')

    fireEvent.click(flashcard)

    expect(flashcard).toHaveAttribute('data-flip', 'true')
  })

  it('should update aria-label on flip', () => {
    render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
      />
    )
    const flashcard = screen.getByRole('region')
    expect(flashcard).toHaveAttribute('aria-label', 'Flashcard, currently showing front side')

    fireEvent.click(flashcard)

    expect(flashcard).toHaveAttribute('aria-label', 'Flashcard, currently showing back side')
  })

  it('should sync with an external flipHook', () => {
    const { result } = renderHook(() => useFlashcard({}))
    const { rerender } = render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
        flipHook={result.current}
      />
    )
    const flashcard = screen.getByRole('region')
    expect(flashcard).toHaveAttribute('data-flip', 'false')

    act(() => {
      result.current.flip()
    })

    rerender(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
        flipHook={result.current}
      />
    )

    expect(flashcard).toHaveAttribute('data-flip', 'true')
  })

  it('should call the external flipHook.flip on click', () => {
    const { result } = renderHook(() => useFlashcard({}))
    const flipSpy = vi.spyOn(result.current, 'flip')

    render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
        flipHook={result.current}
      />
    )

    fireEvent.click(screen.getByRole('region'))
    expect(flipSpy).toHaveBeenCalledOnce()
  })

  it('should not flip on click when disableFlip is true', () => {
    const { result } = renderHook(() => useFlashcard({ disableFlip: true }))
    const flipSpy = vi.spyOn(result.current, 'flip')

    render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
        flipHook={result.current}
      />
    )
    const flashcard = screen.getByRole('region')
    fireEvent.click(flashcard)

    // CORRECTED: The component's onClick has `if (localFlipHook.disableFlip) return`,
    // so the hook's flip function is never called.
    expect(flipSpy).not.toHaveBeenCalled()
    expect(flashcard).toHaveAttribute('data-flip', 'false')
  })

  it('should not flip on click when manualFlip is true', () => {
    const { result } = renderHook(() => useFlashcard({ manualFlip: true }))
    const flipSpy = vi.spyOn(result.current, 'flip')

    render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
        flipHook={result.current}
      />
    )

    const flashcard = screen.getByRole('region')
    fireEvent.click(flashcard)

    expect(flipSpy).not.toHaveBeenCalled()
    expect(flashcard).toHaveAttribute('data-flip', 'false')
  })

  it('should apply custom className and style', () => {
    const customStyle = { border: '1px solid red' }
    render(
      <Flashcard
        front={{ html: frontContent }}
        back={{ html: backContent }}
        className='custom-class'
        style={customStyle}
      />
    )

    const flashcardWrapper = screen.getByRole('region').parentElement
    const flashcard = screen.getByRole('region')

    expect(flashcardWrapper).toHaveStyle('border: 1px solid red')
    expect(flashcard).toHaveClass('custom-class')
  })
})
