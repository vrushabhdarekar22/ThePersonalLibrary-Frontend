import { configureStore } from '@reduxjs/toolkit'
import { booksApi } from '../features/books/booksApi'
import favoritesReducer from '../features/favorites/favoritesSlice'

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
})

//
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
