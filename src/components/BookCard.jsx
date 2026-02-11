import {
  useDeleteBookMutation,
  useUpdateRatingMutation,
} from '../features/books/booksApi'

import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite } from '../features/favourites/favoritesSlice'
// import {toggleFavorite} from '../features/favourites/favoritesSlice'


function BookCard({ book }) {
  const [deleteBook] = useDeleteBookMutation()
  const [updateRating] = useUpdateRatingMutation()

  const dispatch = useDispatch()

  const favoriteIds = useSelector(
    (state) => state.favorites.favoriteIds
  )

  const isFavorite = favoriteIds.includes(book.id)


  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      {/* <h3 className="text-lg font-semibold">{book.title}</h3> */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{book.title}</h3>

        <button
          onClick={() => dispatch(toggleFavorite(book.id))}
          className={`text-xl ${
            isFavorite ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      </div>

      <p className="text-sm text-gray-600">
        <strong>Author:</strong> {book.author}
      </p>

      <p className="text-sm text-gray-600">
        <strong>Genre:</strong> {book.genre}
      </p>

      <p className="mt-2 font-medium">
        Rating: {book.rating}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() =>
            updateRating({ id: book.id, rating: book.rating - 1 })
          }
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ➖
        </button>

        <button
          onClick={() =>
            updateRating({ id: book.id, rating: book.rating + 1 })
          }
          className="px-2 py-1 border rounded hover:bg-gray-100"
        >
          ➕
        </button>

        <button
          onClick={() => deleteBook(book.id)}
          className="ml-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default BookCard
