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
      className="
        bg-white 
        rounded-2xl 
        p-8 
        w-full 
        max-w-sm 
        mx-auto 
        shadow-xl 
        border border-gray-200
        transition-all duration-300
        hover:-translate-y-2 
        hover:shadow-2xl
      "
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Add New Book
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="Book title"
        />
      </div>

      {/* Author */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Author
        </label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="Author name"
        />
      </div>

      {/* Genre */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">
          Genre
        </label>
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          placeholder="Genre"
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">
          Rating (1–5)
        </label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="
          w-full 
          bg-indigo-600 
          text-white 
          py-2.5 
          rounded-lg 
          hover:bg-indigo-700 
          transition
          shadow-md
        "
      >
        {isLoading ? 'Adding...' : 'Add Book'}
      </button>
    </form>
  )
}

export default AddBookForm
