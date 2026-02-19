import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../app/store'

export const borrowApi = createApi({
  reducerPath: 'borrowApi',

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

  // 🔥 Added Analytics tag
  tagTypes: ['Borrow', 'Analytics'],

  endpoints: (builder) => ({

    // =========================
    // USER BORROWS
    // =========================
    getMyBorrows: builder.query<any[], void>({
      query: () => '/borrow/my',
      providesTags: ['Borrow'],
    }),

    requestBook: builder.mutation<any, string>({
      query: (bookId) => ({
        url: '/borrow/request',
        method: 'POST',
        body: { bookId },
      }),
      invalidatesTags: ['Borrow', 'Analytics'], // 🔥 added Analytics
    }),

    // =========================
    // MANAGER REQUESTS
    // =========================
    getPendingRequests: builder.query<any[], void>({
      query: () => '/borrow/requests',
      providesTags: ['Borrow'],
    }),

    approveRequest: builder.mutation<any, string>({
      query: (borrowId) => ({
        url: '/borrow/approve',
        method: 'POST',
        body: { borrowId },
      }),
      invalidatesTags: ['Borrow', 'Analytics'], // 🔥 added
    }),

    declineRequest: builder.mutation<any, string>({
      query: (borrowId) => ({
        url: '/borrow/decline',
        method: 'POST',
        body: { borrowId },
      }),
      invalidatesTags: ['Borrow', 'Analytics'], // 🔥 added
    }),

    // =========================
    // ISSUED BOOKS
    // =========================
    getIssuedBooks: builder.query<any[], void>({
      query: () => '/borrow/issued',
      providesTags: ['Borrow'],
    }),

    returnBook: builder.mutation<any, string>({
      query: (borrowId) => ({
        url: '/borrow/return',
        method: 'POST',
        body: { borrowId },
      }),
      invalidatesTags: ['Borrow', 'Analytics'], // 🔥 added
    }),

    getAllBorrows: builder.query<any[], void>({
      query: () => '/borrow/all',
      providesTags: ['Borrow'],
    }),

    // =========================
    // USER BORROW ANALYTICS
    // =========================
    getUserBorrowAnalytics: builder.query<
      {
        userId: string
        fullName: string
        email: string
        totalBorrowed: number
        currentlyIssued: number
        totalReturned: number
      }[],
      string | void
    >({
      query: (search) =>
        search
          ? `/borrow/analytics/users?search=${search}`
          : '/borrow/analytics/users',
      providesTags: ['Analytics'],
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
  useGetUserBorrowAnalyticsQuery,
} = borrowApi
