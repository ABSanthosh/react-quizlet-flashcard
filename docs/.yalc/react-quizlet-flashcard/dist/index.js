"use client";
import { jsx as i, jsxs as v, Fragment as I } from "react/jsx-runtime";
import { useState as N, useCallback as C, useMemo as F, useEffect as D } from "react";
function S({
  onFlip: t,
  disableFlip: c = !1,
  manualFlip: l = !1,
  flipDirection: f = "bt"
}) {
  const [h, a] = N("front"), d = C(
    (m) => {
      t && t(m);
    },
    [t]
  ), p = C(
    (m) => {
      c || a((r) => {
        const w = m ?? (r === "front" ? "back" : "front");
        return w !== r && d(w), w;
      });
    },
    [c, d]
  ), o = C(() => {
    a("front");
  }, []);
  return F(
    () => ({
      flip: p,
      manualFlip: l,
      disableFlip: c,
      flipDirection: f,
      resetCardState: o,
      state: h,
      onFlip: d
    }),
    [h, p, o, l, d, f, c]
  );
}
function _({ style: t, flipHook: c, className: l, front: f, back: h }) {
  const [a, d] = N(c ? c.state === "back" : !1), p = S({
    onFlip: (m) => {
      d(m === "back");
    }
  }), o = c || p;
  return D(() => {
    o && d(o.state === "back");
  }, [o]), /* @__PURE__ */ i(
    "div",
    {
      style: t,
      className: "flashcard-wrapper",
      children: /* @__PURE__ */ v(
        "div",
        {
          className: ["flashcard", l].filter(Boolean).join(" "),
          "data-flip": a,
          "data-dir": o?.flipDirection || "bt",
          role: "region",
          "aria-label": `Flashcard, currently showing ${a ? "back" : "front"} side`,
          "aria-live": "polite",
          tabIndex: 0,
          onClick: () => {
            o?.manualFlip || o.disableFlip || o.flip();
          },
          children: [
            /* @__PURE__ */ i(
              "div",
              {
                className: "flashcard__front",
                "data-flip-type": o?.disableFlip ? "disable" : o?.manualFlip ? "manual" : "auto",
                style: f.style,
                "aria-hidden": a,
                role: "contentinfo",
                children: f.html
              }
            ),
            /* @__PURE__ */ i(
              "div",
              {
                className: "flashcard__back",
                "data-flip-type": o?.disableFlip ? "disable" : o?.manualFlip ? "manual" : "auto",
                style: h.style,
                "aria-hidden": a,
                role: "contentinfo",
                children: h.html
              }
            )
          ]
        }
      )
    }
  );
}
function j({
  cycle: t = !1,
  onFlip: c,
  deckLength: l,
  manualFlip: f,
  disableFlip: h,
  onCardChange: a,
  flipDirection: d,
  showCount: p = !0,
  showControls: o = !0,
  showProgressBar: m = !1
}) {
  const [r, w] = N(0), [x, u] = N(
    t ? [l - 1, 0, 1] : [-1, 0, 1]
  ), n = F(() => l, [l]), H = F(() => x[0] !== -1, [x]), B = F(() => x[2] !== -1, [x]);
  D(() => {
    if (t)
      u([
        (r - 1 + l) % l,
        r,
        (r + 1) % l
      ]);
    else {
      const s = r - 1 < 0 ? -1 : r - 1, e = r, b = r + 1 >= l ? -1 : r + 1;
      u([s, e, b]);
    }
  }, [t, l, r]);
  const M = C(
    (s) => {
      c?.(r, s);
    },
    [c, r]
  ), g = S({
    onFlip: M,
    manualFlip: f,
    disableFlip: h,
    flipDirection: d
  }), k = C(() => {
    const s = t ? (r + 1) % n : Math.min(r + 1, n - 1);
    if (s !== r) {
      if (g.resetCardState(), w(s), t)
        u((e) => [
          e[1],
          // Previous center becomes left
          e[2],
          // Previous right becomes center
          (e[2] + 1) % n
          // New right card
        ]);
      else {
        const e = s - 1 < 0 ? -1 : s - 1, b = s, y = s + 1 >= n ? -1 : s + 1;
        u([e, b, y]);
      }
      a?.(s);
    }
  }, [r, n, t, g, a]), R = C(() => {
    const s = t ? (r - 1 + n) % n : Math.max(r - 1, 0);
    if (s !== r) {
      if (g.resetCardState(), w(s), t)
        u((e) => [
          (e[0] - 1 + n) % n,
          // New left card
          e[0],
          // Previous left becomes center
          e[1]
          // Previous center becomes right
        ]);
      else {
        const e = s - 1 < 0 ? -1 : s - 1, b = s, y = s + 1 >= n ? -1 : s + 1;
        u([e, b, y]);
      }
      a?.(s);
    }
  }, [r, n, t, g, a]);
  return {
    cycle: t,
    deckLength: l,
    currentCard: r,
    flipHook: g,
    prevCard: R,
    nextCard: k,
    canGoPrev: H,
    canGoNext: B,
    cardsInDisplay: x,
    showCount: p,
    showControls: o,
    showProgressBar: m,
    progressBar: {
      current: r + 1,
      total: n,
      percentage: n > 0 ? Math.round((r + 1) / n * 100) : 0
    },
    setCurrentCard: C(
      (s) => {
        const e = t ? (s % n + n) % n : Math.max(0, Math.min(s, n - 1));
        if (console.log(`Setting current card to index: ${e}`), w(e), t)
          u([
            (e - 1 + n) % n,
            e,
            (e + 1) % n
          ]);
        else {
          const b = e - 1 < 0 ? -1 : e - 1, y = e, $ = e + 1 >= n ? -1 : e + 1;
          u([b, y, $]);
        }
      },
      [t, n]
    )
  };
}
function G({
  deck: t,
  style: c,
  className: l,
  flipArrayHook: f
}) {
  const h = j({
    deckLength: t.length
  }), a = f || h, d = (p) => /* @__PURE__ */ i(
    _,
    {
      back: { html: /* @__PURE__ */ i(I, {}) },
      front: { html: /* @__PURE__ */ i(I, {}) },
      className: "flashcard__sibling"
    },
    p
  );
  return /* @__PURE__ */ v(
    "div",
    {
      className: ["flashcard-array-wrapper", l].filter(Boolean).join(" "),
      style: c,
      children: [
        /* @__PURE__ */ v(
          "div",
          {
            className: "flashcard-array",
            role: "region",
            "aria-label": `Flashcard ${a.currentCard + 1} of ${a.deckLength}`,
            "aria-live": "polite",
            children: [
              d(a.cardsInDisplay[0]),
              /* @__PURE__ */ i(
                _,
                {
                  flipHook: a.flipHook,
                  back: t[a.cardsInDisplay[1]].back,
                  front: t[a.cardsInDisplay[1]].front,
                  style: t[a.cardsInDisplay[1]].style,
                  className: t[a.cardsInDisplay[1]].className
                },
                a.cardsInDisplay[1]
              ),
              d(a.cardsInDisplay[2])
            ]
          }
        ),
        a.showProgressBar && /* @__PURE__ */ i("div", { className: "flashcard-array__progress-bar", children: /* @__PURE__ */ i(
          "div",
          {
            className: "flashcard-array__progress-bar-fill",
            style: { width: `${a.progressBar.percentage}%` }
          }
        ) }),
        (a.showControls || a.showCount) && /* @__PURE__ */ v("div", { className: "flashcard-array__controls", children: [
          a.showControls && /* @__PURE__ */ i(
            "button",
            {
              onClick: () => a.prevCard(),
              disabled: !a.canGoPrev,
              "aria-label": "Previous card",
              children: /* @__PURE__ */ i(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  style: { height: "24px", width: "24px" },
                  children: /* @__PURE__ */ i(
                    "path",
                    {
                      d: "M19 12a1 1 0 0 1-1 1H8.414l1.293 1.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 1.414L8.414 11H18a1 1 0 0 1 1 1z",
                      "data-name": "Left"
                    }
                  )
                }
              )
            }
          ),
          a.showCount && /* @__PURE__ */ v("span", { className: "flashcard-array__controls--count", children: [
            a.currentCard + 1,
            "/",
            t.length
          ] }),
          a.showControls && /* @__PURE__ */ i(
            "button",
            {
              onClick: () => a.nextCard(),
              disabled: !a.canGoNext,
              "aria-label": "Next card",
              children: /* @__PURE__ */ i(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  style: { height: "24px", width: "24px" },
                  children: /* @__PURE__ */ i(
                    "path",
                    {
                      d: "m18.707 12.707-3 3a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1 0-2h9.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414z",
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
  _ as Flashcard,
  G as FlashcardArray,
  S as useFlashcard,
  j as useFlashcardArray
};
