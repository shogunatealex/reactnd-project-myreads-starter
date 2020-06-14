import React from 'react';
import Book from './Book';
import BookList from './BookList';
import { Link } from 'react-router-dom';

class BookPage extends React.Component {

    constructor(props){
        console.log(props.books);
        super(props);
        this.bookLists = props.books;
    }

    onBookShelfChangeHandler(shelf, targetShelf, index){
        return this.props.onBookShelfChangeHandler(shelf, targetShelf, index);
    }

    render() {
        console.log(this.props);
        return (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      <BookList title="Currently Reading">
                        {this.props.bookLists.currentlyReading.map( (book,index) => {
                          return <Book  shelf='currentlyReading' 
                                        listIndex={index} 
                                        key={"currently-reading-" + index} 
                                        onBookShelfChange={this.onBookShelfChangeHandler.bind(this)} 
                                        title={book.title} 
                                        author={book.author} 
                                        imageSrc={book.imageSrc}/>
                        })}
                      </BookList>
                      <BookList title="Want to Read">
                      {this.props.bookLists.wantToRead.map( (book, index) => {
                          return <Book  shelf='wantToRead' 
                                        listIndex={index} 
                                        key={"want-to-read-" + index} 
                                        onBookShelfChange={this.onBookShelfChangeHandler.bind(this)} 
                                        title={book.title} 
                                        author={book.author} 
                                        imageSrc={book.imageSrc}/>
                        })}
                      </BookList>
                      <BookList title="Read">
                        {this.props.bookLists.read.map((book, index) => {
                            return <Book  shelf='read' 
                                          listIndex={index} 
                                          key={"read-" + index} 
                                          onBookShelfChange={this.onBookShelfChangeHandler.bind(this)} 
                                          title={book.title} 
                                          author={book.author} 
                                          imageSrc={book.imageSrc}/>
                          })}
                      </BookList>
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