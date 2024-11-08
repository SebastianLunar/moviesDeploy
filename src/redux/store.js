import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { moviesReducer } from "./slices/moviesSlice";

export const store = configureStore({
  reducer: combineReducers({
    currentUser: userReducer.reducer,
    movies: moviesReducer.reducer
  }),
  devTools: process.env.NODE_ENV === "development"
})
