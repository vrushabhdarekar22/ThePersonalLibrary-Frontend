import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book } from '../../types/book'
import { PaginatedBooks } from '../../types/paginatedResponse'
import type { RootState } from '../../app/store' // 


export const booksApi = createApi({ // createApp builds entire API system
  reducerPath: 'booksApi', //API data will be stored here

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    // 👇 Automatically attach JWT token to every request
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  tagTypes: ['Books'],// when we add/delete/update book, Book list will refresh automatically

  endpoints: (builder) => ({

    // GET Books
    //builder.query() -> For GET req.
    //builder.mutation() -> For POST/DELETE/PATCH req.

    getBooks: builder.query<
      PaginatedBooks,
      { genre: string; search: string; page: number; limit: number }
    >({
      query: ({ genre, search, page, limit }) => {
        //here we make URL dynamically
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
      invalidatesTags: ['Books'], //it refetches books
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
  useGetBooksQuery, // it is basically URL
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateRatingMutation,
} = booksApi
