import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import * as BookUtils from '../BookUtils'
import Book from'./Book'

class Search extends Component {
	state={
		query:"",
		books:[],
		quickView:{},
		showModal:false
	};
	queryTimer=null;

	changeQuery=(value)=>{
		clearTimeout(this.queryTimer);
		this.setState({query:value.trim()});
		this.queryTimer=setTimeout(this.updateSearch,150);
	}

	updateSearch=()=>{
		if(this.state.query === ""){
			this.setState({error:false, books:[]});
			return;
		}
		BooksAPI.search(this.state.query).then((response) =>{
			let newList =[];
			let newError = false;
			if(response === undefined || (response.error&& response.error !== "empty query")){
				newError=true;
			}else if(response.length){
				newList=BookUtils.mergeShelfAndSearch(this.props.selectedBooks,response);
				newList = BookUtils.sortAllBooks(newList);
			}
			this.setState({error:newError, books:newList})
		})
	}

	componentWillReceiveProps=(props)=>{
		this.props=props;
		let newList= BookUtils.mergeShelfAndSearch(this.props.selectedBooks, this.state.books);
		newList = BookUtils.sortAllBooks(newList);
		this.setState({ books:newList})
	}

	render() {
		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(e)=>this.changeQuery(e.target.value)} value={this.state.query.value}/>
              </div>
            </div>
            <div className="search-books-results">
            	{!this.state.error &&(<span className="search-count">{this.state.books.length}&nbsp;books match your search</span>)}
              <ol className="books-grid">
              	{this.state.books && this.state.books.map(book =>(
              		<li key={book.id}>
              			<Book book={book} 
              				onChangeShelf={this.props.onChangeShelf} 
              				onUpdateQuickView={this.updateQuickView}/>
              		</li>
              		))}
              </ol>
            </div>
          </div>
		)
	}
}

export default Search;
