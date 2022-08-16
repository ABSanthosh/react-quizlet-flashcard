"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),r=require("prop-types");function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=a(e),A=a(r);function n(){return n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var a=arguments[r];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},n.apply(this,arguments)}function s(e,r){void 0===r&&(r={});var a=r.insertAt;if(e&&"undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],A=document.createElement("style");A.type="text/css","top"===a&&t.firstChild?t.insertBefore(A,t.firstChild):t.appendChild(A),A.styleSheet?A.styleSheet.cssText=e:A.appendChild(document.createTextNode(e))}}function o({front:r,frontChild:a,back:A,backChild:s,className:o,reset:l,height:c,width:i,FlashCardStyle:d,onClick:g,...h}){const[C,p]=e.useState(!1);return e.useEffect((()=>{p(!1)}),[l]),t.default.createElement("div",n({className:`FlashcardWrapper ${o}`,style:{height:c,width:i,...d}},h),t.default.createElement("div",{className:"FlashcardWrapper__item "+(C?"FlashcardWrapper__item--flip":""),onClick:()=>{p(!C),g(!C)}},t.default.createElement("div",{className:"FlashcardWrapper__item--front"},t.default.createElement("div",{className:"FlashcardWrapper__item--content"},t.default.createElement("span",{dangerouslySetInnerHTML:{__html:r}}),a)),t.default.createElement("div",{className:"FlashcardWrapper__item--back"},t.default.createElement("div",{className:"FlashcardWrapper__item--content"},t.default.createElement("span",{dangerouslySetInnerHTML:{__html:A}}),s))))}s(".FlashcardWrapper *{box-sizing:border-box}.FlashcardWrapper{zoom:1;bottom:10%;clear:left;height:100%;left:0;margin:0;padding:0;perspective:1000px;position:relative;position:absolute;right:0;top:0;transform:none!important;width:100%}.FlashcardWrapper__item{background-color:transparent;border-radius:1rem;height:100%;left:0;position:absolute;top:0;transform-style:preserve-3d;transition:transform .45s ease;width:100%}.FlashcardWrapper__item--back,.FlashcardWrapper__item--front{align-items:center;-webkit-backface-visibility:hidden;backface-visibility:hidden;border-radius:1rem;box-shadow:0 0 2.5rem 0 rgba(0,0,0,.16);color:#000;cursor:pointer;display:flex;flex-direction:column;font-size:28px;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%}.FlashcardWrapper__item--front{background-color:#fff}.FlashcardWrapper__item--back{background-color:#fff;transform:rotateX(-180deg)}.FlashcardWrapper__item--flip{transform:rotateX(180deg)!important}.FlashcardWrapper__item--content{align-items:center;display:flex;flex-direction:column;font-family:Poppins,sans-serif;font-size:30px;height:100%;justify-content:center;padding:40px 34px;text-align:center;width:100%}"),o.propTypes={front:A.default.string,back:A.default.string,className:A.default.string,reset:A.default.bool,height:A.default.string,width:A.default.string,frontChild:A.default.node,backChild:A.default.node,FlashCardStyle:A.default.object,onClick:A.default.func},o.defaultProps={front:"front",back:"back",className:"",reset:!1,height:"",width:"",frontChild:null,backChild:null,FlashCardStyle:{},onClick:()=>!1};s(".FlashcardArrayWrapper *{box-sizing:border-box}.FlashcardArrayWrapper{align-items:center;display:flex;flex-direction:column;gap:10px;justify-content:center;position:relative;width:560px}.FlashcardArrayWrapper__CardHolder{align-items:center;display:flex;flex-direction:row;height:340px;justify-content:center;perspective:1000px;width:100%}.FlashcardArrayWrapper__CardHolder .FlashcardWrapper:first-child,.FlashcardArrayWrapper__CardHolder .FlashcardWrapper:nth-child(3){background:transparent;box-shadow:none;display:block!important;opacity:0;pointer-events:none;transform:translateX(-16%) rotateY(16deg) translateZ(0)!important;transform-style:preserve-3d;transition:transform .24s ease,opacity .12s linear!important}.FlashcardArrayWrapper__CardHolder .FlashcardWrapper:nth-child(3){transform:translateX(16%) rotateY(-16deg) translateZ(0)!important;z-index:5}.FlashcardArrayWrapper__CardHolder .FlashcardWrapper:nth-child(2){background:transparent;box-shadow:none;display:block!important;transform-style:preserve-3d;transition:transform .24s ease,opacity .12s linear!important;z-index:6}.FlashcardArrayWrapper__controls{align-items:center;display:flex;flex-direction:row;gap:35px;height:40px;justify-content:center;width:100%}.FlashcardArrayWrapper__controls button{align-items:center;background-color:rgba(240,248,255,0);border:none;display:flex;flex-direction:column;font-size:40px;height:100%;justify-content:center;padding:0;transition:all .12s cubic-bezier(.47,0,.745,.715)}.FlashcardArrayWrapper__controls button img{background-color:hsla(0,0%,100%,0);cursor:pointer;height:80%}.FlashcardArrayWrapper__controls button img:hover{filter:invert(91%) sepia(20%) saturate(5066%) hue-rotate(340deg) brightness(107%) contrast(101%)}.FlashcardArrayWrapper__controls--count{font-size:15px!important}@media only screen and (max-width:625px){.FlashcardArrayWrapper{width:90vw}}");function l({cards:r,controls:a,count:A,onCardChange:n,forwardRef:s,setCurrentCardIndex:l,FlashCardStyle:c,setCurrentCard:i,setIsFlipped:d,FlashCardClassName:g,FlashCardWrapperStyle:h}){const[C,p]=e.useState(0),[f,u]=e.useState([-1,0,1]),w=r.map(((e,r)=>t.default.createElement(o,{key:e.id,reset:r===C,front:e.front,back:e.back,frontChild:e.frontChild?e.frontChild:null,backChild:e.backChild?e.backChild:null,className:g,FlashCardStyle:c,onClick:(a=!1)=>{i({...e,index:r,flipped:a}),n(r),d(a)}})));e.useEffect((()=>{s&&(s.current.nextCard=B,s.current.prevCard=E)})),e.useEffect((()=>{n(C+1),l(C),i({...r[C],index:C,flipped:!1})}),[C]);const F=t.default.createElement(o,{className:"FlashcardArrayWrapper__empty"}),m=void 0!==w.length?w.length-1:0,B=()=>{const e=C+1<m?C+1:m;p(e),u(e<m?[e-1,e,e+1]:[m-1,m,-1])},E=()=>{const e=C-1>=0?C-1:0;p(e),u(0===e?[-1,0,1]:[e-1,e,e+1])};return t.default.createElement("div",{className:"FlashcardArrayWrapper",style:h},t.default.createElement("div",{className:"FlashcardArrayWrapper__CardHolder"},-1!==f[0]?w[f[0]]:F,w[f[1]],-1!==f[2]?w[f[2]]:F),(a||A)&&t.default.createElement("div",{className:"FlashcardArrayWrapper__controls"},a&&t.default.createElement("button",{onClick:()=>E()},t.default.createElement("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAAAXNSR0IArs4c6QAADo5JREFUeF7tXV2obVUV/ra3zIqLJEaYcEHBBxG5JJhRD/nQjyWGUYYkGD1kGP1Cf0+99FIR9EvQvXAjsIgyisJUvA/5UFQ+XMoHBSEhUIjACEuxsh3znHXPOfuctfYac4455hxzrm89njPH3/eNb861915zzRV4+UVgBWDtN70eMgsQJ14V2KkQMhGcrGYLLTsrhlPOFAIASMx2jrrDp7uCdnuY1wYCHbK8BIYTaasrgMSkl8AnayyzutYVgJjlNpUynnWbtYipamxgIwJoDFWm2wwCFEAzVDHRPAhsrsAUQBKqS7uN6bdeCiBJADTqBQEKoBcmWcc4AjOLFwVg2Dhbse/3rkKIqA8AKAAhXRzWJwImAvCh7T4Ja68q391gIoD2SGLGS0WAAohgvs5cVidqBCwNDJ3GkAJogD6LFCmrXVQpAIvuos9mEKAAMlPFmTUzoMbu8gqA7BvTRfe5EcgrgNzZ0V/XCHiYLymArluMxc0h0IgAPMwVc1Dy//MIZOYxg7tGBDAPLUcQgRQEKIC9b4P5Ap6UBqplk2Hy5+8AxcnLxVrxxPsNyBWgX25ZmQCBogLgBChghEOKIlBUAEUrYzAiIECAAhCAxCH9IkAB9Mtt/coauOfVC6CBIut3QjsZLI1OvQDa4ZaZEoEjCFQSwNLmGXaeVwQqCcArHMxraQjsCqDkhFwy1tLYZL3RCHAFiIaMBj0hYCcAzvQ99Um3tdgJoFvIWFhPCFAAjthse9FsJ/uDmVIAhQTgvj1cJmifVPlvgQo1XHdh7HvBDDLPqXMFMKOdjltAgAJogSWrHD1PzRE1a8oQCUATIKIODiUCxREQCaB4VksLaDbDmDkeYahkrHwPL1AASxMb691AwLEAys4o7IseEIjvGccCcE/IywDcBeAOANcO2T4K4AcATgF4wX0FTJDnAyT2wAkAvwBwcsL+jwDeCeDpRP80K4RA2goQv9IUKqdImKsAnAUQRLDtCiK4IW0lWALA9jVKIqQJoEifuQxyDYCHAFy2k908wh8H8C2XlTCpPQrrQTHfQPVyOxr5OgAPArg0IqnfA3jD5vi2io6otcmheVeAfrm9HsADAC6JZPk5AK+MtKk6/AiF/XLqYAWoSrU4+JsB/BLAcbHF/sB/JtolhKJJCgJ5V4CUDHzb3AzgXgAXzaY5PlOO3ALNeuKAgghQANNg3wbgHgAXKvjgh2AFeCVM7QTQ9r3jnVjhDNY4piBB8TWoIipNoxCwE0BUGq4G3w3g2wAuUGT1BIAb+UOYAsFCphTAJtCfAfDl4Rv+VAoeA/BWAE+lOqBdRgRm7kSyCaDtO54dwD8H4EtK6M8BeDuAvyn90LwQAtkEUChfizABg68A+LTS+SMAbgLwjNKP2LyDSUdcaxhoUa8LAVgUJkQ2hP46gPBtjeZ6GMAtAJ7VOKFteQRcCGC+bBOJhG94TgP44HR8UdxfAXgvgOfn6+CIHQREsJbBqhEBZAcjfLcfntsPjTt+yUgKj0S/L+2Jz+w10WECAksUQNjI8iMAtybgddDkhwA+AOC/3ma1rXXJhK2Eph3zdgWQRmR4MO1nw9eUGpa+C+AjAP6ncULb+gi0K4B47C4GEO7X3xhvumERfiQLH5rXSj80d4DAUgTwquFx5tcrMQ8/kn1e6aMZ87RFtpny9u5cRzPuqPjXDLu4zm9cT2EozPafBfDVFGPa+EWg9xUg7NsN+3fDPt7UKzT/JwF8M9UB7ZwgMDKr9yyAK7DCWaxxpQL+FwF8CMD3FD5oOoGAh7uMXgVw9XDbc7mi+/49vPMnbIjh1SkCPQogZfP6YXrDS61uB/DzTnlnWQMCvQkgdfP6wYb4F4B3DytIW43i4Z6iLcQi3gx3EFyfQE9sXp9JdvPf/xje6PZbOY8+wZDnv+yREytAc6SG1xCGe/WXK+j8+/A48x8O+mgOCQUASzTt4RboXQB+DCA847N3RTbuX4fHI8LLbdu9Iotut9B8mdsJoAwZ7wfwfQAvUUDyFwBvARD28fq9yuDpp/5C9U4KoFB8DeAfBvCdnc3rkmTHxzw5NP+fNYnQtl0E7FYAW0wybF5fPQasG9i8LlG3Ldg9ey8vAD2f+s3rK5zDmpvXVY2t51EVPpexuQAy4hRctbd5PSMAuUj34scMmgjH5gLIBHbIk5vXN8CMYDkTCT26aUEAx4DVaWA9unk9og24eb3HDlbW5F0A85vXZQBw87oMp8WN8iyAyM3rk2vB5ub1xVHMgrchkFcAEfcjM7Rw8zr7tggCKgHk6/eNWrl5nR92izR/CKISgEGW3LxuAKp/l0ZTqaBwTwLIsXldULLXIYWaoFCYEZTDgYHhYcPwRr5TXt6m50UArwXwa+XmdX1n12sOfe4GHgzhCKfnhEfYnzZIO8qlQgDZ4Anf9oTD5E5GZd7w4CTkkozKghSZoosjpDwI4GNxrxyJhDl3D4yEz5VRLj+5Szb0V/0QQYEAzGn5HYAbRI80GzIR69ocldiEDMYfrDGuXvHoxGNkxf5nUREIYNaHdkA4THrvNPV8pWnTktpXzrhy+CmUhGmFD8Z73I/5EvqRknVknDsBJFfSkGF+UvN7zAfn1tzC5Hc8XyyZp8Mrm8zKbtTuLdCoNj29gNlzk8WT46SaiFsgm4w9rAC7H4Ij6osYGt8ZRhZVc64afCugLXwINuqIfbeL+xrUAtECH1hzp93616BZ8Rj9IczvxJW19iU66+GHMB1vI81d9VGIrGLL6mwTZ0PXWwjNEpWPQggks/1hODkPizrJRYArh0wg4OFD8OHULsYK92GNNylZ41leSgCXYO5RAAH3VwyvJg/v7Um49pYKnuaYgF5XJjN3DV4FEDiI3BI5SdvitkTK7xS7avWkYjwLIBT00uH58duSqts34qZ4JYC9mnsXQMD9GIDTAEZfiyImZoX7scZ7ADwvtuHA7hFoQQCBhJDn1wB84jAj+8u9aOF/GMAtAJ7tnlkWuIHAVHe0IoDzImjv1YhsRNcItCSA80DqX44LnAMKvRxXtDC57pGuk2tRAIGQjw67yDT5Pz6cDfBU1wyzuK0IaBrIGNrZqXP/gIzETFbAk+vd02F4QEYihq2bORaACNoDRyTNCmbKYRtHJIng4KAdBCJawVgA6Q/pRlA5ekhehH0YGg7JexuAP0XacXjjCBgLYAqdCInKXLwDwE/jjkk9kkM4JjX4CbuUeC0EgUoCMEF396DsFY5jciflrPDCQdk3A/iNSYYjTmczKpXIQuP0JIBA4fUAHgBwiYLP8Nz6rQAeUvigaSMI9CaAAPvrADwI4NUKDl4AcPvwRKrCDU1rIiBZXXsUQMD86mEGv/wwARJQBpv/ALgDwE9qkpgzdkTtOcOa+9LU1asAwjdhV6yBswCuFDNwFMkXAdwF4IzYBweKEdA0rjjIzMBuBbBT9wonsN4RwVUKwMJH6k8B+MYRHx4YVBRWytQzTGUEEItA7Pih2zH+9U+uzfZfAPDFUk1jEScJ1gyJ1IorSb2MAEYyKQzKok6eMcN2yrFZQEkLy8ZsS13mof1R4eyx+wButm+fynwVVFsB8pUQ5Wlys33kJMbN9lGw+x3ckQDELTy62f6gtdDT4jbb+23j9Mw6EkAUCMU32wtFFVUEB+sRWKoAAnJ5NtsD9wPcbK9vxToeliyA3V8KJjbbH6Vj6xzOzfZ1+lcddekCOC+C3c32Q48n3q48AuAmAM+kspIYNzUc7RyeFG9CirCxRjbbCy33sy632d4EqcacZvhdgivAJueNbraPFmpjnW6XLgVwFNu7AYQ3S1+ggP0JADd6OAldXMNCNbQ4AQh5vhMrnMF655ui1GvyCCBhDqNxNbaphfRstzgBRJAZXsh7D4ALI2wOD813CFzDne859f4EkBftsD/4XgAXJYog4hjQxAhJZnlBSkrB0iiivAYFEFFdHpB3N9snHOi8Ap5bz5yEnidFp17EVIkHZi/UQACGxRi6nkH2yGZ7YSpVTkLP3iVOHAoxj8rWQABR8VsafN2w2f7SiKSd3gJFVND50O0CsJBc24BeM2y2v0xYRr4PwcKAHBaHAFeAOLzC6LC/OOwzPjFj6uIk9PjyerGQzd4+VwBZ7jWZCs0fzh07OZGEm5PQ84Dkn5DoOoeSuAJEI7dnEDbWhFemhHcHXTv89dHhUL9TAMLLtXxfRfq6SJBknCmAZOho2AMCFEAPLLKGZAQogGToChv6vpMwAkNWtGzUeIoCAWjcG+FCt0QgEwICAWSKRDeVEeBENkYABVC5LRm+LgIUQF38Gb0yAhRAZQIYXo+A5uaOAtDjTw+NIXBQMBRAY+TFpauZG+MitTqaAnDEnKZdNbaOICieCgUwAzkbq3hPFg1IARSFm8HUCGSekSiAWEYyExAbfmnjreFehACsQXTZlIssOp6JRQggHpYECzZcAmjjJiWhpACy0UZHLSJAAbTI2mJy1q0FEmsXApAkquHc2r8mN9oeRqAsWy4EkNQEZXFKSpFG/hFQCIAd6J9eZjiHgEIAc675f88IcPraZYcCmOrSXB2Sy49nNY3k1krZGwJoJWnbXiAKtvgqvWemZ2IFyBxFWTPNO0Agc0vlcpf3FihXVh3wnVwCMUyGLsUwrwBSMihlw8YqhXRTcZYjgKZokSVLTctw2jaKAhjQYTPpm2negz+UV/5SmofRwwhb3Gy9e8DPSw5cAbwwwTyqIHBAAIVmHbMwZo6rEMOgZRCotgKwXcsQzCjbEcgkgIh2jhhK8rQIEOw5BDMJYC4M/08EfCJAAUTwwvk0AqxGhlIAjRDFNG0QoABscKXXRhBIEwDvBRqhl2nOIZAmgDmvlf5fTpflIlWCcjFhuxJAn6xRbJa8UgCW6NK3ewQoAPcUMUFLBCgAS3Tp2z0CmQTg6D7VUSrj7MsSlI1y31/uE8wkAPd1MkEiMIoABSBpjMrTsUV4C58SKL2NcSGA7siIKChiqLfe6SKf/wNsfE7fWhXE9AAAAABJRU5ErkJggg=="})),A&&t.default.createElement("span",{className:"FlashcardArrayWrapper__controls--count"},C+1,"/",w.length),a&&t.default.createElement("button",{onClick:()=>B()},t.default.createElement("img",{src:"data:image/png;base64,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"}))))}l.propTypes={cards:A.default.arrayOf(Object).isRequired,controls:A.default.bool,count:A.default.bool,onCardChange:A.default.func,forwardRef:A.default.object,setCurrentCardIndex:A.default.func,FlashCardStyle:A.default.object,FlashCardClassName:A.default.string,FlashCardWrapperStyle:A.default.object,setIsFlipped:A.default.func,setCurrentCard:A.default.func},l.defaultProps={controls:!0,count:!0,onCardChange:()=>{},forwardRef:null,setCurrentCardIndex:()=>{},FlashCardStyle:{},FlashCardClassName:"",FlashCardWrapperStyle:{},setCurrentCard:()=>{},setIsFlipped:()=>{}},exports.Flashcard=o,exports.FlashcardArray=l;
