import React from 'react'
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import * as BookUtils from './BookUtils'
import './App.css'
import BookCase from'./component/BookCase'
import Search from'./component/Search'

class BooksApp extends React.Component {
  state ={
    books:[],
    newBook:false
  }

  changeSelf=(book, shelf) =>{
    BooksAPI.update( book,shelf).then((response)=>{
      let newList = this.state.books.slice(0);
      const books = newList.filter(listBook =>listBook.id===book.id);
      if(books.length){
        books[0].shelf=shelf;
      }else{
        newList.push(book);
        newList = BookUtils.sortAllBooks(newList);
      }
      this.setState({books:newList});
    })
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
      <div className="app">
        <Route exact path="/" render ={()=>(
          <BookCase 
            books={this.state.books} 
            onRefreshAllBooks={this.refreshAllBooks}
            onChangeSelf={this.changeSelf}/>
          )}/>
        <Route exact path="/search" render ={()=>(
          <Search 
            selectedBooks={this.state.books}
            onChangeSelf={this.changeSelf}/>
        )}/>
      </div>      
    )
  }
}

export default BooksApp
