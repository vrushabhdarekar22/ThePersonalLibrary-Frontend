function BookCard({ book }) {
  return (
    <div style={styles.card}>
      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong> {book.author}
      </p>

      <p>
        <strong>Genre:</strong> {book.genre}
      </p>

      <p>
        <strong>Rating:</strong> {book.rating}
      </p>
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
}

export default BookCard
