import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Book } from '../../types/book'
import { PaginatedBooks } from '../../types/paginatedResponse'
import type { RootState } from '../../app/store'

export const booksApi = createApi({
  reducerPath: 'booksApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  tagTypes: ['Books', 'Favorites'],

  endpoints: (builder) => ({

    // =========================
    // GET BOOKS (PAGINATED)
    // =========================
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

      providesTags: (result) =>
        result
          ? [
            { type: 'Books', id: 'LIST' },
            ...result.data.map(({ _id }) => ({
              type: 'Books' as const,
              id: _id,
            })),
          ]
          : [{ type: 'Books', id: 'LIST' }],
    }),

    // =========================
    // ADD BOOK
    // =========================
    addBook: builder.mutation<Book, Partial<Book>>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
    }),

    // =========================
    // DELETE BOOK
    // =========================
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Books', id: 'LIST' }],
    }),

    // =========================
    // UPDATE RATING
    // =========================
    updateRating: builder.mutation<
      Book,
      { id: string; rating: number }
    >({
      query: ({ id, rating }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: { rating },
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Books', id: arg.id },
      ],
    }),

    // =========================
    // FAVORITES
    // =========================
    getFavorites: builder.query<Book[], void>({
      query: () => '/favorites',
      transformResponse: (response: any[]) =>
        response.map((item) => item.book),
      providesTags: ['Favorites'],
    }),

    addFavorite: builder.mutation<void, string>({
      query: (bookId) => ({
        url: `/favorites/${bookId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Favorites'],
    }),

    removeFavorite: builder.mutation<void, string>({
      query: (bookId) => ({
        url: `/favorites/${bookId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites'],
    }),

    // =========================
    // ADMIN DASHBOARD
    // =========================
    getAdminDashboard: builder.query<
      {
        totalUsers: number
        totalBooks: number
        totalIssued: number
        totalPending: number
        totalFineCollected: number
        monthlyFine: number
        outstandingFine: number
      },
      void
    >({
      query: () => '/admin/dashboard',
    }),

  }),
})

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateRatingMutation,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetAdminDashboardQuery,
} = booksApi