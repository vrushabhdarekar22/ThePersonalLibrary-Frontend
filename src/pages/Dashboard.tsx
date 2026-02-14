import BookCard from '../components/BookCard'
import AddBookForm from '../components/AddBookForm'
import Modal from '../components/Modal'
import { useState, useEffect } from 'react'
import type { Book } from '../types/book'
import { useBooks } from '../hooks/useBooks'

function Dashboard() {
  const [genre, setGenre] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const [page, setPage] = useState<number>(1)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const limit = 6

  useEffect(() => {
    setPage(1)
  }, [genre, search])

  const {books,totalPages,isLoading,error,} = useBooks(genre, search, page, limit)

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages)
    }
  }, [totalPages, page])

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
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 border border-indigo-200 bg-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      <div className="flex items-center gap-4">
        <select
          value={genre}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setGenre(e.target.value)
          }
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
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-indigo-50 transition"
          >
            Prev
          </button>

          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
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
          setPage(1)
        }}
      />
    </Modal>

  </div>
)

}

export default Dashboard
