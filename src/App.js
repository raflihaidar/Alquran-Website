import Home from "./components/Home";
import Surah from "./components/Surah";
import Audio from "./components/Audio";

import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/surah/:surahId" element={<Surah />} />
        <Route path="/audio" exact element={<Audio />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
