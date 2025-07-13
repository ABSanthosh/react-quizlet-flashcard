import type { Story } from '@ladle/react'
import Flashcard from '../components/Flashcard'
import './styles.scss'
import { Fragment } from 'react/jsx-runtime'
import { FlipState, useFlashcard } from '../hooks/useFlashcard'

// Basic Flashcard
export const BasicFlashcard: Story = () => {
  const flipHook = useFlashcard({
    onFlip: (newState: FlipState) => {
      console.log(`Card flipped to: ${newState}`) // Example callback action
    },
  })

  return (
    <Fragment>
      <Flashcard
        flipHook={flipHook}
        back={{ html: <div>Back Content</div> }}
        front={{ html: <div>Front Content</div> }}
      />
      <button
        onClick={() => {
          flipHook.flip()
        }}
      >
        Flip Card ({flipHook.state})
      </button>
    </Fragment>
  )
}

// Manual Flip
// export const ManualFlip: Story = () => {
//   const flashcardRef = useRef<{ flip: () => void }>(null)

//   return (
//     <>
//       <Flashcard
//         ref={flashcardRef}
//         frontHTML='Front Content'
//         backHTML='Back Content'
//         onCardFlip={(isFlipped) => console.log('Flipped:', isFlipped)}
//       />
//       <button
//         onClick={() => {
//           flashcardRef.current?.flip()
//         }}
//       >
//         Flip Card
//       </button>
//     </>
//   )
// }
// Custom Styles

// Card flip callback

// Custom Card size
