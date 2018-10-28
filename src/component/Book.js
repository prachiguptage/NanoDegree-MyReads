import React,{Component} from 'react'
import Changer from'./Changer'

class Book extends Component {
	state={
		shelfSelection: this.props.book.shelf || "none"
	}
	render() {
		const book =this.props.book;
		const authors = book.authours && book.authors.join('|');

		let url =(book.imageLinks && `url(${book.imageLinks.thumbnail})`);
		return(
			<div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: url }}></div>
                	<Changer 
                		book={book}
                		onChangeShelf={this.props.onChangeShelf}/>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{authors}</div>
            </div>
		)
	}
}

export default Book;