import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Category from "./Pages/Category";
import Error from "./Pages/Error";
import Footer from "./components/Footer";
import "./App.scss";
import Genre from "./Pages/Genre";
import BookPage from "./Pages/BookPage";

function App() {
  return (
    <div className="App">
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:cat" element={<Category />} />

            <Route path="/genre/:cat/search/:keyword" element={<Genre />} />
            <Route path="/genre/:cat" element={<Genre />} />
            <Route path="/genre/:cat/search/:keyword" element={<Genre />} />
            <Route path="/book/:id" element={<BookPage />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
