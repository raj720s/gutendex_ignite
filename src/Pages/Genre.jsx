import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./genre.scss";

function Genre() {
  const params = useParams();
  const navigate = useNavigate();
  // ------ vars
  const { cat, keyword } = params;

  //---- states
  const [cat_books, setCatBooks] = useState([]);
  const [searched_books, setSearchedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search_input, set_search_input] = useState(keyword ? keyword : "");
  const [book_results, setBookResults] = useState([]); // results on api fetch
  const { count, next, previous, results } = book_results;

  const [book_data, setBookData] = useState([]); // initial array of books 32 el
  const [display_books, setDisplaybooks] = useState();
  const [nxt, setNxt] = useState("");
  const [nxt_results, setNxtresults] = useState([]);

  const [prev, setPrev] = useState("");
  // const [frmats, setFormats] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    navigate(`/genre/${cat}/search/${search_input}`);

    setLoading(true);
  }

  const get_cat_books = async (genre) => {
    setLoading(true);
    const cat_books = await axios.get(
      `/books?topic=${genre}&mime_type=image%2F`
    );
    setBookResults(cat_books.data);
    setCatBooks(cat_books.data.results);
    // setBookData(cat_books);
  };

  const get_searched_books = async (cat, word) => {
    setLoading(true);
    const key_wrd = word.replace(/ /g, "%20");
    const url = `/books?search=${key_wrd}%20&mime_type=image%2F`;
    const search_resut = await axios.get(url);
    setBookResults(search_resut.data);
    setSearchedBooks(search_resut.data.results);
  };

  const get_next_books = async (nxt) => {
    const res = await axios.get(nxt);
    const data = res.data.results;
    setNxtresults(res.data);

    console.log("next data", nxt_results);
    setNxt(nxt_results.results);
  };

  useEffect(() => {
    console.log("params", params);
    if (cat) {
      get_cat_books(cat);
    }
    if (keyword) {
      get_searched_books(cat, keyword);
    }
    if (book_data.length) {
      setDisplaybooks(book_data);
      setLoading(false);
    }

    if (book_results && book_results.count) {
      setBookData(book_results.results);
      if (book_results.next) {
        setNxt(book_results.next);
        console.log("current next", book_results.next);
      }
      if (book_results.previous) {
        setPrev(book_results.previous);
        console.log("current previous is", book_results.previous);
      }
    }
    if (nxt_results.length) {
      setBookData(book_data.concat(nxt_results.results));
      console.log("bkk dattta", book_data);
    }
  }, [
    params,
    book_results.length,
    book_data.length,
    loading,
    nxt_results.length,
  ]);

  // console.log("books_loading", loading);
  // console.log("book_results", book_results);
  // console.log("book_data", book_data);
  // console.log(nxt, prev);
  // console.log("display-books", display_books);
  // console.log("searched books", searched_books);
  // console.log("cat bookes-books", cat_books);
  // console.log("nxt results", nxt_results.results);

  function checkFormats(id, frmats) {
    const formats = Array(frmats);
    console.log(formats[0]["text/html; charset=iso-8859-1"]);
    if (formats[0]["text/html; charset=iso-8859-1"]) {
      console.log("ok", id, formats[0]);
      navigate(`/book/${id}`);
      window.localStorage.setItem(
        "link",
        JSON.stringify(formats[0]["text/html; charset=iso-8859-1"])
      );
      // window.open("www.upam.in", "_blank", "noopener,noreferrer");
      // window.location.href = `${formats[0]["text/html; charset=iso-8859-1"]}`;
    } else if (formats[0]["text/plain; charset=utf-8"]) {
      console.log("ok", id);
      navigate(`/book/${id}`);
      // window.open("www.upam.in", "_blank", "noopener,noreferrer");
      window.localStorage.setItem(
        "link",
        JSON.stringify(formats[0]["text/plain; charset=utf-8"])
      );
    } else if (formats[0]["application/rdf+xml"]) {
      console.log("ok", id);
      // window.open("www.upam.in", "_blank", "noopener,noreferrer");
      navigate(`/book/${id}}`);
      window.localStorage.setItem(
        "link",
        JSON.stringify(formats[0]["application/rdf+xml"])
      );
    } else {
      alert("no format available");
    }
  }

  return (
    <div className="category-page">
      <header className="category-header">
        <div className="arrow">
          <Link to={"/"}>
            <i className="uil uil-arrow-left"></i>
          </Link>
        </div>
        <div className="genre">
          <h2>{cat} </h2>
        </div>
      </header>

      <div className="search-box">
        <form className="form" onSubmit={handleSubmit}>
          <i className="uil uil-search" onClick={handleSubmit}></i>
          <input
            type="search"
            className="search-input"
            onChange={(e) => set_search_input(e.target.value)}
            placeholder="search or enter books and more"
            value={search_input}
          />
        </form>
      </div>

      <div className="books-container">
        {loading ? (
          <div className="loader">
            <p>loading books..please wait till images are fetched</p>
          </div>
        ) : !loading && display_books ? (
          <InfiniteScroll
            dataLength={book_data.length}
            next={get_next_books(nxt)}
            hasMore={book_data.length !== count}
            loader={<h4>Loading.....</h4>}
          >
            {display_books.map((book) => {
              return (
                <div className="book-card" key={book.id}>
                  <div
                    className="cover"
                    onClick={() => {
                      console.log(book);
                      checkFormats(book.id, book.formats);
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
                    {book.authors.length && (
                      <p className="book-author">{book.authors[0]["name"]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        ) : (
          <div className="error-container">
            <p>books fetch error</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Genre;
