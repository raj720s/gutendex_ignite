import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./bookpage.scss";
function BookPage() {
  const link = localStorage.getItem("link");
  if (link) {
    // window.open(link, "_blank");
    console.log(link);
    setTimeout(() => {
      window.open(JSON.parse(link), "_blank", "noreferrer noopener");
    }, 3000);
  }

  return (
    <div>
      <p>book link below</p>
      <span>auto redirect in 2 seconds on reload</span>
      <br />
      <a href={JSON.parse(link)} target="_blank" rel="noreferrer noopener">
        click here 2 open
      </a>
    </div>
  );
}

export default BookPage;
