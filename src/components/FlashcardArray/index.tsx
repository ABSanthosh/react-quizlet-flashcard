import './style.scss'
import type { CSSProperties } from 'react'
import { useFlashcardArray, type UseFlashcardArray } from '../../hooks/useFlashcardArray'
import Flashcard from '../Flashcard'
import type { IFlashcard } from '../Flashcard/types'

export interface FlashcardArrayProps {
  flipArrayHook?: UseFlashcardArray
  deck: IFlashcard[]
  style?: CSSProperties
}

export default function FlashcardArray({ flipArrayHook, deck, style }: FlashcardArrayProps) {
  const localFlipArrayHook =
    flipArrayHook ||
    useFlashcardArray({
      deck: deck,
    })

  return (
    <div
      className='flashcard-array-wrapper'
      style={style}
    >
      <div className='flashcard-array'>
        <Flashcard
          key={localFlipArrayHook.currentCard} // Force re-render to trigger animation
          flipHook={localFlipArrayHook.flipHook}
          back={deck[localFlipArrayHook.currentCard].back}
          front={deck[localFlipArrayHook.currentCard].front}
          style={deck[localFlipArrayHook.currentCard].style}
          className={deck[localFlipArrayHook.currentCard].className}
          manualFlip={localFlipArrayHook.flipHook?.disableFlip || false}
        />
      </div>
      <div className='flashcard-array__controls'>
        <button
          className='CrispButton'
          onClick={() => localFlipArrayHook.prevCard()}
          disabled={localFlipArrayHook.currentCard === 0 && !localFlipArrayHook.cycle}
        >
          Previous
        </button>
        <span>
          {localFlipArrayHook.currentCard + 1}/{deck.length}
        </span>
        <button
          className='CrispButton'
          onClick={() => localFlipArrayHook.nextCard()}
          disabled={localFlipArrayHook.currentCard === deck.length - 1 && !localFlipArrayHook.cycle}
        >
          Next
        </button>
      </div>
    </div>
  )
}
