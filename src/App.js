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
      console.dir(books);
    })
  }
  moveToShelf = (book, shelf) => {
        console.log("book is to be moved", book, shelf)
        //this.setState({() => this.state.books[id]})
        //this.state.books.filter((book) => (book.shelf.trim() === shelf.trim
        BooksAPI.update(book,shelf).then((res) =>{
          console.log("Book added", res)
          let index = this.state.books.findIndex((b) => b.id === book)
          let updatedBooks = this.state.books
          updatedBooks[index].shelf = shelf
          console.log("updatedBooks",updatedBooks)
          //updatedBooks = res
          //We need to do the above through setState using map /filter/reduce/whatever
          this.setState({
            //books:this.state.books.filter((b) => b.shelf != '')
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
                moveTo={(id, selectedShelf) => this.moveToShelf(id, selectedShelf)}
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
