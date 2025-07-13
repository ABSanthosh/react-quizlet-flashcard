import type { CSSProperties, ReactElement } from 'react'

export interface FlashcardProps {
  className?: string
  manualFlip?: boolean
  style?: CSSProperties
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

export enum FlipState {
  Front = 'front',
  Back = 'back',
}

// right-to-left
// left-to-right
// top-to-bottom
// bottom-to-top
export type FlipDirection = 'rtl' | 'ltr' | 'tb' | 'bt'

export interface UseFlashcard {
  state: FlipState
  disableFlip?: boolean
  flipDirection: FlipDirection
  flip: (state?: FlipState) => void
  onFlip?: (state: FlipState) => void
}
