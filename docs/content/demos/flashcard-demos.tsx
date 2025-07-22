"use client";

import { Fragment, useState } from "react";
import {
  Flashcard,
  FlipDirection,
  useFlashcard,
} from "../../.yalc/react-quizlet-flashcard";
// import '../../app/styles/index.scss'

export function CardFlipCallbackDemo() {
  const flipHook = useFlashcard({
    onFlip: (state) => {
      // TODO: This is triggering twice for some reason
      console.log(`Flipped to ${state}`);
    },
  });
  return (
    <Flashcard
      className="responsive-flashcard"
      flipHook={flipHook}
      back={{
        html: <div>Back Content (Check console for flip state)</div>,
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      front={{
        html: <div>Front Content (Check console for flip state)</div>,
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    />
  );
}

export function CustomCardSize() {
  return (
    <Flashcard
      className="responsive-flashcard"
      style={{ width: "300px", height: "300px" }}
      back={{
        html: <div>Small Back Content</div>,
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      front={{
        html: <div>Small Front Content</div>,
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    />
  );
}

export function CustomStylesDemo() {
  return (
    <Flashcard
      className="responsive-flashcard custom-flashcard"
      back={{
        html: <div>Styled Back</div>,
        style: {
          backgroundColor: "palevioletred",
          color: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      front={{
        html: (
          <Fragment>
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
          </Fragment>
        ),
        style: {
          backgroundColor: "turquoise",
          color: "white",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          fontSize: "2rem",
        },
      }}
    />
  );
}

export function DisabledFlipDemo() {
  const [disabled, setDisabled] = useState(true);
  const flipHook = useFlashcard({
    disableFlip: disabled,
  });
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          flexDirection: "column",
        }}
      >
        <Flashcard
          className="responsive-flashcard"
          flipHook={flipHook}
          back={{
            html: <div>Back Content (Flipping Disabled)</div>,
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
          front={{
            html: <div>Front Content (Flipping Disabled)</div>,
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        />
        <button className="CrispButton" onClick={() => setDisabled(!disabled)}>
          {disabled ? "Enable Flip" : "Disable Flip"}
        </button>
      </div>
    </Fragment>
  );
}

export function FlipDirectionsDemo() {
  const [dir, setDir] = useState<FlipDirection>("bt"); // Default to bottom-to-top
  const flipHook = useFlashcard({
    flipDirection: dir,
  });

  const getFlipDirectionLabel = (direction: FlipDirection) => {
    return direction === "bt"
      ? "Bottom to Top"
      : direction === "tb"
      ? "Top to Bottom"
      : direction === "ltr"
      ? "Left to Right"
      : "Right to Left";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Flashcard
        className="responsive-flashcard"
        flipHook={flipHook}
        back={{
          html: <div>Back Content ({getFlipDirectionLabel(dir)})</div>,
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        front={{
          html: <div>Front Content ({getFlipDirectionLabel(dir)})</div>,
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />
      <select
        className="CrispSelect"
        value={dir}
        onChange={(e) => setDir(e.target.value as FlipDirection)}
      >
        <option value="bt">Bottom to Top</option>
        <option value="tb">Top to Bottom</option>
        <option value="ltr">Left to Right</option>
        <option value="rtl">Right to Left</option>
      </select>
    </div>
  );
}

export function ManualFlipDemo() {
  const flipHook = useFlashcard({
    manualFlip: true,
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
      }}
    >
      <Flashcard
        className="responsive-flashcard"
        flipHook={flipHook}
        back={{
          html: <div>Back Content (I won't flip on click)</div>,
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        front={{
          html: <div>Front Content (I won't flip on click)</div>,
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />
      {/* TODO: fix crisp style */}
      <button className="CrispButton" onClick={() => flipHook.flip()}>
        {`Click to flip to ${flipHook.state === "front" ? "back" : "front"}`}
      </button>
    </div>
  );
}
