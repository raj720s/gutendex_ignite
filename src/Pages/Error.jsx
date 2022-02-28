import React from "react";
import { Link, useParams } from "react-router-dom";

function Error() {
  console.log(useParams());
  return (
    <div className="text-center text-4xl">
      <Link to={"/"}>
        <i className="uil uil-arrow-left"></i>
      </Link>
      Error page not found.!
    </div>
  );
}

export default Error;
