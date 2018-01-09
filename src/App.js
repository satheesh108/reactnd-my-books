import React from 'react';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>{
      this.setState({books})
      console.dir(books);
    })
  }
  moveToShelf = (book, shelf) => {
        console.log("book is to be moved")
        //this.setState({() => this.state.books[id]})
        //this.state.books.filter((book) => (book.shelf.trim() === shelf.trim()))
  }

  render() {
    //Here goes the actual render
    const shelfs = ['currentlyReading', 'read', 'wantToRead']
    return(
          <div className='app'>
            <Route path='/Search' render={ ({history}) => (
              <SearchBooks
                closeSearch={ () => history.push('/')  }
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
                        books={this.state.books.filter((book) => (book.shelf.trim() === shelf.trim()))}
                        shelf={shelf}
                        addBook={() => this.setState({ showSearchPage: true })}
                        moveTo={(id, selectedShelf) => this.moveToShelf(id, selectedShelf)}/>
                  ))}
              </div>
            )}/>
      </div>
    )
  }
}

export default BooksApp
