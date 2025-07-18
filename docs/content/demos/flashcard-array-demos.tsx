'use client'

import {
  FlashcardArray,
  type FlipDirection,
  type IFlashcard,
  useFlashcardArray,
} from 'react-quizlet-flashcard'
import 'react-quizlet-flashcard/dist/index.css'
import { Fragment, useState } from 'react'

export const deck: IFlashcard[] = [
  {
    front: {
      html: <>What is the capital of Alaska?</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blueviolet',
        backgroundColor: 'lightblue',
      },
    },
    back: {
      html: <>Juneau</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gainsboro',
        backgroundColor: 'darkslategray',
      },
    },
  },
  {
    front: {
      html: <>What is the capital of California?</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blueviolet',
        backgroundColor: 'lightblue',
      },
    },
    back: {
      html: <>Sacramento</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gainsboro',
        backgroundColor: 'darkslategray',
      },
    },
  },
  {
    front: {
      html: <>What is the capital of New York?</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blueviolet',
        backgroundColor: 'lightblue',
      },
    },
    back: {
      html: <>Albany</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gainsboro',
        backgroundColor: 'darkslategray',
      },
    },
  },
  {
    front: {
      html: <>What is the capital of Florida?</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blueviolet',
        backgroundColor: 'lightblue',
      },
    },
    back: {
      html: <>Tallahassee</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gainsboro',
        backgroundColor: 'darkslategray',
      },
    },
  },
  {
    front: {
      html: <>What is the capital of Texas?</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blueviolet',
        backgroundColor: 'lightblue',
      },
    },
    back: {
      html: <>Austin</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gainsboro',
        backgroundColor: 'darkslategray',
      },
    },
  },
  {
    front: {
      html: <>What is the capital of New Mexico?</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blueviolet',
        backgroundColor: 'lightblue',
      },
    },
    back: {
      html: <>Santa Fe</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gainsboro',
        backgroundColor: 'darkslategray',
      },
    },
  },
  {
    front: {
      html: <>What is the capital of Arizona?</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'blueviolet',
        backgroundColor: 'lightblue',
      },
    },
    back: {
      html: <>Phoenix</>,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gainsboro',
        backgroundColor: 'darkslategray',
      },
    },
  },
]

export function BasicArrayDemo() {
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.length,
  })

  return (
    <FlashcardArray
      flipArrayHook={flipArrayHook}
      deck={deck}
    />
  )
}

export function CyclingArrayDemo() {
  const flipArrayHook = useFlashcardArray({
    cycle: true,
    deckLength: deck.length,
  })

  return (
    <FlashcardArray
      flipArrayHook={flipArrayHook}
      deck={deck}
    />
  )
}

export function CustomControlDemo() {
  const [useCycle, setUseCycle] = useState(false)
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.length,
    showCount: false,
    showControls: false,
    cycle: useCycle,
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        width: 'fit-content',
      }}
    >
      <FlashcardArray
        deck={deck}
        flipArrayHook={flipArrayHook}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '15px',
          width: 'fit-content',
        }}
      >
        <button
          className='CrispButton'
          onClick={() => flipArrayHook.prevCard()}
        >
          Previous
        </button>
        <span>
          {flipArrayHook.currentCard + 1} / {deck.length}
        </span>
        <button
          className='CrispButton'
          onClick={() => flipArrayHook.nextCard()}
        >
          Next
        </button>
      </div>
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
          <input
            type='checkbox'
            checked={useCycle}
            className='CrispInput'
            onChange={(e) => setUseCycle(e.target.checked)}
          />
          Cycle through cards
        </label>
      </div>
    </div>
  )
}

export function CustomStylePerCardDemo() {
  const deck: IFlashcard[] = [
    {
      front: {
        html: (
          <>
            <span
              style={{
                backgroundColor: 'lawngreen',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
              }}
            >
              Option 1
            </span>
            <span
              style={{
                backgroundColor: 'lawngreen',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
              }}
            >
              Option 2
            </span>
            <span
              style={{
                backgroundColor: 'lawngreen',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
              }}
            >
              Option 3
            </span>
          </>
        ),
        style: {
          backgroundColor: 'lightgoldenrodyellow',
          color: 'black',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr',
          gap: '10px',
          padding: '10px',
        },
      },
      back: {
        html: <>Juneau</>,
        style: {
          backgroundColor: 'lightgoldenrodyellow',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    {
      front: {
        html: (
          <>
            <span
              style={{
                backgroundColor: 'lightcoral',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
              }}
            >
              Option 1
            </span>
            <span
              style={{
                backgroundColor: 'lightcoral',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
              }}
            >
              Option 2
            </span>
            <span
              style={{
                backgroundColor: 'lightcoral',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
              }}
            >
              Option 3
            </span>
          </>
        ),
        style: {
          backgroundColor: 'lightgoldenrodyellow',
          color: 'black',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr 1fr 1fr',
          gap: '10px',
          padding: '10px',
        },
      },
      back: {
        html: <>Sacramento</>,
        style: {
          backgroundColor: 'lightgoldenrodyellow',
          color: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  ]

  const flipArrayHook = useFlashcardArray({
    deckLength: deck.length,
  })

  return (
    <FlashcardArray
      deck={deck}
      flipArrayHook={flipArrayHook}
    />
  )
}

export function CustomStyleAllCardsDemo() {
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.length,
  })

  return (
    <FlashcardArray
      deck={deck.map((card) => ({
        ...card,
        front: {
          ...card.front,
          style: {
            backgroundColor: 'lightgoldenrodyellow',
            color: 'black',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '10px',
            padding: '10px',
          },
        },
        back: {
          ...card.back,
          style: {
            backgroundColor: 'lightgoldenrodyellow',
            color: 'black',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '10px',
            padding: '10px',
          },
        },
      }))}
      flipArrayHook={flipArrayHook}
    />
  )
}

export function ShowProgressBarDemo() {
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.length,
    showProgressBar: true,
  })

  return (
    <FlashcardArray
      deck={deck}
      flipArrayHook={flipArrayHook}
    />
  )
}

export function FlipDirectionDemo() {
  const [dir, setDir] = useState<FlipDirection>('bt')
  const flipArrayHook = useFlashcardArray({
    deckLength: deck.length,
    flipDirection: dir,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', width: "fit-content" }}>
      <FlashcardArray
        deck={deck}
        flipArrayHook={flipArrayHook}
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
    </div>
  )
}
