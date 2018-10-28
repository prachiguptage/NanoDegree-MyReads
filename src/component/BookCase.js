import React,{Component} from 'react'
import '../App.css'
import BookShelf from'./BookShelf'
import Search from'./Search'

class BookCase extends Component {
	state={
		showSearchPage: false
	}

	render() {
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
                <BookShelf/>
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
