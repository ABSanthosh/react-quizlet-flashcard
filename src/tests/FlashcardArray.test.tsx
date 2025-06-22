import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FlashcardArray from "../components/FlashcardArray/FlashcardArray";

const mockCards = [
  { id: 1, frontHTML: "Front 1", backHTML: "Back 1" },
  { id: 2, frontHTML: "Front 2", backHTML: "Back 2" },
  { id: 3, frontHTML: "Front 3", backHTML: "Back 3" },
];

describe("FlashcardArray", () => {
  it("should render the first card and controls by default", () => {
    render(<FlashcardArray cards={mockCards} />);
    expect(screen.getByText("Front 1")).toBeInTheDocument();
    expect(screen.getByText("1/3")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("should navigate to the next and previous card", () => {
    render(<FlashcardArray cards={mockCards} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];
    const prevButton = buttons[0];

    // Go to next card
    fireEvent.click(nextButton);
    expect(screen.getByText("Front 2")).toBeInTheDocument();
    expect(screen.getByText("2/3")).toBeInTheDocument();

    // Go back to previous card
    fireEvent.click(prevButton);
    expect(screen.getByText("Front 1")).toBeInTheDocument();
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });

  it("should not navigate past the start or end if cycle is false", () => {
    render(<FlashcardArray cards={mockCards} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];
    const prevButton = buttons[0];

    // Go to previous card (should not change)
    fireEvent.click(prevButton);
    expect(screen.getByText("1/3")).toBeInTheDocument();

    // Go to the last card
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText("3/3")).toBeInTheDocument();

    // Try to go past the last card (should not change)
    fireEvent.click(nextButton);
    expect(screen.getByText("3/3")).toBeInTheDocument();
  });

  it("should cycle through cards if cycle is true", () => {
    render(<FlashcardArray cards={mockCards} cycle={true} />);
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons[1];
    const prevButton = buttons[0];

    // Go to the last card
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText("3/3")).toBeInTheDocument();

    // Go to the next card (should cycle to the first)
    fireEvent.click(nextButton);
    expect(screen.getByText("1/3")).toBeInTheDocument();

    // Go to the previous card (should cycle to the last)
    fireEvent.click(prevButton);
    expect(screen.getByText("3/3")).toBeInTheDocument();
  });

  it("should hide controls and count when specified", () => {
    const { rerender } = render(
      <FlashcardArray cards={mockCards} controls={false} />
    );
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    expect(screen.getByText("1/3")).toBeInTheDocument();

    rerender(<FlashcardArray cards={mockCards} showCount={false} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.queryByText("1/3")).not.toBeInTheDocument();
  });

  it("should call onCardChange when card is changed", () => {
    const onCardChange = jest.fn();
    render(<FlashcardArray cards={mockCards} onCardChange={onCardChange} />);
    const nextButton = screen.getAllByRole("button")[1];

    fireEvent.click(nextButton);
    // onCardChange(cardId, cardIndex + 1)
    expect(onCardChange).toHaveBeenCalledWith(2, 2);
  });
});