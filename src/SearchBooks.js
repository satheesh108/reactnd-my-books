import React, {Component} from 'react';
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";

class SearchBooks extends Component{
  state = {
      books: []
  }
  searchBooks = (book) => {
    BooksAPI.search(book.trim()).then((books) => {
      if(books)
        this.setState({books})
    })
  }
  // moveToShelf = (id, shelf, book) {
  //   let tempBooks = this.state.books;
  //   let index = tempBooks.findIndex((b) => b.id === bookId)
  //   tempBooks[index].shelf = shelf;
  //   this.setState({
  //     books:tempBooks
  //   })
  // }

  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.closeSearch}>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event)=>this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {console.log("searchBooks", this.state.books)}
          {/*<ol className="books-grid"></ol>*/}
          <ListBooks
            books={this.state.books}
            // moveTo={(bookId,shelf, book) => this.props.moveToShelf(bookId,shelf, book)}
            moveTo={this.props.moveTo}
            shelves={this.props.shelves}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
