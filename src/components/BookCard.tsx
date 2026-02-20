import { useDeleteBook, useUpdateRating } from '../hooks/useBooks'
import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import type { Book } from '../types/book'
import { useRequestBookMutation } from '../features/borrow/borrowApi'
import toast from 'react-hot-toast'

interface BookCardProps {
  book: Book
  isFavorite?: boolean
  onToggleFavorite?: () => void
  showFavorite?: boolean
}

function BookCard({
  book,
  isFavorite = false,
  onToggleFavorite,
  showFavorite = false,
}: BookCardProps) {
  const [deleteBook] = useDeleteBook()
  const [updateRating] = useUpdateRating()
  const [requestBook] = useRequestBookMutation()

  const { role } = useSelector((state: RootState) => state.auth)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? 'text-amber-400' : 'text-gray-300'}
      >
        ★
      </span>
    ))
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-indigo-100 hover:-translate-y-1">

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500">
            {book.author}
          </p>
        </div>

        {showFavorite && (
          <button
            onClick={onToggleFavorite}
            className={`text-xl transition ${isFavorite
              ? 'text-amber-400 scale-110'
              : 'text-gray-300 hover:text-amber-400'
              }`}
          >
            ★
          </button>
        )}
      </div>

      <div className="mb-3">
        <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium">
          {book.genre}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${book.availableCopies > 0
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
            }`}
        >
          {book.availableCopies > 0 ? 'Available' : 'Out of Stock'}
        </span>

        <span className="text-xs text-gray-500">
          {book.availableCopies} / {book.totalCopies} copies
        </span>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {renderStars(book.rating)}
      </div>

      {(role === 'admin' || role === 'manager') && (
        <div className="flex items-center gap-2">

          <button
            onClick={() =>
              updateRating({
                id: book._id,
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
                id: book._id,
                rating: Math.min(5, book.rating + 1),
              })
            }
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          >
            +
          </button>

          {role === 'admin' && (
            <button
              onClick={async () => {
                await deleteBook(book._id).unwrap()
              }}
              className="ml-auto px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      )}

      {role === 'user' && (
        <button
          disabled={book.availableCopies <= 0}
          onClick={async () => {
            try {
              await requestBook(book._id).unwrap()
              toast.success('Book request sent')
            } catch (err: any) {
              toast.error(err?.data?.message || 'Request failed')
            }
          }}
          className={`mt-3 w-full py-2 rounded-lg transition ${book.availableCopies > 0
            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
        >
          {book.availableCopies > 0 ? 'Request Book' : 'Out of Stock'}
        </button>
      )}
    </div>
  )
}

export default BookCard
