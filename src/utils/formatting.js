export function capitalize(text) {
  return text
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase())
}
