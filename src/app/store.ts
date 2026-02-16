import { configureStore } from '@reduxjs/toolkit'
import { booksApi } from '../features/books/booksApi'
import favoritesReducer from '../features/favorites/favoritesSlice'

//RTK Query => Redux toolkit`s built-in data fetching sol


// this is basically central place to store data. Instead of passing props from parent to child we can store here
export const store = configureStore({
  reducer: { //it basically handles state change
    [booksApi.reducerPath]: booksApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})

//
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
