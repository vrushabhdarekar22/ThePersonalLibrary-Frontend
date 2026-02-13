import BookCard from '../components/BookCard'
import AddBookForm from '../components/AddBookForm'
import { useState } from 'react'
import type { Book } from '../types/book'
import { useBooks } from '../hooks/useBooks'

function Dashboard() {
  const [genre, setGenre] = useState<string>('')

  const { books, isLoading, error } = useBooks(genre)

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
    </div>
  )
}

export default Dashboard
