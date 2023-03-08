import Home from "./components/Home";
import Surah from "./components/Surah";
import Audio from "./components/Audio";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes basename="/Alquran-Website">
        <Route path="/" exact element={<Home />} />
        <Route path="/surah/:surahId" exact element={<Surah />} />
        <Route path="/audio" exact element={<Audio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
