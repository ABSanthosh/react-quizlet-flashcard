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

  const SiblingCard = (key: string | number) => {
    return (
      <Flashcard
        key={key}
        back={{ html: <></> }}
        front={{ html: <></> }}
        className='flashcard__sibling'
      />
    )
  }

  return (
    <div
      className='flashcard-array-wrapper'
      style={style}
    >
      <div className='flashcard-array'>
        {SiblingCard(localFlipArrayHook.cardsInDisplay[0])}
        <Flashcard
          flipHook={localFlipArrayHook.flipHook}
          key={localFlipArrayHook.cardsInDisplay[1]}
          back={deck[localFlipArrayHook.cardsInDisplay[1]].back}
          front={deck[localFlipArrayHook.cardsInDisplay[1]].front}
          style={deck[localFlipArrayHook.cardsInDisplay[1]].style}
          manualFlip={localFlipArrayHook.flipHook?.disableFlip || false}
          className={deck[localFlipArrayHook.cardsInDisplay[1]].className}
        />
        {SiblingCard(localFlipArrayHook.cardsInDisplay[2])}
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
