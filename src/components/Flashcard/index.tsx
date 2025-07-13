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
        onClick={() => {
          if (manualFlip) return
          if (flipHook) {
            flipHook.flip()
          } else {
            setIsFlipped(!isFlipped)
          }
        }}
      >
        <div
          className='flashcard__front'
          data-manual-flip={manualFlip}
        >
          {front.html}
        </div>
        <div
          className='flashcard__back'
          data-manual-flip={manualFlip}
        >
          {back.html}
        </div>
      </div>
    </div>
  )
}
