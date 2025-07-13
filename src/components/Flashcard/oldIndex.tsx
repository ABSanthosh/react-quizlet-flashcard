import { useState } from 'react'
import './style.scss'
import type FlashcardProps from './types'

// -[x] change class name flip to data attribute
// -[ ] why is there border radius a separate prop?
// -[ ] there are so many styles. Maybe we could make it a single style prop

export default function Flashcard({
  frontHTML,
  frontCardStyle,
  frontContentStyle,
  backHTML,
  backCardStyle,
  backContentStyle,
  className = '',
  style,
  height,
  borderRadius = '1rem',
  width,
  onCardFlip = () => {},
  manualFlipRef = { current: null },
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  function onManualFlip() {
    setIsFlipped(!isFlipped)
    onCardFlip(!isFlipped)
  }

  if (manualFlipRef.current !== null) {
    manualFlipRef.current = onManualFlip
  }

  return (
    <div
      className={`FlashcardWrapper ${className}`}
      style={{
        height: height,
        width: width,
        ...style,
      }}
    >
      <div
        className={`FlashcardWrapper__item ${isFlipped ? 'FlashcardWrapper__item--flip' : ''}`}
        // TODO: change class name flip to data attribute
        data-flip={isFlipped}
        style={{
          borderRadius: borderRadius,
        }}
        onClick={() => {
          if (manualFlipRef.current) return
          setIsFlipped(!isFlipped)
          onCardFlip(!isFlipped)
        }}
      >
        <div
          className='FlashcardWrapper__item--front'
          style={{
            ...frontCardStyle,
            cursor: manualFlipRef.current ? 'default' : 'pointer',
          }}
        >
          {typeof frontHTML !== 'string' ? (
            <div
              className='FlashcardWrapper__item--content'
              style={frontContentStyle}
            >
              {frontHTML}
            </div>
          ) : (
            <div
              className='FlashcardWrapper__item--content'
              dangerouslySetInnerHTML={{ __html: frontHTML }}
              style={frontContentStyle}
            />
          )}
        </div>
        <div
          className='FlashcardWrapper__item--back'
          style={{
            ...backCardStyle,
            cursor: manualFlipRef.current ? 'default' : 'pointer',
          }}
        >
          {typeof backHTML !== 'string' ? (
            <div
              className='FlashcardWrapper__item--content'
              style={backContentStyle}
            >
              {backHTML}
            </div>
          ) : (
            <div
              className='FlashcardWrapper__item--content'
              dangerouslySetInnerHTML={{ __html: backHTML }}
              style={backContentStyle}
            />
          )}
        </div>
      </div>
    </div>
  )
}
