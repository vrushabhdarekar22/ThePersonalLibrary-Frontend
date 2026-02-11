import { configureStore } from '@reduxjs/toolkit'
import { booksApi } from '../features/books/booksApi'
import favoritesReducer from '../features/favourites/favoritesSlice'
// import {favoritesReducer} from '../features/favourites/favoritesSlice'
export const store = configureStore({
  // reducer: {
  //   [booksApi.reducerPath]: booksApi.reducer,
  // },
  reducer: {
  [booksApi.reducerPath]: booksApi.reducer,
  favorites: favoritesReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})
