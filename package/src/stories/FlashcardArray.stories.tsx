import type { Story } from '@ladle/react'
import './styles.scss'
import { FlashcardArray } from '../main'
import { useFlashcardArray } from '../hooks/useFlashcardArray'
import { Fragment } from 'react/jsx-runtime'
import { useState, type CSSProperties } from 'react'

const deck = {
  id: 'nsh19mt',
  title: 'First Deck',
  author: 'Santhosh',
  description: 'This is the first deck',
  cards: [
    {
      id: 1,
      front: {
        html: (
          <p>
            What is the <u>capital</u> of Alaska?
          </p>
        ),
        style: { color: 'blue' },
      },
      back: { html: <>Juneau</>, style: { color: 'green' } },
      options: ['Juneau', 'Anchorage', 'Fairbanks'],
    },
    {
      id: 2,
      front: { html: <>What is the capital of California?</>, style: { color: 'blue' } },
      back: { html: <>Sacramento</>, style: { color: 'green' } },
      options: ['Sacramento', 'Los Angeles', 'San Francisco'],
    },
    {
      id: 3,
      front: { html: <>What is the capital of New York?</>, style: { color: 'blue' } },
      back: { html: <>Albany</>, style: { color: 'green' } },
      options: ['Albany', 'New York', 'Buffalo'],
    },
    {
      id: 4,
      front: { html: <>What is the capital of Florida?</>, style: { color: 'blue' } },
      back: { html: <>Tallahassee</>, style: { color: 'green' } },
      options: ['Tallahassee', 'Orlando', 'Jacksonville'],
    },
    {
      id: 5,
      front: { html: <>What is the capital of Texas?</>, style: { color: 'blue' } },
      back: { html: <>Austin</>, style: { color: 'green' } },
      options: ['Austin', 'Houston', 'San Antonio'],
    },
    {
      id: 6,
      front: { html: <>What is the capital of New Mexico?</>, style: { color: 'blue' } },
      back: { html: <>Santa Fe</>, style: { color: 'green' } },
      options: ['Santa Fe', 'Albuquerque', 'Las Cruces'],
    },
    {
      id: 7,
      front: { html: <>What is the capital of Arizona?</>, style: { color: 'blue' } },
      back: { html: <>Phoenix</>, style: { color: 'green' } },
      options: ['Phoenix', 'Tucson', 'Mesa'],
    },
  ],
}

export const BasicFlashcardArray: Story = () => {
  const [cycle, setCycle] = useState(false)

  const flipArrayHook = useFlashcardArray({
    cycle: cycle,
    deckLength: deck.cards.length,
  })

  return (
    <Fragment>
      <FlashcardArray
        flipArrayHook={flipArrayHook}
        deck={deck.cards.map((card) => ({
          id: card.id,
          front: card.front,
          back: card.back,
        }))}
      />
      <button
        className='CrispButton'
        onClick={() => setCycle(!cycle)}
      >
        {cycle ? 'Disable Cycle' : 'Enable Cycle'}
      </button>
    </Fragment>
  )
}

export const CustomArrowColors: Story = () => {
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.cards.length,
  })

  return (
    <FlashcardArray
      style={
        {
          '--prev-arrow-color': '#2ec140',
          '--next-arrow-color': '#2ec140',
          '--disabled-arrow-color': '#c3a3e6',
        } as CSSProperties
      }
      flipArrayHook={flipArrayHook}
      deck={deck.cards.map((card) => ({
        id: card.id,
        front: card.front,
        back: card.back,
      }))}
    />
  )
}

export const CustomArrowColorsWithState: Story = () => {
  const [arrowColor, setArrowColor] = useState('#2ec140')
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.cards.length,
  })
  
  return (
    <div>
      <FlashcardArray
        deck={deck.cards.map((card) => ({
          id: card.id,
          front: card.front,
          back: card.back,
        }))}
        flipArrayHook={flipArrayHook}
        style={
          {
            '--prev-arrow-color': arrowColor,
            '--next-arrow-color': arrowColor,
            '--disabled-arrow-color': '#c3a3e6',
          } as CSSProperties
        }
      />
      <input
        type='color'
        value={arrowColor}
        onChange={(e) => setArrowColor(e.target.value)}
      />
    </div>
  )
}