import React from "react";
import { storiesOf } from "@storybook/react";

import Flashcard from "../components/Flashcard/Flashcard";

const stories = storiesOf("Flashcard", module);
import "./storyStyles.css";

stories.add("default", () => {
  return (
    <div className="storyContainer">
      <Flashcard height="340px" width="560px"  />
    </div>
  );
});
