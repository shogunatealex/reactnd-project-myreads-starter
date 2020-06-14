import React from 'react';

class Book extends React.Component {

    constructor(props){
        super(props)
        this.author = props.author;
        this.title = props.title;
        this.imageSrc = props.imageSrc;
        this.onBookShelfChangeHandler = props.onBookShelfChange
        this.index = props.listIndex
        this.shelf = props.shelf
    }

    onChangeHandler(event){
        return this.onBookShelfChangeHandler(this.shelf, event.target.value, this.index);
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("' + this.imageSrc + '")' }}></div>
                    <div className="book-shelf-changer">
                        <select id={this.shelf + "-" + this.index} value={this.shelf} onChange={this.onChangeHandler.bind(this)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.title}</div>
                    <div className="book-authors">{this.author}</div>
                </div>
            </li>
        )
    }
}

export default Book