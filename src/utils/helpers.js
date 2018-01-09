export function sentensise (str = '') {
  return (
    typeof str !== 'string'
    ? ''
    : (str[0].toUpperCase() + str.slice(1)).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
  )
}
