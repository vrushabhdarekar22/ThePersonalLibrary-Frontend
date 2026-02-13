import {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateRatingMutation,
} from '../features/books/booksApi'


export const useBooks = (
  genre: string,
  page: number,
  limit: number
) => {
  const { data, isLoading, error } =
    useGetBooksQuery({ genre, page, limit })

  return {
    books: data?.data ?? [],
    totalPages: data?.totalPages ?? 1,
    currentPage: data?.page ?? 1,
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
