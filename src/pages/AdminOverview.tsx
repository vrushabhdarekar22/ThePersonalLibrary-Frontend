import { useSelector } from 'react-redux'
import { useState } from 'react'
import type { RootState } from '../app/store'
import { useGetAdminDashboardQuery } from '../features/books/booksApi'
import { useGetUserBorrowAnalyticsQuery } from '../features/borrow/borrowApi'

function AdminOverview() {
  const { role } = useSelector((state: RootState) => state.auth)

  const isAdmin = role === 'admin'
  const isAllowed = role === 'admin' || role === 'manager'

  // Search state
  const [search, setSearch] = useState('')

  const {
    data: summary,
    isLoading: summaryLoading,
  } = useGetAdminDashboardQuery(undefined, {
    skip: !isAdmin,
  })


  const {
    data: analytics = [],
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useGetUserBorrowAnalyticsQuery(search || undefined, {
    skip: !isAllowed,
  })

  if (!isAllowed) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-sm">
          Access denied.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-semibold text-slate-800 mb-8">
          Management Overview
        </h2>


        {isAdmin && (
          <>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              System Summary
            </h3>

            {summaryLoading || !summary ? (
              <p className="text-sm text-slate-400 mb-8">
                Loading summary...
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">

                <StatCard
                  title="Total Users"
                  value={summary.totalUsers}
                  color="indigo"
                />

                <StatCard
                  title="Total Books"
                  value={summary.totalBooks}
                  color="green"
                />

                <StatCard
                  title="Issued Books"
                  value={summary.totalIssued}
                  color="amber"
                />

                <StatCard
                  title="Pending Requests"
                  value={summary.totalPending}
                  color="rose"
                />

              </div>
            )}
          </>
        )}



        <h3 className="text-lg font-semibold text-slate-700 mb-4">
          User Borrow Analytics
        </h3>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all duration-150"
          />
        </div>

        {analyticsLoading ? (
          <p className="text-sm text-slate-400">
            Loading analytics...
          </p>
        ) : analyticsError ? (
          <p className="text-sm text-red-500">
            Failed to load analytics
          </p>
        ) : analytics.length === 0 ? (
          <p className="text-sm text-slate-400">
            No matching users found
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="min-w-full text-sm">

              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 font-semibold text-slate-600">
                    Email
                  </th>
                  <th className="text-center px-6 py-3 font-semibold text-slate-600">
                    Total Borrowed
                  </th>
                  <th className="text-center px-6 py-3 font-semibold text-slate-600">
                    Currently Issued
                  </th>
                  <th className="text-center px-6 py-3 font-semibold text-slate-600">
                    Total Returned
                  </th>

                </tr>
              </thead>

              <tbody>
                {analytics.map((user) => (
                  <tr
                    key={user.userId}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-3 font-medium text-slate-800">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-3 text-slate-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-semibold">
                        {user.totalBorrowed}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full font-semibold">
                        {user.currentlyIssued}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold">
                        {user.totalReturned}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  color: 'indigo' | 'green' | 'amber' | 'rose'
}

function StatCard({ title, value, color }: StatCardProps) {
  const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition">
      <p className="text-sm text-slate-500 mb-2">{title}</p>
      <div className={`text-3xl font-bold ${colorMap[color]}`}>
        {value}
      </div>
    </div>
  )
}

export default AdminOverview
