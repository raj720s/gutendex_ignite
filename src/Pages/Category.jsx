import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./category.scss";

function Category() {
  const params = useParams();
  const { cat, keyword } = params;
  const navigate = useNavigate();
  console.log(params);

  const [genre, setGrnre] = useState(""); // category setter
  const [search_word, set_search_word] = useState(""); // sets the search input
  //if keyword is present in the url
  const [param_search, set_param_search] = useState(keyword ? keyword : "");

  const [raw_data, setRawdata] = useState();

  const [books_loading, set_books_loading] = useState(false);
  let [book_state, set_book_state] = useState([]);
  const [books, setBooks] = useState([]);

  const [category_books, setCategoryBooks] = useState([]);
  const [searched_books, setSearchedBooks] = useState([]);

  const { count, next, previous, results } = book_state;

  const [book_formats, set_formats] = useState([]);

  function enterTrigger(e) {
    // to invoke search on pressing enter
    if (e.charCode == 13) {
      searchTrigger();
    }
  }

  function searchTrigger() {
    // console.log(search_word);
    if (search_word) {
      navigate(`/category/${genre}/search/${search_word}`);
    }
  }

  useEffect(() => {
    const get_cat_books = async (genre) => {
      const cat_books = await axios.get(
        `/books?topic=${genre}&mime_type=image%2F`
      );
      // console.log("cat_books", cat_books.data);
      set_book_state(cat_books.data);
      console.log("bookstate", book_state);
      if (results) setCategoryBooks(results);
      console.log(category_books);
    };

    const find_books_by_search = async (keyword) => {
      const res = await axios.get(`?search=${keyword}%20great`);
      return console.log("search total", res.data);
    };

    set_books_loading(true);
    if (cat) {
      setGrnre(cat);
      get_cat_books(cat);
    }
    if (keyword) {
      set_param_search(keyword);
      set_search_word(keyword);
      console.log("parm", param_search);
      find_books_by_search(keyword);
    }
    if (book_formats > 0) {
      // book_formats.forEach((format) => {
      console.log("format", book_formats);
      // });
    }
    if (results) set_books_loading(false);
  }, [params, navigate, book_state.count, book_formats, search_word]);

  return (
    <div className="category-page">
      <header className="category-header">
        <div className="arrow">
          <Link to={"/"}>
            <i className="uil uil-arrow-left"></i>
          </Link>
        </div>
        <div className="genre">
          <h2>{genre} </h2>
        </div>
      </header>

      <div className="search-box">
        <i className="uil uil-search" onClick={searchTrigger}></i>
        <input
          type="search"
          className="search-input"
          onChange={(e) => set_search_word(e.target.value)}
          onKeyPress={enterTrigger}
          placeholder="search or enter books and more"
          value={search_word}
        />
      </div>

      {books_loading ? (
        <div>loading..</div>
      ) : (
        <main className="container-book">
          {category_books.map((book) => {
            return (
              <div className="book-card" key={book.id}>
                <div
                  className="cover"
                  onClick={() => {
                    console.log(book.formats);
                    set_formats(book.formats);
                  }}
                >
                  <img
                    src={
                      book.formats["image/jpeg"]
                        ? book.formats["image/jpeg"]
                        : "/logo192.png"
                    }
                    alt={book.title}
                  />
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title} </h3>
                  <p className="book-author">{book.authors["name"]}</p>
                </div>
              </div>
            );
          })}
          {/* <div className="book-card">
            <div className="cover">
              <img src="/logo192.png" alt="book" />
            </div>
            <div className="book-info">
              <h3 className="book-title">think and grow rich</h3>
              <p className="book-author">author</p>
            </div>
          </div> */}
        </main>
      )}
    </div>
  );
}

export default Category;
