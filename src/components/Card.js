import React from "react";

function Card({ image = "./favicon.ico", name = "name", author = "author" }) {
  return (
    <>
      <div className="card">
        <img src={image} alt={name} className="book_image" />
        <h3>{name} </h3>
        <p>{author} </p>
      </div>
    </>
  );
}

export default Card;
