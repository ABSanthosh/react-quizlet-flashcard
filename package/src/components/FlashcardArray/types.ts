import type { CSSProperties } from 'react'
import type { UseFlashcardArray } from '../../hooks/useFlashcardArray'
import type { IFlashcard } from '../Flashcard/types'

export interface FlashcardArrayProps {
  flipArrayHook?: UseFlashcardArray
  deck: IFlashcard[]
  style?: CSSProperties
}
