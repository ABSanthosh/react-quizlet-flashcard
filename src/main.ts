import './components/Flashcard/style.scss'
import './components/FlashcardArray/style.scss'

import Flashcard from './components/Flashcard'
import FlashcardArray from './components/FlashcardArray'
import { useFlashcard } from './hooks/useFlashcard'
import { useFlashcardArray } from './hooks/useFlashcardArray'

import type {
  FlashcardProps,
  FlipDirection,
  FlipState,
  IFlashcard,
} from './components/Flashcard/types'
import type { FlashcardArrayProps } from './components/FlashcardArray/types'
import type { UseFlashcardArrayProps, UseFlashcardArray } from './hooks/useFlashcardArray'

export {
  Flashcard,
  FlashcardArray,
  useFlashcard,
  useFlashcardArray,
  type FlashcardProps,
  type FlashcardArrayProps,
  type FlipDirection,
  type FlipState,
  type IFlashcard,
  type UseFlashcardArrayProps,
  type UseFlashcardArray,
}
