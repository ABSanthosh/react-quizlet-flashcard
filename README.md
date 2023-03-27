<h1 align="center">Welcome to react-quizlet-flashcard 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-quizlet-flashcard" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-quizlet-flashcard.svg">
  </a>
</p>

A simple and responsive quizlet-like flashcard component with a few additional options.

Front and back card accepts html strings and JSX elements!

<h2 align="center">
<a href="https://absanthosh.github.io/react-quizlet-flashcard/?path=/story/flashcard--basic-flashcard" target="_blank">Check out the demo here</a>
</h2>

|                                          react-quizlet-flashcard                                           |                                       Quizlet's flashcard component                                        |
| :--------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| ![](https://user-images.githubusercontent.com/24393343/150652939-5d7a14df-4484-4d9b-aee1-8dee94205a16.gif) | ![](https://user-images.githubusercontent.com/24393343/150373430-8b5f9905-9e4f-4639-827e-a8be303f49cb.gif) |

## Installation

```sh
yarn add react-quizlet-flashcard
```

```sh
npm i react-quizlet-flashcard
```

_NOTE: All basic card styles like padding, border radius, font, font size and flex alignment for card content has been removed from V3.0.0 to make it more customizable. You can add your own styles to the card using various style props in both `<Flashcard />` and `<FlashcardArray />` components or by defining the styles in `cards` array as mentioned below._

## Basic Usage

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  const cards = [
    {
      id: 1,
      frontHTML: <div>What is the capital of <u>Alaska</u>?</div>,
      backHTML: <>Juneau</>,
    },
    {
      id: 2,
      frontHTML: <>What is the capital of California?</>,
      backHTML: <>Sacramento</>,
    },
    {
      id: 3,
      frontHTML: <>What is the capital of New York?</>,
      backHTML: <>Albany</>,
    },
    {
      id: 4,
      frontHTML: <>What is the capital of Florida?</>,
      backHTML: <>Tallahassee</>,
    },
    {
      id: 5,
      frontHTML: <>What is the capital of Texas?</>,
      backHTML: <>Austin</>,
    },
    {
      id: 6,
      frontHTML: <>What is the capital of New Mexico?</>,
      backHTML: <>Santa Fe</>,
    },
    {
      id: 7,
      frontHTML: <>What is the capital of Arizona?</>,
      backHTML: <>Phoenix</>,
    },
  ];
  return (
    <div>
      <FlashcardArray cards={cards} />
    </div>
  );
}
```

## Available Props for `<FlashcardArray />`

| Prop                | Type                   | default                                          |
| ------------------- | ---------------------- | ------------------------------------------------ |
| \*cards             | array                  | _None_                                           |
| controls            | boolean                | `true`                                           |
| forwardRef          | Obj                    | `() => {}`                                       |
| showCount           | boolean                | `true`                                           |
| frontCardStyle      | React.CSSProperties    | `{}`                                             |
| frontContentStyle   | React.CSSProperties    | `{}`                                             |
| backCardStyle       | React.CSSProperties    | `{}`                                             |
| backContentStyle    | React.CSSProperties    | `{}`                                             |
| FlashcardArrayStyle | React.CSSProperties    | `{}`                                             |
| onCardChange        | func                   | `(id: any, index: number) => {}`                 |
| onCardFlip          | func                   | `(id: any, index: number, state: boolean) => {}` |
| currentCardFlipRef  | React.MutableRefObject | _None_                                           |
| cycle               | boolean                | `false`                                          |

## Available props for `<Flashcard />`

| Prop              | Type                       | default           |
| ----------------- | -------------------------- | ----------------- |
| \*frontHTML       | string \| JSX.Element      | _None_            |
| frontCardStyle    | React.CSSProperties        | _None_            |
| frontContentStyle | React.CSSProperties        | _None_            |
| backHTML          | string \| JSX.Element      | _None_            |
| backCardStyle     | React.CSSProperties        | _None_            |
| backContentStyle  | React.CSSProperties        | _None_            |
| className         | string                     | ""                |
| height            | string                     | _None_            |
| width             | string                     | _None_            |
| borderRadius      | string                     | 1rem              |
| style             | React.CSSProperties        | _None_            |
| onCardFlip        | `(state: boolean) => void` | _None_            |
| manualFlipRef     | React.MutableRefObject     | { current: null } |

## Possible keys for each object in `cards` array

| Key               | Type                  |
| ----------------- | --------------------- |
| \*id              | number                |
| \*frontHTML       | string \| JSX.Element |
| \*backHTML        | string \| JSX.Element |
| frontCardStyle    | React.CSSProperties   |
| frontContentStyle | React.CSSProperties   |
| backCardStyle     | React.CSSProperties   |
| backContentStyle  | React.CSSProperties   |
| className         | string                |
| height            | string                |
| width             | string                |
| borderRadius      | string                |
| style             | React.CSSProperties   |

## Examples

<details>
<summary>Standalone Flashcard component</summary>

### Basic Flashcard:

```javascript
import { Flashcard } from "react-quizlet-flashcard";

function App() {
  return (
    <div className="storyContainer">
      <Flashcard frontHTML="<h1>Front</h1>" backHTML={<h1>Back</h1>} />
    </div>
  );
}
```

### Manual flip using ref:

You can use this when you want to add buttons or other intractable elements to flip the card content.

```javascript
import { Flashcard } from "react-quizlet-flashcard";
import { useRef } from "react";

function App() {
  const flipRef = useRef();

  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Front</h1>"
        backHTML={<h1>Back</h1>}
        manualFlipRef={flipRef}
      />
      <button onClick={() => flipRef.current()}>Flip</button>
    </div>
  );
}
```

### Custom Styles for front and back content

```javascript
import { Flashcard } from "react-quizlet-flashcard";

function App() {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML={
          <>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
          </>
        }
        backHTML={<h1>Back</h1>}
        backContentStyle={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        frontContentStyle={{
          backgroundColor: "turquoise",
          color: "white",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          fontSize: "2rem",
        }}
      />
    </div>
  );
}
```

### Card flip callback

```javascript
import { Flashcard } from "react-quizlet-flashcard";

function App() {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Check console</h1>"
        backHTML={<h1>Back</h1>}
        onCardFlip={(state) => {
          if (state) console.log("Card is flipped");
          else console.log("Card is not flipped");
        }}
      />
    </div>
  );
}
```

### Custom Card Size

```javascript
import { Flashcard } from "react-quizlet-flashcard";

function App() {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Front</h1>"
        backHTML={<h1>Back</h1>}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
}
```

</details>

<details>
<summary>FlashcardArray component</summary>

### Basic FlashcardArray:

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  const cards = [...]
  return (
    <div className="storyContainer">
      <FlashcardArray cards={cards} />
    </div>
  );
}
```

### Cards with custom controls(Using forwardRef prop):

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";
import { useRef } from "react";

function App() {
  const controlRef = useRef({}); // {} should definitely be passed to useRef for it to work
  const currentCardFlipRef = useRef(); // nothing should be passed to useRef for it to work
  const [currentCard, setCurrentCard] = useState(1);

  return (
    <div className="storyContainer">
      <FlashcardArray
        cards={deck.cards}
        controls={false}
        showCount={false}
        forwardRef={controlRef}
        currentCardFlipRef={currentCardFlipRef}
        onCardChange={(id, index) => {
          setCurrentCard(index);
        }}
      />
      <p>
        {currentCard} / {deck.cards.length}
      </p>
      <button onClick={() => controlRef.current.prevCard()}>Prev</button>
      <button onClick={() => controlRef.current.resetArray()}>Reset</button>
      <button onClick={() => controlRef.current.nextCard()}>Next</button>
      <button onClick={() => currentCardFlipRef.current()}>Flip</button>
    </div>
  );
}
```

### Custom styles for all cards in the array:

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  cards = [...]
  return (
    <div className="storyContainer">
      <FlashcardArray
        cards={cards}
        frontContentStyle={{
          backgroundColor: "lightgoldenrodyellow",
          color: "black",
        }}
        backContentStyle={{
          backgroundColor: "turquoise",
        }}
      />
    </div>
  );
}
```

### Custom style for each card:

You can set style for each card through the card object. Refer to prop list of Card object above.
Instead, you can also pass another react component with custom style into cards.

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  return (
    <div className="storyContainer">
      <FlashcardArray
        cards={[
          {
            id: 1,
            frontHTML: (
              <>
                <span style={{ backgroundColor: "lawngreen" }}>Option 1</span>
                <span style={{ backgroundColor: "lawngreen" }}>Option 2</span>
                <span style={{ backgroundColor: "lawngreen" }}>Option 3</span>
              </>
            ),
            backHTML: "Juneau",
            options: ["Juneau", "Anchorage", "Fairbanks"],
            frontContentStyle: {
              backgroundColor: "lightgoldenrodyellow",
              color: "black",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "1fr",
              gap: "10px",
              padding: "10px",
            },
          },
          {
            id: 2,
            frontHTML: (
              <>
                <span style={{ backgroundColor: "pink" }}>Option 1</span>
                <span style={{ backgroundColor: "pink" }}>Option 2</span>
                <span style={{ backgroundColor: "pink" }}>Option 3</span>
              </>
            ),
            backHTML: "Sacramento",
            options: ["Sacramento", "Los Angeles", "San Francisco"],
            frontContentStyle: {
              backgroundColor: "lightgoldenrodyellow",
              color: "black",
              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: "10px",
              padding: "10px",
            },
          },
        ]}
      />
    </div>
  );
}
```

</details>

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/ABSanthosh/react-quizlet-flashcard/issues).

Give a ⭐️ if this project helped you!

## To-Do:

- [x] Write the component with typescript.
- [ ] Write Unit tests.
- [x] More finer control.
- [x] Write the styles with Sass
