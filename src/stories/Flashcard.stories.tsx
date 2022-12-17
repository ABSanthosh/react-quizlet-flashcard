import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
const stories = storiesOf("Flashcard", module);
import "./storyStyle.scss";

import Flashcard from "../components/Flashcard/Flashcard";

stories.add("Basic Flashcard", () => {
  return (
    <div className="storyContainer">
      <Flashcard frontHTML="<h1>Front</h1>" backHTML={<h1>Back</h1>} />
    </div>
  );
});

stories.add("Manual flip", () => {
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
});

stories.add("Custom styles", () => {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML={
          <>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              3
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              4
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              5
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              6
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              7
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              8
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              9
            </span>
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
});

stories.add("Card flip callback", () => {
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
});

stories.add("Custom Card size", () => {
  return (
    <div className="storyContainer">
      <Flashcard
        frontHTML="<h1>Front</h1>"
        backHTML={<h1>Back</h1>}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
});
