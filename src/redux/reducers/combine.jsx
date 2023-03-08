import { combineReducers } from "@reduxjs/toolkit";
import { getAllData, selectedSurah, getAudioData } from "./index";

const quranReducers = combineReducers({
  allData: getAllData,
  singleData: selectedSurah,
  audioData: getAudioData,
});

export default quranReducers;
