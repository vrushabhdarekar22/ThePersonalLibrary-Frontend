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

  // Reset page when genre or search changes
  useEffect(() => {
    setPage(1)
  }, [genre, search])

  const {
    books,
    totalPages,
    isLoading,
    error,
  } = useBooks(genre, search, page, limit)

  
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages)
    }
  }, [totalPages, page])

  if (isLoading) {
    return <p className="text-center mt-8">Loading books...</p>
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Failed to load books
      </p>
    )
  }

  return (
    <div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6 hover:bg-green-700"
      >
        + Add Book
      </button>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-6 flex items-center gap-4">
        <label className="font-medium">
          Filter by Genre:
        </label>

        <select
          value={genre}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setGenre(e.target.value)
          }
          className="border rounded px-3 py-2 bg-white"
        >
          <option value="">All</option>
          <option value="Fiction">Fiction</option>
          <option value="Tech">Tech</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Biography">Biography</option>
        </select>
      </div>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No books found
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

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
