import React from 'react';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import './App.css';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
  }
  listSearch = (book) => {
    console.log(book);
    BooksAPI.search(book).then((books) => {
      console.log(books)
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
                listSearch={this.listSearch}
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

/*
  NOTES: The search from BooksAPI is limited to a particular set of search terms.
  You can find these search terms here:
  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  you don't find a specific author or title. Every search is limited by search terms.
*/

export default BooksApp
