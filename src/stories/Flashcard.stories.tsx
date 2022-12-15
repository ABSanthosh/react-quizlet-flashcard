import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
const stories = storiesOf("Flashcard", module);
import "./storyStyle.scss";

import Flashcard from "../components/Flashcard/Flashcard";

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px",
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

stories.add("default", () => {
  const flipRef = useRef(null);
  return (
    <div className="storyContainer">
      <Flashcard
        manualFlipRef={flipRef}
        backCardStyle={{ backgroundColor: "red" }}
        backContentStyle={{ color: "white", display: "block", padding: "0px" }}
        borderRadius="10px"
        backHTML={
          <Button
            onClick={() => {
              console.log("hi");
            }}
          >
            Click Me
          </Button>
        }
        frontHTML="<h1>Back</h1>"
        onCardFlip={(state) => {
          console.log(state);
        }}
      />
      <button
        onClick={() => {
          flipRef.current();
        }}
      >
        Flip
      </button>
    </div>
  );
});
