import './style.scss'
import { useEffect, useState } from 'react'
import { useFlashcard } from '../../hooks/useFlashcard'
import { FlipState, type FlashcardProps } from './types'

export default function Flashcard({
  style,
  flipHook,
  className,
  front,
  back,
  ...restProps
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(flipHook ? flipHook.state === FlipState.Back : false)

  const defaultFlipHook = useFlashcard({
    onFlip: (state) => {
      setIsFlipped(state === FlipState.Back)
    },
  })

  const localFlipHook = flipHook || defaultFlipHook

  useEffect(() => {
    if (localFlipHook) {
      setIsFlipped(localFlipHook.state === FlipState.Back)
    }
  }, [localFlipHook])

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
