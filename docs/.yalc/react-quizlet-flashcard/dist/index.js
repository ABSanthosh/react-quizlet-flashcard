"use client";
import { jsx as c, jsxs as y, Fragment as v } from "react/jsx-runtime";
import { useState as F, useCallback as b, useMemo as N, useEffect as _ } from "react";
function D({
  onFlip: n,
  disableFlip: l = !1,
  manualFlip: i = !1,
  flipDirection: f = "bt"
}) {
  const [a, d] = F("front"), h = b(
    (u) => {
      n && n(u);
    },
    [n]
  ), C = b(
    (u) => {
      l || d((t) => {
        const m = u ?? (t === "front" ? "back" : "front");
        return m !== t && h(m), m;
      });
    },
    [l, h]
  ), o = b(() => {
    d("front");
  }, []);
  return N(
    () => ({
      flip: C,
      manualFlip: i,
      disableFlip: l,
      flipDirection: f,
      resetCardState: o,
      state: a,
      onFlip: h
    }),
    [a, C, o, i, h, f, l]
  );
}
function I({
  style: n,
  flipHook: l,
  className: i,
  front: f,
  back: a
}) {
  const [d, h] = F(l ? l.state === "back" : !1), C = D({
    onFlip: (u) => {
      h(u === "back");
    }
  }), o = l || C;
  return _(() => {
    o && h(o.state === "back");
  }, [o]), /* @__PURE__ */ c(
    "div",
    {
      style: n,
      className: "flashcard-wrapper",
      children: /* @__PURE__ */ y(
        "div",
        {
          className: ["flashcard", i].filter(Boolean).join(" "),
          "data-flip": d,
          "data-dir": o?.flipDirection || "bt",
          role: "region",
          "aria-label": `Flashcard, currently showing ${d ? "back" : "front"} side`,
          "aria-live": "polite",
          tabIndex: 0,
          onClick: () => {
            o?.manualFlip || o.disableFlip || o.flip();
          },
          children: [
            /* @__PURE__ */ c(
              "div",
              {
                className: "flashcard__front",
                "data-flip-type": o?.disableFlip ? "disable" : o?.manualFlip ? "manual" : "auto",
                style: f.style,
                "aria-hidden": d,
                role: "contentinfo",
                children: f.html
              }
            ),
            /* @__PURE__ */ c(
              "div",
              {
                className: "flashcard__back",
                "data-flip-type": o?.disableFlip ? "disable" : o?.manualFlip ? "manual" : "auto",
                style: a.style,
                "aria-hidden": d,
                role: "contentinfo",
                children: a.html
              }
            )
          ]
        }
      )
    }
  );
}
function R({
  cycle: n = !1,
  onFlip: l,
  deckLength: i,
  manualFlip: f,
  disableFlip: a,
  onCardChange: d,
  flipDirection: h,
  showCount: C = !0,
  showControls: o = !0,
  showProgressBar: u = !1
}) {
  const [t, m] = F(0), [S, p] = F(
    n ? [i - 1, 0, 1] : [-1, 0, 1]
  ), e = N(() => i, [i]);
  _(() => {
    if (n)
      p([
        (t - 1 + i) % i,
        t,
        (t + 1) % i
      ]);
    else {
      const r = t - 1 < 0 ? -1 : t - 1, s = t, w = t + 1 >= i ? -1 : t + 1;
      p([r, s, w]);
    }
  }, [n, i, t]);
  const H = b(
    (r) => {
      l?.(t, r);
    },
    [l, t]
  ), x = D({
    onFlip: H,
    manualFlip: f,
    disableFlip: a,
    flipDirection: h
  }), M = b(() => {
    const r = n ? (t + 1) % e : Math.min(t + 1, e - 1);
    if (r !== t) {
      if (x.resetCardState(), m(r), n)
        p((s) => [
          s[1],
          // Previous center becomes left
          s[2],
          // Previous right becomes center
          (s[2] + 1) % e
          // New right card
        ]);
      else {
        const s = r - 1 < 0 ? -1 : r - 1, w = r, g = r + 1 >= e ? -1 : r + 1;
        p([s, w, g]);
      }
      d?.(r);
    }
  }, [t, e, n, x, d]), B = b(() => {
    const r = n ? (t - 1 + e) % e : Math.max(t - 1, 0);
    if (r !== t) {
      if (x.resetCardState(), m(r), n)
        p((s) => [
          (s[0] - 1 + e) % e,
          // New left card
          s[0],
          // Previous left becomes center
          s[1]
          // Previous center becomes right
        ]);
      else {
        const s = r - 1 < 0 ? -1 : r - 1, w = r, g = r + 1 >= e ? -1 : r + 1;
        p([s, w, g]);
      }
      d?.(r);
    }
  }, [t, e, n, x, d]);
  return {
    cycle: n,
    deckLength: i,
    currentCard: t,
    flipHook: x,
    prevCard: B,
    nextCard: M,
    cardsInDisplay: S,
    showCount: C,
    showControls: o,
    showProgressBar: u,
    progressBar: {
      current: t + 1,
      total: e,
      percentage: e > 0 ? Math.round((t + 1) / e * 100) : 0
    },
    setCurrentCard: b(
      (r) => {
        const s = n ? (r % e + e) % e : Math.max(0, Math.min(r, e - 1));
        if (console.log(`Setting current card to index: ${s}`), m(s), n)
          p([
            (s - 1 + e) % e,
            s,
            (s + 1) % e
          ]);
        else {
          const w = s - 1 < 0 ? -1 : s - 1, g = s, k = s + 1 >= e ? -1 : s + 1;
          p([w, g, k]);
        }
      },
      [n, e]
    )
  };
}
function A({ flipArrayHook: n, deck: l, style: i }) {
  const f = R({
    deckLength: l.length
  }), a = n || f, d = (h) => /* @__PURE__ */ c(
    I,
    {
      back: { html: /* @__PURE__ */ c(v, {}) },
      front: { html: /* @__PURE__ */ c(v, {}) },
      className: "flashcard__sibling"
    },
    h
  );
  return /* @__PURE__ */ y(
    "div",
    {
      className: "flashcard-array-wrapper",
      style: i,
      children: [
        /* @__PURE__ */ y(
          "div",
          {
            className: "flashcard-array",
            role: "region",
            "aria-label": `Flashcard ${a.currentCard + 1} of ${a.deckLength}`,
            "aria-live": "polite",
            children: [
              d(a.cardsInDisplay[0]),
              /* @__PURE__ */ c(
                I,
                {
                  flipHook: a.flipHook,
                  back: l[a.cardsInDisplay[1]].back,
                  front: l[a.cardsInDisplay[1]].front,
                  style: l[a.cardsInDisplay[1]].style,
                  className: l[a.cardsInDisplay[1]].className
                },
                a.cardsInDisplay[1]
              ),
              d(a.cardsInDisplay[2])
            ]
          }
        ),
        a.showProgressBar && /* @__PURE__ */ c("div", { className: "flashcard-array__progress-bar", children: /* @__PURE__ */ c(
          "div",
          {
            className: "flashcard-array__progress-bar-fill",
            style: { width: `${a.progressBar.percentage}%` }
          }
        ) }),
        (a.showControls || a.showCount) && /* @__PURE__ */ y("div", { className: "flashcard-array__controls", children: [
          a.showControls && /* @__PURE__ */ c(
            "button",
            {
              onClick: () => a.prevCard(),
              disabled: a.currentCard === 0 && !a.cycle,
              "aria-label": "Previous card",
              children: /* @__PURE__ */ c(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  style: { height: "24px", width: "24px" },
                  children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z",
                      style: { fill: "#1c1b1e", height: "24px", width: "24px" },
                      "data-name": "Left"
                    }
                  )
                }
              )
            }
          ),
          a.showCount && /* @__PURE__ */ y("span", { children: [
            a.currentCard + 1,
            "/",
            l.length
          ] }),
          a.showControls && /* @__PURE__ */ c(
            "button",
            {
              onClick: () => a.nextCard(),
              disabled: a.currentCard === l.length - 1 && !a.cycle,
              "aria-label": "Next card",
              children: /* @__PURE__ */ c(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  style: { height: "24px", width: "24px" },
                  children: /* @__PURE__ */ c(
                    "path",
                    {
                      d: "m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z",
                      style: { fill: "#1c1b1e", height: "24px", width: "24px" },
                      "data-name": "Right"
                    }
                  )
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
export {
  I as Flashcard,
  A as FlashcardArray,
  D as useFlashcard,
  R as useFlashcardArray
};
