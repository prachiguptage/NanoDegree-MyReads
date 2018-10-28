import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as BookUtils from './BookUtils'
import './App.css'
import BookCase from'./component/BookCase'

class BooksApp extends React.Component {
  state ={
    books:[],
    newBook:false
  }

  componentDidMount=() =>{
    if(this.state.newBook){
      this.refreshAllBooks();
    }
  }

  refreshAllBooks=()=>{
    BooksAPI
      .getAll()
      .then((list)=>{
        this.setState({
          books: BookUtils.sortAllBooks(list),
          newBook: false
        });
      })
  }
 
  render() {
    return (
      <BookCase books={this.state.books} onRefreshAllBooks={this.refreshAllBooks}/>
    )
  }
}

export default BooksApp
