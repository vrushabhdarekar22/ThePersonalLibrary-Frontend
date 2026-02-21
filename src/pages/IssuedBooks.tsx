import {
  useGetIssuedBooksQuery,
  useReturnBookMutation,
} from '../features/borrow/borrowApi'
import toast from 'react-hot-toast'
import { useState } from 'react'

const IssuedBooks = () => {
  const [search, setSearch] = useState('')

  const { data, isLoading, error } = useGetIssuedBooksQuery(search || undefined)
  const [returnBook] = useReturnBookMutation()

  if (isLoading) {
    return <p className="text-center mt-10 text-sm text-slate-400">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-sm">Failed to load</p>
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Issued Books
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {data?.length || 0} books currently issued
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by book title or user email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border border-slate-200 bg-white rounded-lg px-4 py-2 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all duration-150"
          />
        </div>

        {!data || data.length === 0 ? (
          <div className="text-center mt-10 text-slate-400">
            <p className="text-sm">No matching issued books</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Borrowed By</th>
                  <th className="px-4 py-3">Issued</th>
                  <th className="px-4 py-3">Due</th>
                  <th className="px-4 py-3 text-right">Fine (₹)</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {data.map((borrow) => (
                  <tr key={borrow._id} className="hover:bg-slate-50">

                    <td className="px-4 py-3 font-medium text-slate-800">
                      {borrow.book?.title}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {borrow.user?.email}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {borrow.issueDate
                        ? new Date(borrow.issueDate).toLocaleDateString()
                        : '-'}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {borrow.dueDate
                        ? new Date(borrow.dueDate).toLocaleDateString()
                        : '-'}
                    </td>

                    <td
                      className={`px-4 py-3 text-right font-semibold ${
                        borrow.fineAmount > 0
                          ? 'text-red-600'
                          : 'text-green-600'
                      }`}
                    >
                      ₹{borrow.fineAmount || 0}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={async () => {
                          try {
                            await returnBook(borrow._id).unwrap()
                            toast.success('Book returned successfully')
                          } catch {
                            toast.error('Return failed')
                          }
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg"
                      >
                        Return
                      </button>
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

export default IssuedBooks