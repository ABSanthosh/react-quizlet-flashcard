import type { Story } from '@ladle/react'
import Flashcard from '../components/Flashcard'
import './styles.scss'
import { Fragment } from 'react/jsx-runtime'
import { FlipState, useFlashcard, type FlipDirection } from '../hooks/useFlashcard'
import { useState } from 'react'

// Basic Flashcard
export const BasicFlashcard: Story = () => {
  const [dir, setDir] = useState<FlipDirection>('bt')

  const flipHook = useFlashcard({
    onFlip: (newState: FlipState) => {
      console.log(`Card flipped to: ${newState}`) // Example callback action
    },
    flipDirection: dir,
  })

  return (
    <Fragment>
      <select
        name='flipDirection'
        id='flipDirection'
        value={dir}
        onChange={(e) => setDir(e.target.value as FlipDirection)}
      >
        <option value='bt'>Bottom to Top</option>
        <option value='tb'>Top to Bottom</option>
        <option value='ltr'>Left to Right</option>
        <option value='rtl'>Right to Left</option>
      </select>
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
