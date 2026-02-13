import { useState } from 'react'
import { useAddBook } from './useBooks'
import type { Book } from '../types/book'

export const useAddBookForm = () => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [rating, setRating] = useState<number>(1)

  const [addBook, { isLoading }] = useAddBook()

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

  return {
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
  }
}
