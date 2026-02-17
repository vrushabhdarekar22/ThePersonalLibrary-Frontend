import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../app/store'

export const borrowApi = createApi({
  reducerPath: 'borrowApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),

  tagTypes: ['Borrow'],

  endpoints: (builder) => ({
    getMyBorrows: builder.query<any[], void>({
      query: () => '/borrow/my',
      providesTags: ['Borrow'],
    }),

    requestBook: builder.mutation<any, number>({
      query: (bookId) => ({
        url: '/borrow/request',
        method: 'POST',
        body: { bookId },
      }),
      invalidatesTags: ['Borrow'],
    }),


    getPendingRequests: builder.query<any[], void>({
      query: () => '/borrow/requests',
      providesTags: ['Borrow'],
    }),

    approveRequest: builder.mutation<any, number>({
      query: (borrowId) => ({
        url: '/borrow/approve',
        method: 'POST',
        body: { borrowId },
      }),
      invalidatesTags: ['Borrow'],
    }),

    declineRequest: builder.mutation<any, number>({
      query: (borrowId) => ({
        url: '/borrow/decline',
        method: 'POST',
        body: { borrowId },
      }),
      invalidatesTags: ['Borrow'],
    }),

    getIssuedBooks: builder.query<any[], void>({
      query: () => '/borrow/issued',
      providesTags: ['Borrow'],
    }),

    returnBook: builder.mutation<any, number>({
      query: (borrowId) => ({
        url: '/borrow/return',
        method: 'POST',
        body: { borrowId },
      }),
      invalidatesTags: ['Borrow'],
    }),

    getAllBorrows: builder.query<any[], void>({
      query: () => '/borrow/all',
      providesTags: ['Borrow'],
    }),





  }),





})

export const {
  useGetMyBorrowsQuery,
  useRequestBookMutation,
  useGetPendingRequestsQuery,
  useApproveRequestMutation,
  useDeclineRequestMutation,
  useGetIssuedBooksQuery,
  useReturnBookMutation,
  useGetAllBorrowsQuery,
} = borrowApi

