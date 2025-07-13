import { useEffect, useState, type CSSProperties, type ReactElement } from 'react'

import './style.scss'
import { FlipState, type UseFlashcard } from '../../hooks/useFlashcard'

/**
 * We're basically moving the content style and card style to userland.
 *
 */

export interface FlashcardProps {
  className?: string
  manualFlip?: boolean
  flipHook?: UseFlashcard
  front: {
    html: ReactElement
    style?: CSSProperties
  }
  back: {
    html: ReactElement
    style?: CSSProperties
  }
}

export default function Flashcard({
  flipHook,
  manualFlip,
  className,
  front,
  back,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(flipHook ? flipHook.state === FlipState.Back : false)

  useEffect(() => {
    if (flipHook) {
      setIsFlipped(flipHook.state === FlipState.Back)
    }
  }, [flipHook?.state])

  return (
    <div className='flashcard-wrapper'>
      <div
        className={['flashcard', className].filter(Boolean).join(' ')}
        data-flip={isFlipped}
        data-dir={flipHook?.flipDirection}
        role='region'
        aria-label={`Flashcard, currently showing ${isFlipped ? 'back' : 'front'} side`}
        aria-live='polite'
        tabIndex={0}
        onClick={() => {
          if (manualFlip) return
          if (flipHook) {
            if (flipHook.disableFlip) return
            flipHook.flip()
          } else {
            setIsFlipped(!isFlipped)
          }
        }}
      >
        <div
          className='flashcard__front'
          data-flip-type={flipHook?.disableFlip ? 'disable' : manualFlip ? 'manual' : 'auto'}
        >
          {front.html}
        </div>
        <div
          className='flashcard__back'
          data-flip-type={flipHook?.disableFlip ? 'disable' : manualFlip ? 'manual' : 'auto'}
        >
          {back.html}
        </div>
      </div>
    </div>
  )
}
