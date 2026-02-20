import BookCard from '../components/BookCard'
import AddBookForm from '../components/AddBookForm'
import Modal from '../components/Modal'
import { useState } from 'react'
import type { Book } from '../types/book'
import { useBooks } from '../hooks/useBooks'

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { setPage, resetPage } from '../features/pagination/paginationSlice'

import {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from '../features/books/booksApi'

function Dashboard() {
  const [genre, setGenre] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const dispatch = useDispatch()

  const { page, limit } = useSelector(
    (state: RootState) => state.pagination
  )

  const { role } = useSelector(
    (state: RootState) => state.auth
  )

  const isUser = role === 'user'

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const {
    books,
    totalPages,
    isLoading,
    error,
  } = useBooks(genre, search, page, limit)

  // Fetch favorites only for users
  const { data: favorites = [] } = useGetFavoritesQuery(undefined, {
    skip: !isUser,
  })

  const [addFavorite] = useAddFavoriteMutation()
  const [removeFavorite] = useRemoveFavoriteMutation()

  const handleToggleFavorite = async (bookId: string) => {
    const isFavorite = favorites.some((fav) => fav._id === bookId)

    if (isFavorite) {
      await removeFavorite(bookId)
    } else {
      await addFavorite(bookId)
    }

    
  }

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-sm text-slate-400">
        Loading books...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10 text-sm">
        Failed to load books
      </p>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col min-h-[calc(100vh-128px)]">

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              dispatch(resetPage())
            }}
            className="w-full md:w-72 border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm"
          />

          <div className="flex items-center gap-3">
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value)
                dispatch(resetPage())
              }}
              className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Tech">Tech</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Biography">Biography</option>
            </select>

            {role === 'admin' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg"
              >
                + Add Book
              </button>
            )}
          </div>
        </div>

        {/* Book Grid */}
        <div className="flex-grow">
          {books.length === 0 ? (
            <div className="text-center mt-16 text-slate-400">
              <p>No books found</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book: Book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  isFavorite={
                    isUser &&
                    favorites.some((fav) => fav._id === book._id)
                  }
                  onToggleFavorite={() =>
                    handleToggleFavorite(book._id)
                  }
                  showFavorite={isUser}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 pt-5 border-t flex justify-center items-center gap-4">
            <button
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page === 1}
              className="px-4 py-1.5 bg-white border text-sm rounded-lg"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => dispatch(setPage(page + 1))}
              disabled={page === totalPages}
              className="px-4 py-1.5 bg-white border text-sm rounded-lg"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {role === 'admin' && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <AddBookForm
            onSuccess={() => {
              setIsModalOpen(false)
              dispatch(resetPage())
            }}
          />
        </Modal>
      )}

    </div>
  )
}

export default Dashboard