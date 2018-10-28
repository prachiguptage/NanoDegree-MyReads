import React,{Component} from 'react'
import '../App.css'
import BookShelf from'./BookShelf'
import Search from'./Search'

class BookCase extends Component {
	state={
		showSearchPage: false
	}

	componentDidMount = ()=>{
		this.props.onRefreshAllBooks();
	}

	updateShelves =()=>{
		const newCurrent ={
			name:"Currently Reading",
			books:this.props.books.filter(book=> book.shelf === 'currentlyReading')
		};
		const newWant ={
			name:"Want to Read",
			books:this.props.books.filter(book=> book.shelf === 'wantToRead')
		};
		const newRead ={
			name:"Read",
			books:this.props.books.filter(book=> book.shelf === 'read')
		};

		return ([newCurrent,newWant,newRead]);
	}

	render() {
		let shelves =[];
		if(this.props.books && this.props.books.length)
			shelves=this.updateShelves();
		return(
			 <div className="app">
        {this.state.showSearchPage ? (
          <Search/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
              	{shelves && shelves.map((shelf)=>(<BookShelf
              		key={shelf.name}
              		shelf={shelf}
              		onChangeSelf={this.props.onChangeSelf}/>))}
                
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
		)
	}
}

export default BookCase;
