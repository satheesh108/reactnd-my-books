import React from 'react';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books:[]
    //{currentlyReading:[],read:[], wantToRead:[]}
    //TODO - change the logic based on the above
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books})
    })
  }

  moveToShelf = (bookId, shelf, book) => {
        console.log("book is to be moved", book, shelf)
        shelf.select = true;
        shelf = shelf.value;
        BooksAPI.update(bookId,shelf).then((res) =>{
          console.log("Book added", res)
          let tempBooks = this.state.books;
          let index = tempBooks.findIndex((b) => b.id === bookId)
          if(index) {
            tempBooks[index].shelf = shelf;
          } else {
            book.shelf = shelf
            tempBooks.push(book);
          }

          this.setState({
            books:tempBooks
          })
        })
  }

  render() {
    //Here goes the actual render
    const shelfs = ['currentlyReading', 'read', 'wantToRead']
    return(
          <div className='app'>
            <Route path='/Search' render={ ({history}) => (
              <SearchBooks
                closeSearch={ () => history.push('/')  }
                moveTo={(id, selectedShelf, book) => this.moveToShelf(id, selectedShelf, book)}
                shelves={shelfs}
              />
            )}/>

            <Route path='/' exact render={() => (
              <div className="list-books">
                  <div className="list-books-title">
                    <h1>My Reads</h1>
                  </div>
                  {shelfs.map((shelf)=>(
                    <ListBooks
                        key={shelf}
                        books={this.state.books.filter((book) => (book.shelf === shelf))}
                        shelf={shelf}
                        shelves={shelfs}
                        addBook={() => this.setState({ showSearchPage: true })}
                        moveTo={(id, selectedShelf) => this.moveToShelf(id, selectedShelf)}
                        />
                  ))}
              </div>
            )}/>
      </div>
    )
  }
}

export default BooksApp
