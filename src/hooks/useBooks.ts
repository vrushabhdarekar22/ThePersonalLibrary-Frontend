import {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateRatingMutation,
} from '../features/books/booksApi'


export const useBooks = (
  genre: string,
  search: string,
  page: number,
  limit: number
) => {
  const { data, isLoading, error } =
    useGetBooksQuery({ genre, search, page, limit }) //actual API Call

  return {
    books: data?.data ?? [],
    totalPages: data?.totalPages ?? 1,
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
