import type { CSSProperties, ReactElement } from 'react'
import type { UseFlashcard } from '../../hooks/useFlashcard'

export interface FlashcardProps extends IFlashcard {
  manualFlip?: boolean
  flipHook?: UseFlashcard
}

export interface IFlashcard {
  className?: string
  style?: CSSProperties
  front: {
    html: ReactElement
    style?: CSSProperties
  }
  back: {
    html: ReactElement
    style?: CSSProperties
  }
}

export type FlipState = 'front' | 'back'

// right-to-left
// left-to-right
// top-to-bottom
// bottom-to-top
export type FlipDirection = 'rtl' | 'ltr' | 'tb' | 'bt'
