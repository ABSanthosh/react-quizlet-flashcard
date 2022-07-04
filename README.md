
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
| FlashCardStyle _(Optional)_   | Object with style attributes for each card | Obj   |
| FlashCardClassName _(Optional)_   | Optional class name for each card | String   |
| FlashCardWrapperStyle _(Optional)_   | Styles obj for cards container(Don't override this unless you really have to)  | Obj   |
| setCurrentCard _(Optional)_   | Callback function that returns the current card's data. In addition to the data you passed, it will return `index` of the card, `isFlipped`    | func   |
| setCurrentCardIndex _(Optional)_   | Callback function that returns the current card's index in input array (Preferably a useState setter function)   | func   |
| setIsFlipped _(Optional)_   | Called every time current card flipped. Returns `true` if the card is currently flipped  | func   |


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

### Get current Card index:
```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  const cards = [...];
  return (
    <div>
      <div>
        <FlashcardArray
          cards={deck.cards}
          setCurrentCardIndex={(index) => {
		    // Called everytime the card is changed. 
		    // You can use useState to store the current card index.
            console.log(index);
          }}
        />
      </div>
    </div>
  );
}
```

### Updated current card data:
```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  const cards = [...];
  return (
    <div>
      <div>
        <FlashcardArray
          cards={deck.cards}
          // Callback function invoked every time the card is changed or
          // card is flipped. 
          setCurrentCard={(currentCard) => {
            console.log(currentCard);
          }}
        />
      </div>
    </div>
  );
}	

// Output:
{
    "id": 1,
    "front": "What is the <u>capital</u> of Alaska?",
    "back": "Juneau",
    "options": [...],
    "frontChild": "Hello there",
    "backChild": "THis is back child hehe",
    "index": 0,
    "flipped": true
}
```

### On card flip:
```javascript
import { FlashcardArray } from "react-quizlet-flashcard";

function App() {
  const cards = [];
  return (
    <div>
      <div>
        <FlashcardArray
          cards={deck.cards}
          // Every time the current card is flipped, this method is invoked
          // with true if card is flipped(Showing its back) or 
          // with false if the card is not flipped(Showing the front)
          setIsFlipped={(isFlip) => {
            console.log(isFlip);
          }}
        />
      </div>
    </div>
  );
}
```

## 🤝 Contributing
Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/ABSanthosh/react-quizlet-flashcard/issues).

Give a ⭐️ if this project helped you!


## To-Do:
- Write the component with typescript.
- Write Unit tests.
- More finer control.
- Write the styles with Sass