import type { CSSProperties } from 'react'
import type { IFlashcard } from '../Flashcard/types'
import type { UseFlashcardArray } from '../../hooks/useFlashcardArray'

export interface FlashcardArrayProps {
  deck: IFlashcard[]
  className?: string
  style?: CSSProperties
  flipArrayHook?: UseFlashcardArray
}
