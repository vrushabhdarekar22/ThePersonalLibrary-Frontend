import { useGetBooksQuery } from '../features/books/booksApi'
import BookCard from '../components/BookCard'
import AddBookForm from '../components/AddBookForm'

function Dashboard() {
  const { data: books = [], isLoading, error } = useGetBooksQuery()

  if (isLoading) {
    return <p className="text-center mt-8">Loading books...</p>
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load books</p>
  }

  return (
    <div>
      <AddBookForm />

      {books.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">
          No books available
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
