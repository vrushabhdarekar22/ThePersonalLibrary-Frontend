import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { booksApi } from '../features/books/booksApi'
import paginationReducer from '../features/pagination/paginationSlice'
import authReducer from '../features/auth/authSlice'
import { borrowApi } from '../features/borrow/borrowApi'

import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

// Combine reducers
const rootReducer = combineReducers({
  [booksApi.reducerPath]: booksApi.reducer,
  [borrowApi.reducerPath]: borrowApi.reducer,
  pagination: paginationReducer,
  auth: authReducer,
})

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['pagination', 'auth'], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(booksApi.middleware, borrowApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
