import { useGetBooksQuery } from '../features/books/booksApi'
import BookCard from '../components/BookCard'
import AddBookForm from '../components/AddBookForm'


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

        <AddBookForm />


        {books.length === 0 ? (
            <p>No books available</p>
        ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
            </div>
        )}
    </div>

  )
}

export default Dashboard
