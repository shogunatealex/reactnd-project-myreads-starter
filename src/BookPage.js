import React from 'react';
import Book from './Book';
import BookList from './BookList';
import { Link } from 'react-router-dom';

class BookPage extends React.Component {

    constructor(props){
        super(props);
        this.bookLists = props.books;
        this.shelves = [
          ['Currently Reading', 'currentlyReading'],
          ['Want to Read', 'wantToRead'],
          ['Read', 'read'],
        ]
    }

    onBookShelfChangeHandler = (shelf, targetShelf, index) =>{
        return this.props.onBookShelfChangeHandler(shelf, targetShelf, index);
    }

    render() {
        return (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      {this.shelves.map((shelf) => (
                        <BookList title={shelf[0]}>
                          {this.props.bookLists[shelf[1]].map( (book,index) => {
                            return <Book  shelf={shelf[1]} 
                                          listIndex={index} 
                                          key={"currently-reading-" + index} 
                                          onBookShelfChange={this.onBookShelfChangeHandler.bind(this)} 
                                          title={book.title} 
                                          author={book.author} 
                                          imageSrc={book.imageSrc}/>
                          })}
                        </BookList>
                      ))}
                    </div>
                  </div>
                  <div className="open-search">
                    <Link to="/search"><button >Add a book</button></Link>
                  </div>
                </div>
              )
            }

}

export default BookPage