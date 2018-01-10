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
    console.log(books)
    })
  }
  // moveToShelf = (book, shelf) => {
  //       console.log("book is to be moved", book, shelf)
  //       //this.setState({() => this.state.books[id]})
  //       //this.state.books.filter((book) => (book.shelf.trim() === shelf.trim()))
  //       BooksAPI.update(book,shelf).then((res) =>{
  //         console.log("Book added", res);
  //       })
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
            moveTo={(b,s) => this.props.moveTo(b,s)}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
