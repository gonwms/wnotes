## wrapper by character

```javascript
function wrapEachCharacter(element) {
  const originalHtml = element.outerHTML // outer to inclute de p tag if starts with a string it won't work
  const wrappedHtml = wrapCharactersWithSpanTag(originalHtml)
  const finalHtml = preserveSpaces(wrappedHtml)
  element.innerHTML = finalHtml
}
function wrapCharactersWithSpanTag(htmlContent) {
  const textBetweenTagsExpression = />([^<>]+)</g
  return htmlContent.replace(
    textBetweenTagsExpression,
    (match, textContent) =>
      ">" +
      textContent
        .split("")
        .map((char) => (char.trim().length ? `<span>${char}</span>` : char))
        .join("") +
      "<"
  )
}
function preserveSpaces(htmlContent) {
  return htmlContent.replace(/(<span> <\/span>)+/g, (match) =>
    match.replace(/ /g, "&nbsp;")
  )
}
// USAGE
// wrapEachCharacter(document.querySelector("#div1"))
```

## wrapper by word

```javascript
function wrapEachWord(element) {
  const originalHtml = element.outerHTML // outer to inclute de p tag if starts with a string it won't work
  const wrappedHtml = wrapEachWordWithSpan(originalHtml)
  element.innerHTML = wrappedHtml
}
function wrapEachWordWithSpan(htmlContent) {
  const textBetweenTagsExpression = />([^<>]+)</g
  return htmlContent.replace(
    textBetweenTagsExpression,
    (match, textContent) =>
      ">" +
      textContent
        .split(" ")
        .map((word) => (word.length ? `<span>${word}</span>` : ""))
        .join(" ") +
      "<"
  )
}
// USAGE
//wrapEachWord(document.querySelector("#div2"))
```

## wrapper elements

```javascript
function wrapElements(selector, myClass) {
  var element = document.querySelectorAll(selector)
  element.forEach((el) => {
    var wrapedElement = `<div class="${myClass}"><div class="${myClass}-inner">${el.outerHTML}</div></div>`
    el.outerHTML = wrapedElement
  })
}
```

## RANDOMIZER MIN MAX TWO DECIMALS

```javascript
function randomMinMaxDecimal(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
```
