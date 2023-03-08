import { configureStore } from "@reduxjs/toolkit";
import quranReducers from "../reducers/combine";

export const store = configureStore({
  reducer: quranReducers,
});
