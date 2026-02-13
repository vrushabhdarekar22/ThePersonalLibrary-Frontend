import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book } from '../../types/book'

export const booksApi = createApi({
  reducerPath: 'booksApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),

  tagTypes: ['Books'],

  endpoints: (builder) => ({

    // GET Books
    getBooks: builder.query<Book[], string>({
      query: (genre) =>
        genre ? `/books?genre=${genre}` : '/books',
      providesTags: ['Books'],
    }),

    // ADD Book
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),

    // DELETE Book
    deleteBook: builder.mutation<void, number>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),

    // UPDATE Rating
    updateRating: builder.mutation<
      Book,
      { id: number; rating: number }
    >({
      query: ({ id, rating }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: { rating },
      }),
      invalidatesTags: ['Books'],
    }),

  }),
})

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateRatingMutation,
} = booksApi
