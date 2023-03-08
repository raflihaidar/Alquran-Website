import React from "react";
import ReactDOM from "react-dom/client";
import Surah from "./components/Surah";
import Audio from "./components/Audio";
import App from "./App";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/surah/:surahId" element={<Surah />} />
        <Route path="/audio" element={<Audio />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
