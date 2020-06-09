import React from 'react';

class BookList extends React.Component {

    constructor(props){
        super(props)
        this.title = props.title;
    }
    render() {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.children}
              </ol>
            </div>
          </div>
        )
    }
}

export default BookList