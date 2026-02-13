import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book } from '../../types/book'
import {PaginatedBooks} from '../../types/paginatedResponse'

export const booksApi = createApi({
  reducerPath: 'booksApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),

  tagTypes: ['Books'],

  endpoints: (builder) => ({

    // GET Books

    getBooks: builder.query<
      PaginatedBooks,
      { genre: string; search: string; page: number; limit: number }
    >({
      query: ({ genre, search, page, limit }) => {
        const params = new URLSearchParams()

        if (genre) params.append('genre', genre)
        if (search) params.append('search', search)

        params.append('page', String(page))
        params.append('limit', String(limit))

        return `/books?${params.toString()}`
      },

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
