import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Flashcard from "../components/Flashcard/Flashcard";

describe("Flashcard", () => {
  const frontText = "Front Side";
  const backText = "Back Side";

  it("should render the front of the card by default", () => {
    render(<Flashcard frontHTML={frontText} backHTML={backText} />);
    const flashcardItem = screen.getByText(frontText).closest(".FlashcardWrapper__item");
    expect(flashcardItem).not.toHaveClass("FlashcardWrapper__item--flip");
  });

  it("should flip the card when clicked", () => {
    render(<Flashcard frontHTML={frontText} backHTML={backText} />);
    const flashcardItem = screen.getByText(frontText).closest(".FlashcardWrapper__item");

    if (flashcardItem) {
      fireEvent.click(flashcardItem);
    }

    expect(flashcardItem).toHaveClass("FlashcardWrapper__item--flip");
  });

  it("should call onCardFlip callback when flipped", () => {
    const onCardFlip = jest.fn();
    render(
      <Flashcard
        frontHTML={frontText}
        backHTML={backText}
        onCardFlip={onCardFlip}
      />
    );
    const flashcardItem = screen.getByText(frontText).closest(".FlashcardWrapper__item");

    if (flashcardItem) {
      fireEvent.click(flashcardItem);
    }
    expect(onCardFlip).toHaveBeenCalledWith(true);

    if (flashcardItem) {
      fireEvent.click(flashcardItem);
    }
    expect(onCardFlip).toHaveBeenCalledWith(false);
  });
});