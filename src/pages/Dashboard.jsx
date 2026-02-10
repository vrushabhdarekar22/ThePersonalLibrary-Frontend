import { useGetBooksQuery } from '../features/books/booksApi'

function Dashboard() {
  const { data: books, isLoading, error } = useGetBooksQuery()

  if (isLoading) {
    return <p>Loading books...</p>
  }

  if (error) {
    return <p>Something went wrong while fetching books</p>
  }

  return (
    <div>
      <h2>All Books</h2>

      {books?.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> — {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
