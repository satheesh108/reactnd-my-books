export function sentensise (str = '') {
  return (
    typeof str !== 'string'
    ? ''
    : (str[0].toUpperCase() + str.slice(1)).match(/[A-Z][a-z]+|[0-9]+/g).join(" ")
  )
}

//This function will return a flat array. This is used to copy the array
export function updateBook(books, selectedBook) {
    return books.map( (book, index) => {
        if(index !== selectedBook.index) {
            // This isn't the item we care about - keep it as-is
            return book;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...book,
            ...selectedBook.shelf
        }
   })
 }
