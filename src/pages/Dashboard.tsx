import BookCard from '../components/BookCard'
import AddBookForm from '../components/AddBookForm'
import { useState } from 'react'
import type { Book } from '../types/book'
import { useBooks } from '../hooks/useBooks'
import { useEffect } from 'react'

function Dashboard() {
  const [genre, setGenre] = useState<string>('')

  const [page, setPage] = useState<number>(1)
  const limit = 6

  

  useEffect(() => { setPage(1) }, [genre])


  const {books,totalPages,isLoading,error} = useBooks(genre, page, limit)


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
      <AddBookForm />

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
          No books available
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

    </div>
  )
}

export default Dashboard
