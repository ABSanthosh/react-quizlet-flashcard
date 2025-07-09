import type { Story } from '@ladle/react'
import Flashcard from '../components/Flashcard'
import './styles.scss'
import { useRef } from 'react'

// Basic Flashcard
export const BasicFlashcard: Story = () => (
  <Flashcard
    frontHTML='<h1>Front</h1>'
    backHTML={<h1>Back</h1>}
  />
)

// Manual Flip
export const ManualFlip: Story = () => {
  // const flipRef = useRef(null)

  // return (
  //   <div className='storyContainer'>
  //     <Flashcard
  //       frontHTML='<h1>Front</h1>'
  //       backHTML={<h1>Back</h1>}
  //       manualFlipRef={flipRef}
  //     />
  //     <button onClick={() => flipRef.current()}>Flip</button>
  //   </div>
  // )
}
// Custom Styles

// Card flip callback

// Custom Card size
