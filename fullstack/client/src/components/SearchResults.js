// src/components/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const [results, setResults] = useState({ books: [], authors: [] });
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    if (query) {
      fetchSearchResults(query);
    }
  }, [location]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      // Search for books
      const bookResponse = await fetch(`http://localhost:3000/api/books?title=${encodeURIComponent(query)}`);
      const bookData = await bookResponse.json();

      if (bookData.length > 0) {
        setResults({ books: bookData, authors: [] });
      } else {
        // If no books found, search for authors
        const authorResponse = await fetch(`http://localhost:3000/api/authors?name=${encodeURIComponent(query)}`);
        const authorData = await authorResponse.json();
        setResults({ books: [], authors: authorData });
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      {results.books.length === 0 && results.authors.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <>
          {results.books.length > 0 && (
            <div>
              <h3>Books</h3>
              <ul>
                {results.books.map((book) => (
                  <li key={book._id}>{book.title} by {book.author}</li>
                ))}
              </ul>
            </div>
          )}
          {results.authors.length > 0 && (
            <div>
              <h3>Authors</h3>
              <ul>
                {results.authors.map((author) => (
                  <li key={author._id}>{author.name}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;