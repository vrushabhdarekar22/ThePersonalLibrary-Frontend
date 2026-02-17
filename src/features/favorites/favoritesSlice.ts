import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  favoriteIds: number[]
}

const initialState: FavoritesState = {
  favoriteIds: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
  toggleFavorite: (state, action) => {
    const bookId = action.payload

    if (state.favoriteIds.includes(bookId)) {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== bookId
      )
    } else {
      state.favoriteIds.push(bookId)
    }
  },

  removeFavorite: (state, action) => {
    const bookId = action.payload
    state.favoriteIds = state.favoriteIds.filter(
      (id) => id !== bookId
    )
  },

  clearFavorites: (state) => {
    state.favoriteIds = []
  }


  },
})

export const { toggleFavorite, removeFavorite ,clearFavorites} = favoritesSlice.actions
export default favoritesSlice.reducer
