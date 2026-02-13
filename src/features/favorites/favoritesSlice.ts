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
    toggleFavorite: (state, action: PayloadAction<number>) => {
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
