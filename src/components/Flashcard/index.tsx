import { useEffect, useState } from 'react'

import './style.scss'
import { FlipState, type FlashcardProps } from './types'
import { useFlashcard } from '../../hooks/useFlashcard'

/**
 * We're basically moving the content style and card style to userland.
 */

export default function Flashcard({
  style,
  flipHook,
  className,
  front,
  back,
  ...restProps
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(flipHook ? flipHook.state === FlipState.Back : false)
  const localFlipHook =
    flipHook ||
    useFlashcard({
      onFlip: (state) => {
        setIsFlipped(state === FlipState.Back)
      },
    })

  useEffect(() => {
    if (flipHook) {
      setIsFlipped(flipHook.state === FlipState.Back)
    }
  }, [flipHook?.state])

  return (
    <div
      style={style}
      {...restProps}
      className='flashcard-wrapper'
    >
      <div
        className={['flashcard', className].filter(Boolean).join(' ')}
        data-flip={isFlipped}
        data-dir={localFlipHook?.flipDirection || 'bt'}
        role='region'
        aria-label={`Flashcard, currently showing ${isFlipped ? 'back' : 'front'} side`}
        aria-live='polite'
        tabIndex={0}
        onClick={() => {
          if (localFlipHook?.manualFlip) return
          if (localFlipHook.disableFlip) return
          localFlipHook.flip()
        }}
      >
        <div
          className='flashcard__front'
          data-flip-type={
            localFlipHook?.disableFlip ? 'disable' : localFlipHook?.manualFlip ? 'manual' : 'auto'
          }
          style={front.style}
          aria-hidden={isFlipped}
          role='contentinfo'
        >
          {front.html}
        </div>
        <div
          className='flashcard__back'
          data-flip-type={
            localFlipHook?.disableFlip ? 'disable' : localFlipHook?.manualFlip ? 'manual' : 'auto'
          }
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
