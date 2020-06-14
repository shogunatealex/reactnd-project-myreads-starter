import React from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import Book from './Book';

class SearchPage extends React.Component {

    state = {
      searchTerm: '',
      bookList: []
    }


    search = async (query) => {
      let books = await search(query)
      let { bookLists } = this.props;
      books && !books.error && books.forEach((book) =>{
        if(bookLists.currentlyReading.find(currentlyReadingBook => currentlyReadingBook.id === book.id)){
          book.shelf='currentlyReading';
        }
        if(bookLists.wantToRead.find(wantToReadBook => wantToReadBook.id === book.id)){
          book.shelf="wantToRead";
        }
        if(bookLists.read.find(readBook => readBook.id === book.id)){
          book.shelf="read"
        }
      })
      this.setState({
        bookList: (books && !books.error) ? books : []})
    }

    handleChange = (query) => {
      this.search(query);
      this.setState({
        searchTerm: query.trim(),
      })
    }

    onBookShelfChangeHandler = (previousShelf, targetShelf, index) =>{
      let { bookLists, onBookShelfChangeHandler } = this.props;
      const bookToChange = this.state.bookList[index];
      const bookToSearchFor = bookLists[previousShelf].find(book => book.id === bookToChange.id)
      const bookIndex = bookLists[previousShelf].indexOf(bookToSearchFor)

      let currentState = this.state.bookList;
      currentState[index].shelf = targetShelf;
      this.setState({
        bookList: currentState
      })

      return onBookShelfChangeHandler(previousShelf, targetShelf, bookIndex);
    }

    onBookShelfAddHandler = (targetShelf, book, index) => {

      const bookToAdd = {
        id: book.id,
        title: book.title,
        author: book.authors && book.authors.join(', '),
        imageSrc: book && book.imageLinks && book.imageLinks.thumbnail
      }

      let currentState = this.state.bookList;
      currentState[index].shelf = targetShelf;
      this.setState({
        bookList: currentState
      })

      return this.props.onBookShelfAddHandler(bookToAdd, targetShelf);
    }


    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search" >Close</button></Link>
              <div className="search-books-input-wrapper">
                <form>
                  <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={(event) => this.handleChange(event.target.value)}/>
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.bookList.map((book,index) =>{
                  return <Book  shelf={book.shelf || 'none'}
                                listIndex={index} 
                                key={"read-" + index} 
                                title={book.title} 
                                author={book.author} 
                                onBookShelfChange={(shelf, targetShelf, index) => {book.shelf ? this.onBookShelfChangeHandler(shelf, targetShelf, index) 
                                                                                              : this.onBookShelfAddHandler(targetShelf, book, index) }} 
                                imageSrc={book && book.imageLinks && book.imageLinks.thumbnail}/>
                  })
                }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchPage