'use client'

import './style.scss'
import { useFlashcardArray } from '../../hooks/useFlashcardArray'
import Flashcard from '../Flashcard'
import type { FlashcardArrayProps } from './types'

export default function FlashcardArray({
  deck,
  style,
  className,
  flipArrayHook,
}: FlashcardArrayProps) {
  const tempFlipArrayHook = useFlashcardArray({
    deckLength: deck.length,
  })
  const localFlipArrayHook = flipArrayHook || tempFlipArrayHook

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
      className={['flashcard-array-wrapper', className].filter(Boolean).join(' ')}
      style={style}
    >
      <div
        className='flashcard-array'
        role='region'
        aria-label={`Flashcard ${localFlipArrayHook.currentCard + 1} of ${
          localFlipArrayHook.deckLength
        }`}
        aria-live='polite'
      >
        {SiblingCard(localFlipArrayHook.cardsInDisplay[0])}
        <Flashcard
          flipHook={localFlipArrayHook.flipHook}
          key={localFlipArrayHook.cardsInDisplay[1]}
          back={deck[localFlipArrayHook.cardsInDisplay[1]].back}
          front={deck[localFlipArrayHook.cardsInDisplay[1]].front}
          style={deck[localFlipArrayHook.cardsInDisplay[1]].style}
          className={deck[localFlipArrayHook.cardsInDisplay[1]].className}
        />
        {SiblingCard(localFlipArrayHook.cardsInDisplay[2])}
      </div>

      {localFlipArrayHook.showProgressBar && (
        <div className='flashcard-array__progress-bar'>
          <div
            className='flashcard-array__progress-bar-fill'
            style={{ width: `${localFlipArrayHook.progressBar.percentage}%` }}
          />
        </div>
      )}
      {(localFlipArrayHook.showControls || localFlipArrayHook.showCount) && (
        <div className='flashcard-array__controls'>
          {localFlipArrayHook.showControls && (
            <button
              onClick={() => localFlipArrayHook.prevCard()}
              disabled={!localFlipArrayHook.canGoPrev}
              aria-label='Previous card'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                style={{ height: '24px', width: '24px' }}
              >
                <path
                  d='M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z'
                  data-name='Left'
                />
              </svg>
            </button>
          )}
          {localFlipArrayHook.showCount && (
            <span className='flashcard-array__controls--count'>
              {localFlipArrayHook.currentCard + 1}/{deck.length}
            </span>
          )}
          {localFlipArrayHook.showControls && (
            <button
              onClick={() => localFlipArrayHook.nextCard()}
              disabled={!localFlipArrayHook.canGoNext}
              aria-label='Next card'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                style={{ height: '24px', width: '24px' }}
              >
                <path
                  d='m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z'
                  data-name='Right'
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
