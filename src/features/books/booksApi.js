import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const booksApi = createApi({
    reducerPath: 'booksApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000', 
    }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({

    getBooks: builder.query({
      query: (genre) =>
        genre ? `/books?genre=${genre}` : '/books',
      providesTags: ['Books'],
    }),

    addBook: builder.mutation({
    query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
    }),
    invalidatesTags: ['Books'],
    }),

    deleteBook: builder.mutation({
    query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
    }),
    invalidatesTags: ['Books'],
    }),

    updateRating: builder.mutation({
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
