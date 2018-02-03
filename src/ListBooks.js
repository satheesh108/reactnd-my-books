import React, {Component} from 'react';
import {sentensise} from './utils/helpers';
import {Link} from 'react-router-dom';

class ListBooks extends Component {
  render(){
    return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.shelf && sentensise(this.props.shelf)}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {this.props.books.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          {<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>}
                          <BookShelfChanger
                            moveTo={this.props.moveTo}
                            id={book.id}
                            currentShelf={book.shelf}
                            shelves={this.props.shelves}
                            book={book}
                          />
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors && book.authors.map((author) => (author + ' '))}</div>
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
            <div className="open-search">
              <Link to="/Search">
                Add a book
              </Link>
            </div>
          </div>
    )
  }
}

class BookShelfChanger extends Component {
  render(){
    let {moveTo, id, currentShelf, shelves, book} = this.props
    console.log("book - moveTo", book);
    return (
      <div className="book-shelf-changer">
        <select value={currentShelf} onChange={(event) => moveTo(id, event.target, book)}>
          <option value="none" disabled>Move to...</option>
          <option value="none">None</option>
          {shelves.map((shelf) => (
            <option
              key={shelf}
              value={shelf}
              selected={currentShelf === shelf}
              >
                {sentensise(shelf)}
              </option>
          ))}
        </select>
        {/*className={(currentShelf === shelf)? 'book-shelf-selected': ''}*/}
      </div>
    )
  }
}
export default ListBooks
