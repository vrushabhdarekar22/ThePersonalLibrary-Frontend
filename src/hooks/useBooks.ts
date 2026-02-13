import {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateRatingMutation,
} from '../features/books/booksApi'


export const useBooks = (genre: string) => {
  const { data = [], isLoading, error } =
    useGetBooksQuery(genre)

  return {
    books: data,
    isLoading,
    error,
  }
}


export const useAddBook = () => {
  return useAddBookMutation()
}


export const useDeleteBook = () => {
  return useDeleteBookMutation()
}


export const useUpdateRating = () => {
  return useUpdateRatingMutation()
}
