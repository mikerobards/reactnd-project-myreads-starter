import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

import Book from './Book'


class SearchPage extends Component {
  state = {
    query: '',
    searchBooks: []
  }

updateQuery = (query) => {
  this.setState({
    query: query
  })
}

getSearchBooks = () => {
  BooksAPI.search(query).then((searchBooks) => {
    this.setState({ searchBooks })
  })
}

  render () {
    if (this.state.query) {

    } else {
      this.setState ({ searchBooks })
    }

    return (

    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
