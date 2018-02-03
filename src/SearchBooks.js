import React, {Component} from 'react';
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";

class SearchBooks extends Component{
  state = {
      books: []
  }
  searchBooks = (book) => {
    console.log(book);
    BooksAPI.search(book.trim()).then((books) => {
    this.setState({books})
    console.log("searched books",books)
    })
  }

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
            moveTo={(bookId,shelf, book) => this.props.moveTo(bookId,shelf, book)}
            shelves={this.props.shelves}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
