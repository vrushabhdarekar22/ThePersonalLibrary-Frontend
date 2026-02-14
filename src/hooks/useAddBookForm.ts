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

  const [addBook, { isLoading }] = useAddBook()

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!title || !author) return

     try {
      await addBook({ title, author, genre, rating }).unwrap()

      toast.success('Book added successfully')

      onSuccess?.()

    } catch (error) {
      toast.error('Failed to add book')
    }



    setTitle('')
    setAuthor('')
    setGenre('')
    setRating(1)

   
    if (onSuccess) {
      onSuccess()
    }
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
