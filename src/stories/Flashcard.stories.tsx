import React from "react";
import { storiesOf } from "@storybook/react";
const stories = storiesOf("Flashcard", module);
import "./storyStyle.scss";

import Flashcard from "../components/Flashcard/Flashcard";

stories.add("default", () => {
  return (
    <div className="storyContainer">
      <Flashcard
      // style={{
      //   margin: "auto",
      // }}
      // frontHTML="Front"
      // backHTML="<h1>Back</h1>"
      />
    </div>
  );
});
