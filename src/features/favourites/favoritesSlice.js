import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteIds: [],
  },
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
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
