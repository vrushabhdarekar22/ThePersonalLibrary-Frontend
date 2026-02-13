import { useAddBookForm } from '../hooks/useAddBookForm'

interface AddBookFormProps {
  onSuccess?: () => void
}

function AddBookForm({ onSuccess }: AddBookFormProps) {
  const {
    title,
    author,
    genre,
    rating,
    isLoading,
    setTitle,
    setAuthor,
    setGenre,
    setRating,
    handleSubmit,
  } = useAddBookForm(onSuccess)

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">
        Add New Book
      </h3>

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <input
        type="number"
        min="1"
        max="5"
        className="w-full border p-2 rounded mb-4"
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isLoading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  )
}

export default AddBookForm
