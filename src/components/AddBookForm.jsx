import { useState } from 'react'
import { useAddBookMutation } from '../features/books/booksApi'

function AddBookForm() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('')
  const [rating, setRating] = useState(1)

  const [addBook, { isLoading }] = useAddBookMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !author) return

    await addBook({
      title,
      author,
      genre,
      rating,
    })

    // reset form
    setTitle('')
    setAuthor('')
    setGenre('')
    setRating(1)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add New Book</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  )
}

export default AddBookForm
