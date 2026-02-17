import BookCard from '../components/BookCard'
import AddBookForm from '../components/AddBookForm'
import Modal from '../components/Modal'
import { useState } from 'react'
import type { Book } from '../types/book' // we including this with (import type) bcoz this will remove completely after compilation
import { useBooks } from '../hooks/useBooks'

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../app/store'
import { setPage, resetPage } from '../features/pagination/paginationSlice'

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { books, totalPages, isLoading, error } =
    useBooks(genre, search, page, limit)

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

        {/* Filters + Add Book */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              dispatch(resetPage()) // when genre or search changes page will reset to 1
            }}
            className="w-full md:w-72 border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all duration-150"
          />

          <div className="flex items-center gap-3">
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value)
                dispatch(resetPage()) // when genre changes page will reset to 1
              }}
              className="border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all duration-150"
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Tech">Tech</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Biography">Biography</option>
            </select>

            {/* Only ADMIN can add books */}
            {role === 'admin' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-150"
              >
                + Add Book
              </button>
            )}
          </div>
        </div>

        {/* Book grid */}
        <div className="flex-grow">
          {books.length === 0 ? (
            <div className="text-center mt-16 text-slate-400">
              <p className="text-base font-medium">No books found</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book: Book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 pt-5 border-t border-slate-200 flex justify-center items-center gap-4">
            <button
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page === 1} // we can`t access button
              className="px-4 py-1.5 bg-white border border-slate-200 text-sm text-slate-600 rounded-lg disabled:opacity-40 hover:border-indigo-300 hover:text-indigo-600 transition-colors duration-150"
            >
              Prev
            </button>

            <span className="text-sm text-slate-500 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => dispatch(setPage(page + 1))}
              disabled={page === totalPages}
              className="px-4 py-1.5 bg-white border border-slate-200 text-sm text-slate-600 rounded-lg disabled:opacity-40 hover:border-indigo-300 hover:text-indigo-600 transition-colors duration-150"
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Only ADMIN sees modal */}
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