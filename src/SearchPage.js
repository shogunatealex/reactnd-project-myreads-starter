import React from 'react';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import Book from './Book';

class SearchPage extends React.Component {

    state = {
      searchTerm: '',
      bookList: []
    }

    handleChange = async (query) => {
      const books = await search(query)
      this.setState({
        searchTerm: query.trim(),
        bookList: (books && !books.error) ? books : []})
    }

    onBookShelfAddHandler(targetShelf, book){

      const bookToAdd = {
        id: book.id,
        title: book.title,
        author: book.authors.join(', '),
        imageSrc: book.imageLinks.thumbnail
      }

      return this.props.onBookShelfAddHandler(bookToAdd, targetShelf);
    }


    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search" >Close</button></Link>
              <div className="search-books-input-wrapper">
                <form>
                  <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleChange(event.target.value)}/>
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.bookList.map((book,index) =>{
                  return <Book  shelf='none' 
                  listIndex={index} 
                  key={"read-" + index} 
                  title={book.title} 
                  author={book.author} 
                  onBookShelfChange={(shelf, targetShelf, index) => {this.onBookShelfAddHandler(targetShelf, book) }} 
                  imageSrc={book.imageLinks.thumbnail}/>
                  })
                }
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchPage