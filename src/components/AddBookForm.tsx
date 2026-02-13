import { useState } from 'react'
import { useAddBookMutation } from '../features/books/booksApi'
import type { Book } from '../types/book'

function AddBookForm() {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [rating, setRating] = useState<number>(1)

  const [addBook, { isLoading }] = useAddBookMutation()

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!title || !author) return

    await addBook({
      title,
      author,
      genre,
      rating,
    } as Partial<Book>)

    setTitle('')
    setAuthor('')
    setGenre('')
    setRating(1)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-sm mb-6"
    >
      <h3 className="text-lg font-semibold mb-4">
        Add New Book
      </h3>

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Author"
        value={author}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setAuthor(e.target.value)
        }
      />

      <input
        className="w-full border p-2 rounded mb-2"
        placeholder="Genre"
        value={genre}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGenre(e.target.value)
        }
      />

      <input
        type="number"
        min="1"
        max="5"
        className="w-full border p-2 rounded mb-4"
        value={rating}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
