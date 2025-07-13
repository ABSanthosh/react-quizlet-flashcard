import { useEffect, useState } from 'react'

import './style.scss'
import { FlipState, type FlashcardProps } from './types'

/**
 * We're basically moving the content style and card style to userland.
 */

export default function Flashcard({
  style,
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
    <div
      style={style}
      className='flashcard-wrapper'
    >
      <div
        className={['flashcard', className].filter(Boolean).join(' ')}
        data-flip={isFlipped}
        data-dir={flipHook?.flipDirection || 'bt'}
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
          style={front.style}
          aria-hidden={isFlipped}
          role='contentinfo'
        >
          {front.html}
        </div>
        <div
          className='flashcard__back'
          data-flip-type={flipHook?.disableFlip ? 'disable' : manualFlip ? 'manual' : 'auto'}
          style={back.style}
          aria-hidden={isFlipped}
          role='contentinfo'
        >
          {back.html}
        </div>
      </div>
    </div>
  )
}
