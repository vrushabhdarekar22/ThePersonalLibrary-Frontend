import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { booksApi } from '../features/books/booksApi'
import favoritesReducer from '../features/favorites/favoritesSlice'
import paginationReducer from '../features/pagination/paginationSlice'
import authReducer from '../features/auth/authSlice'
import { borrowApi } from '../features/borrow/borrowApi'

// RTK Query => Redux toolkit`s built-in data fetching sol

import storage from 'redux-persist/lib/storage' // default: localStorage for web
import { persistReducer, persistStore } from 'redux-persist'


// Combine all reducers here
// this is basically central place to store data. Instead of passing props from parent to child we can store here
const rootReducer = combineReducers({
  [booksApi.reducerPath]: booksApi.reducer, // API cache stored here
  [borrowApi.reducerPath]: borrowApi.reducer,
  favorites: favoritesReducer,
  pagination: paginationReducer,
  auth: authReducer, // added auth reducer
})


// Persist configuration
const persistConfig = {
  key: 'root', // key name in localStorage
  storage,
  whitelist: ['favorites', 'pagination', 'auth'], // only these slices will persist after refresh
}


// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)


// Create Redux store
export const store = configureStore({
  reducer: persistedReducer, //it basically handles state change

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // disabling serializable check because redux-persist stores non-serializable values internally
    }).concat(booksApi.middleware, borrowApi.middleware),
  // RTK Query middleware for caching, auto-refetching etc.
})


// Create persistor object (used in PersistGate)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
