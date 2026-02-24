import { useState } from 'react'
import { useAddBook } from './useBooks'
import type { Book } from '../types/book'
import toast from 'react-hot-toast'


export const useAddBookForm = (
  onSuccess?: () => void
) => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const [rating, setRating] = useState<number>(1)
  const [totalCopies, setTotalCopies] = useState(1)

  const [addBook, { isLoading }] = useAddBook()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addBook({
        title,
        author,
        genre,
        rating,
        totalCopies,
      }).unwrap() 

      toast.success('Book added successfully')

      onSuccess?.()

      // reset form
      setTitle('')
      setAuthor('')
      setGenre('')
      setRating(3)
      setTotalCopies(1)

    } catch (err: any) {
      toast.error(
        err?.data?.message || 'Failed to add book'
      )
    }
  }

  return {
    title,
    author,
    genre,
    rating,
    totalCopies,
    isLoading,
    setTitle,
    setAuthor,
    setGenre,
    setRating,
    setTotalCopies,
    handleSubmit,
  }
}
