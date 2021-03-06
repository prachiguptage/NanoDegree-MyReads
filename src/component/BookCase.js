import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import BookShelf from'./BookShelf'

class BookCase extends Component {
	state={
		
	}

	componentDidMount = ()=>{
		this.props.onRefreshAllBooks();
	}

	updateShelves =()=>{
		const bookList = this.props.books;
		const newCurrent ={
			name:"Currently Reading",
			books:bookList.filter(book=> book.shelf === 'currentlyReading')
		};
		const newWant ={
			name:"Want to Read",
			books:bookList.filter(book=> book.shelf === 'wantToRead')
		};
		const newRead ={
			name:"Read",
			books:bookList.filter(book=> book.shelf === 'read')
		};

		return ([newCurrent,newWant,newRead]);
	}

	render() {
		let shelves =[];
		if(this.props.books && this.props.books.length)
			shelves=this.updateShelves();
		return(
			
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              	{shelves && shelves.map((shelf)=>(<BookShelf
              		key={shelf.name}
              		shelf={shelf}
              		onChangeShelf={this.props.onChangeShelf}/>))}
                
              </div>
            </div>
            <div className="open-search">
              <Link  to="/search">Add a book</Link>
            </div>
          </div>
       
		)
	}
}

export default BookCase;
