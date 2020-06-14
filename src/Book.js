import React from 'react';

class Book extends React.Component {

    onChangeHandler(event){
        return this.props.onBookShelfChange(this.props.shelf, event.target.value, this.props.listIndex);
    }

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url("' + this.props.imageSrc + '")' }}></div>
                    <div className="book-shelf-changer">
                        <select id={this.props.shelf + "-" + this.props.listIndex} value={this.props.shelf} onChange={this.onChangeHandler.bind(this)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.author}</div>
                </div>
            </li>
        )
    }
}

export default Book