import React from 'react'
import { getAll, update } from './BooksAPI';
import './App.css'
import  BookPage  from './BookPage';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
    state = {
      bookLists: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
        none: [],
      }
    }

  componentDidMount(){
      getAll().then(books => {

        let newBookLists = {
          currentlyReading: [],
          wantToRead: [],
          read: [],
          none: [],
        }

        books.forEach((book) => {
          newBookLists[book.shelf].push({
            id: book.id,
            title: book.title,
            author: book.authors && book.authors.join(', '),
            imageSrc: book.imageLinks && book.imageLinks.thumbnail
          })
        })

        this.setState({
          bookLists: newBookLists
        })
      })

  }


  onBookShelfChangeHanlder(previousShelf, targetShelf, index){
      let currentState = this.state.bookLists;
      const bookToBeMoved = currentState[previousShelf][index];

      update(bookToBeMoved, targetShelf).then((response) => {
        currentState[targetShelf].push(...currentState[previousShelf].splice(index, 1));

        this.setState({
          bookLists: currentState
        })
      })
  }

  onBookShelfAddHandler(book, targetShelf){
    let currentState = this.state.bookLists;

    update(book, targetShelf).then((response) => {
      currentState[targetShelf].push(book);
      this.setState({
        bookLists: currentState
      })
    })
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() =>(
          <BookPage 
          bookLists={this.state.bookLists} 
          onBookShelfChangeHandler={this.onBookShelfChangeHanlder.bind(this)}/>
        )}/>
        <Route exact path="/search" render={() => (
          <SearchPage 
          bookLists={this.state.bookLists} 
          onBookShelfAddHandler={this.onBookShelfAddHandler.bind(this)}
          onBookShelfChangeHandler = {this.onBookShelfChangeHanlder.bind(this)} />
        )} />
      </div>
    )
  }
}

export default BooksApp
