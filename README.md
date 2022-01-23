<h1 align="center">Welcome to react-quizlet-flashcard 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-quizlet-flashcard" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-quizlet-flashcard.svg">
  </a>
</p>

A simple and responsive quizlet-like flashcard component with a few additional options. 

Front and back card accepts child components as well as html strings!

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

## Usage

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  const cards = [
    {
      id: 1,
      front: "What is the capital of <u>Alaska</u>?",
      back: "Juneau",
      frontChild: <div>Hello there</div>
      backChild: <p>This is a back child</p>
    },
    {
      id: 2,
      front: "What is the capital of California?",
      back: "Sacramento",
    },
    {
      id: 3,
      front: "What is the capital of New York?",
      back: "Albany",
    },
    {
      id: 4,
      front: "What is the capital of Florida?",
      back: "Tallahassee",
    },
    {
      id: 5,
      front: "What is the capital of Texas?",
      back: "Austin",
    },
    {
      id: 6,
      front: "What is the capital of New Mexico?",
      back: "Santa Fe",
    },
    {
      id: 7,
      front: "What is the capital of Arizona?",
      back: "Phoenix",
    },
  ];
  return (
    <div>
      <FlashcardArray cards={cards} />
    </div>
  );
}
```

## Available Props

| Prop                      | Description                                                                                           | Type  |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ----- |
| cards _(Required)_        | Array of objects with keys `id`, `front`, `back`                                                      | array |
| controls _(Optional)_     | used to set whether the arrows should be shown or not                                                 | bool  |
| count _(Optional)_        | used to set whether the the card count is shown or not                                                | bool  |
| onCardChange _(Optional)_ | callback function called on every card change                                                         | func  |
| forwardRef _(Optional)_   | when passed with a ref, `ref.current ` object will contain reference to `nextCard()` and `prevCard()` | Obj   |

## Various examples


### Cards without Controls and card count:

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
    const cards = [...]
  return (
    <div>
      <FlashcardArray cards={cards} count={false} control={false} />
    </div>
  );
}
```

### Card change callback:

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  const cards = [...]
  return (
    <div>
      <FlashcardArray
        cards={cards}
        onCardChange={(cardNumber)=>{
            // called on each card change event
            console.log(cardNumber)
        }}
      />
    </div>
  );
}
```

### Cards with custom controls(Using forwardRef prop):

```javascript
import { FlashcardArray } from "react-quizlet-flashcard";
import { useRef } from "react";


function App() {
  const arrayRef = useRef({});
  const cards = [...]
  return (
    <div>
      <FlashcardArray
        cards={cards}
        count={false}
        forwardRef={arrayRef}
        control={false}
      />
       // Here, arrayRef is only mapped to this instance so
       // any number of <FlashcardArray /> can be used in the
       // same page with different refs
      <button onClick={() => arrayRef.current.prevCard()}>Prev</button>
      <button onClick={() => arrayRef.current.nextCard()}>Next</button>
    </div>
  );
}

```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
<br>
Feel free to check [issues page](https://github.com/ABSanthosh/react-quizlet-flashcard/issues).

<br><br>
Give a ⭐️ if this project helped you!
