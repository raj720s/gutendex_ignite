import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
function Home() {
  return (
    <div className="home-page">
      <div className="heading">
        <h1>Gutenberg app</h1>
        <div className="para ">
          <p>
            a social catalog website to search and filter items from the data
            base
          </p>
        </div>
      </div>

      <div className="Cards-container">
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">fiction</h3>
          <Link to={`/genre/fiction`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
          {/* <Link to={`/category/fiction`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
        </div>
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">drama</h3>
          {/* <Link to={`/category/drama`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
          <Link to={`/genre/drama`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
        </div>
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">humor</h3>
          {/* <Link to={`/category/humor`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
          <Link to={`/genre/humor`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
        </div>
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">politics</h3>
          {/* <Link to={`/category/politics`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
          <Link to={`/genre/politics`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
        </div>
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">philosophy</h3>
          {/* <Link to={`/category/philosophy`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
          <Link to={`/genre/philosophy`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
        </div>
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">history</h3>
          {/* <Link to={`/category/history`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
          <Link to={`/genre/history`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
        </div>
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">adventure</h3>
          <Link to={`/genre/adventure`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
          {/* <Link to={`/category/adventure`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
        </div>
        <div className="cards">
          <i className="uil uil-apple left-icon"></i>
          <h3 className="card-title">children</h3>
          <Link to={`/genre/children`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link>
          {/* <Link to={`/category/adventure`} className="link">
            <i className="uil uil-arrow-right"></i>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
