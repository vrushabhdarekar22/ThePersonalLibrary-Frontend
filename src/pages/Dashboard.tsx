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

 
  // const [page, setPage] = useState<number>(1)

  const dispatch = useDispatch()

  const { page, limit } = useSelector(
    (state: RootState) => state.pagination
  )

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // const limit = 6 // 

  const { books, totalPages, isLoading, error } =
    useBooks(genre, search, page, limit)

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading books...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center text-rose-500 mt-10">
        Failed to load books
      </p>
    )
  }

  return (
    <div className="flex flex-col min-h-[80vh]">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            dispatch(resetPage()) // when genre or search changes page will reset to 1
          }}
          className="w-full md:w-1/3 border border-indigo-200 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        <div className="flex items-center gap-4">
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value)
              dispatch(resetPage()) // when genre changes page will reset to 1
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Tech">Tech</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Biography">Biography</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + Add Book
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col">

        <div className="flex-grow">
          {books.length === 0 ? (
            <div className="text-center mt-16 text-gray-500">
              <p className="text-lg font-medium">
                No books found
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book: Book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 pt-6 border-t border-gray-200 flex justify-center items-center gap-6">
            <button
              onClick={() => dispatch(setPage(page - 1))}
              disabled={page === 1} // we can`t access button
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-indigo-50 transition"
            >
              Prev
            </button>

            <span className="text-gray-700 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => dispatch(setPage(page + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-indigo-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

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

    </div>
  )
}

export default Dashboard
