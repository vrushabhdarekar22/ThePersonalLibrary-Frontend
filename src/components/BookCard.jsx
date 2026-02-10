import {
  useDeleteBookMutation,
  useUpdateRatingMutation,
} from '../features/books/booksApi'

function BookCard({ book }) {
  const [deleteBook] = useDeleteBookMutation()
  const [updateRating] = useUpdateRatingMutation()

  const handleDelete = async () => {
    await deleteBook(book.id)
  }

  const increaseRating = async () => {
    if (book.rating < 5) {
      await updateRating({
        id: book.id,
        rating: book.rating + 1,
      })
    }
  }

  const decreaseRating = async () => {
    if (book.rating > 1) {
      await updateRating({
        id: book.id,
        rating: book.rating - 1,
      })
    }
  }

  return (
    <div style={styles.card}>
      <h3>{book.title}</h3>

      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>

      <p>
        <strong>Rating:</strong> {book.rating}
      </p>

      <div style={styles.actions}>
        <button onClick={decreaseRating}>➖</button>
        <button onClick={increaseRating}>➕</button>
        <button onClick={handleDelete} style={styles.delete}>
          Delete
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    marginTop: '10px',
  },
  delete: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '4px 8px',
  },
}

export default BookCard
