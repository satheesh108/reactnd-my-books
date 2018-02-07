export function sentensise (str = '') {
  return (
    typeof str !== 'string'
    ? ''
    : (str[0].toUpperCase() + str.slice(1)).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
  )
}

//This function will return a flat array. This is used to copy the array
export function updateBook(state, selectedBook, shelf, bookId) {
  const {books} = state
  let index = books.findIndex((b) => b.id === bookId)
    //return (
       if (!selectedBook) {
          return books.map((book, i) => {
              if(i !== index) {
                return book
              }
              book.shelf = shelf
              return {
                book
              }
            })
        } else {
          selectedBook.shelf = shelf
          return books.concat(selectedBook)
        }
    //)
 }
