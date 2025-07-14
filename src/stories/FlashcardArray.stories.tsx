import type { Story } from '@ladle/react'
import './styles.scss'
import { FlashcardArray } from '../main'
import { useFlashcardArray } from '../hooks/useFlashcardArray'

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
  const flipArrayHook = useFlashcardArray({
    cycle: true,
    deck: deck.cards.map((card) => ({
      id: card.id,
      front: card.front,
      back: card.back,
    })),
  })
  return (
    <FlashcardArray
      flipArrayHook={flipArrayHook}
      deck={deck.cards.map((card) => ({
        id: card.id,
        front: card.front,
        back: card.back,
      }))}
      style={{}}
    />
  )
}
