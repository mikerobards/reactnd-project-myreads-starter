import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';


class SearchPage extends Component {
  state = {
    query: '',
    searchBooks: []
  }

updateQuery = (query) => {
  this.setState({
    query: query
  })
  this.updateSearchBooks(query);
}

updateSearchBooks = (query) => {
  if(query){
    BooksAPI.search(query).then((searchBooks) => {
      if (searchBooks.error) {
        this.setState({ searchBooks: [] });
      } else {
        this.setState({ searchBooks: searchBooks });
      }
    })
  } else {
    this.setState({ searchBooks: [] });
  }
}

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
              />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map(searchBook => (
              <li key={searchBook.id}>
                <Book
                  book={searchBook}
                  placeShelf={this.props.placeShelf}
                />
              </li>
            ))}

          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
