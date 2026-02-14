import { useAddBookForm } from '../hooks/useAddBookForm'

interface AddBookFormProps {
  onSuccess?: () => void
}

function AddBookForm({ onSuccess }: AddBookFormProps) {
  const {
    title, author, genre, rating, isLoading,
    setTitle, setAuthor, setGenre, setRating, handleSubmit,
  } = useAddBookForm(onSuccess)

  return (
  
    <div className="max-w-fit mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-5 w-[280px] shadow-2xl border border-gray-100"
      >
        <div className="relative z-10">
          
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg mb-2">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-md font-bold text-gray-800">Add New Book</h2>
          </div>

          
          <div className="mb-2.5">
            <label className="block text-[10px] uppercase tracking-tight font-bold text-gray-400 mb-0.5 pl-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all"
              placeholder="Book name"
            />
          </div>

          <div className="mb-2.5">
            <label className="block text-[10px] uppercase tracking-tight font-bold text-gray-400 mb-0.5 pl-1">Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all"
              placeholder="Author name"
            />
          </div>

          <div className="mb-2.5">
            <label className="block text-[10px] uppercase tracking-tight font-bold text-gray-400 mb-0.5 pl-1">Genre</label>
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g. Fiction"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[10px] uppercase tracking-tight font-bold text-gray-400 mb-0.5 pl-1">Rating (1-5)</label>
            <div className="relative">
              <input
                type="number" min="1" max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:bg-white focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 active:scale-95 disabled:opacity-50 transition-all text-xs shadow-md"
          >
            {isLoading ? 'Processing...' : 'Add to Library'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBookForm