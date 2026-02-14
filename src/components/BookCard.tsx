import { useDeleteBook, useUpdateRating } from '../hooks/useBooks'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import type { Book } from '../types/book'
import { toggleFavorite, removeFavorite } from '../features/favorites/favoritesSlice'


interface BookCardProps {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  const [deleteBook] = useDeleteBook()
  const [updateRating] = useUpdateRating()

  const dispatch = useDispatch<AppDispatch>()

  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  )

  const isFavorite = favoriteIds.includes(book.id)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={
          index < rating
            ? 'text-amber-400'
            : 'text-gray-300'
        }
      >
        ★
      </span>
    ))
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-100 hover:-translate-y-1">

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500">
            {book.author}
          </p>
        </div>

        <button
          onClick={() =>
            dispatch(toggleFavorite(book.id))
          }
          className={`text-xl transition ${
            isFavorite
              ? 'text-amber-400 scale-110'
              : 'text-gray-300 hover:text-amber-400'
          }`}
        >
          ★
        </button>
      </div>

      {/* Genre Badge */}
      <div className="mb-3">
        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
          {book.genre}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {renderStars(book.rating)}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">

        <button
          onClick={() =>
            updateRating({
              id: book.id,
              rating: Math.max(1, book.rating - 1),
            })
          }
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          −
        </button>

        <button
          onClick={() =>
            updateRating({
              id: book.id,
              rating: Math.min(5, book.rating + 1),
            })
          }
          className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition"
        >
          +
        </button>

        <button
          onClick={async () => {
            await deleteBook(book.id).unwrap()
            dispatch(removeFavorite(book.id))
          }}
          className="ml-auto px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default BookCard
