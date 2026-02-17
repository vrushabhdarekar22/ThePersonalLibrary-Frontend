import { useDeleteBook, useUpdateRating } from '../hooks/useBooks'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'
import type { Book } from '../types/book'
import { toggleFavorite, removeFavorite } from '../features/favorites/favoritesSlice'
import { useRequestBookMutation } from '../features/borrow/borrowApi'
import toast from 'react-hot-toast'

interface BookCardProps {
  book: Book
}

function BookCard({ book }: BookCardProps) {
  const [deleteBook] = useDeleteBook()
  const [updateRating] = useUpdateRating()
  const [requestBook] = useRequestBookMutation()

  const dispatch = useDispatch<AppDispatch>()

  const favoriteIds = useSelector(
    (state: RootState) => state.favorites.favoriteIds
  )

  const { role } = useSelector(
    (state: RootState) => state.auth
  )

  const isFavorite = favoriteIds.includes(book._id) 

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

      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500">
            {book.author}
          </p>
        </div>

        {role === 'user' && (
          <button
            onClick={() => dispatch(toggleFavorite(book._id))} 
            className={`text-xl transition ${
              isFavorite
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

      {/* 🔥 Availability Badge */}
      <div className="mb-2">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          book.isAvailable
            ? 'bg-green-100 text-green-600'
            : 'bg-red-100 text-red-600'
        }`}>
          {book.isAvailable ? 'Available' : 'Issued'}
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
                dispatch(removeFavorite(book._id))  
              }}
              className="ml-auto px-3 py-1 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
            >
              Delete
            </button>
          )}
        </div>
      )}

      {role === 'user' && book.isAvailable && (
        <button
          onClick={async () => {
            try {
              await requestBook(book._id).unwrap() 
              toast.success('Book request sent')
            } catch (err: any) {
              toast.error(err?.data?.message || 'Request failed')
            }
          }}
          className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Request Book
        </button>
      )}
    </div>
  )
}

export default BookCard
