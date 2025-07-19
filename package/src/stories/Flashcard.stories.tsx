import type { Story } from '@ladle/react'
import Flashcard from '../components/Flashcard'
import { useFlashcard } from '../hooks/useFlashcard'
import './styles.scss'
import { Fragment } from 'react/jsx-runtime'
import { useState } from 'react'
import { type FlipState, type FlipDirection } from '../components/Flashcard/types'

// Basic Flashcard (already provided)
export const BasicFlashcard: Story = () => {
  return (
    <Flashcard
      back={{ html: <div>Back Content</div> }}
      front={{ html: <div>Front Content</div> }}
    />
  )
}

// Manual Flip
export const ManualFlip: Story = () => {
  const flipHook = useFlashcard({ manualFlip: true })
  return (
    <Fragment>
      <Flashcard
        manualFlip={true}
        flipHook={flipHook}
        back={{ html: <div>Back Content (I won't flip on click)</div> }}
        front={{ html: <div>Front Content (I won't flip on click)</div> }}
      />
      <button
        className='CrispButton'
        onClick={() => flipHook.flip()}
      >
        {`Click to flip to ${flipHook.state === 'front' ? 'back' : 'front'}`}
      </button>
    </Fragment>
  )
}

// Custom Styles
export const CustomStyles: Story = () => {
  return (
    <Flashcard
      back={{
        html: <div>Styled Back</div>,
        style: {
          backgroundColor: 'palevioletred',
          color: 'white',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      front={{
        html: (
          <Fragment>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              1
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              3
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              4
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              5
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              6
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              7
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              8
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              9
            </span>
          </Fragment>
        ),
        style: {
          backgroundColor: 'turquoise',
          color: 'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          fontSize: '2rem',
        },
      }}
      className='custom-flashcard'
    />
  )
}

// Card Flip Callback
export const CardFlipCallback: Story = () => {
  const flipHook = useFlashcard({
    onFlip: (state: FlipState) => {
      console.log(`Flipped to ${state}`)
    },
  })

  return (
    <Flashcard
      flipHook={flipHook}
      back={{ html: <div>Back Content (Check console for flip state)</div> }}
      front={{ html: <div>Front Content (Check console for flip state)</div> }}
    />
  )
}

// Custom Card Size
export const CustomCardSize: Story = () => {
  return (
    <Flashcard
      style={{ width: '300px', height: '300px' }}
      back={{ html: <div>Small Back Content</div> }}
      front={{ html: <div>Small Front Content</div> }}
    />
  )
}

// Disabled Flip
export const DisabledFlip: Story = () => {
  const [disabled, setDisabled] = useState(false)
  const flipHook = useFlashcard({
    disableFlip: disabled,
  })

  return (
    <Fragment>
      <Flashcard
        flipHook={flipHook}
        back={{ html: <div>Back Content (Flipping Disabled)</div> }}
        front={{ html: <div>Front Content (Flipping Disabled)</div> }}
      />
      <button
        className='CrispButton'
        onClick={() => setDisabled(!disabled)}
      >
        {disabled ? 'Enable Flip' : 'Disable Flip'}
      </button>
    </Fragment>
  )
}

// Different Flip Directions
export const FlipDirections: Story = () => {
  const [dir, setDir] = useState<FlipDirection>('bt') // Default to bottom-to-top
  const flipHook = useFlashcard({
    flipDirection: dir,
  })

  return (
    <Fragment>
      <Flashcard
        flipHook={flipHook}
        back={{ html: <div>Back Content (RTL Flip)</div> }}
        front={{ html: <div>Front Content (RTL Flip)</div> }}
      />
      <select
        className='CrispSelect'
        value={dir}
        onChange={(e) => setDir(e.target.value as FlipDirection)}
      >
        <option value='bt'>Bottom to Top</option>
        <option value='tb'>Top to Bottom</option>
        <option value='ltr'>Left to Right</option>
        <option value='rtl'>Right to Left</option>
      </select>
      <p style={{ marginTop: '10px' }}>
        Current Flip Direction: <strong>{dir}</strong>
      </p>
    </Fragment>
  )
}
