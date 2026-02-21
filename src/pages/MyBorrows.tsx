import { useGetMyBorrowsQuery } from '../features/borrow/borrowApi'

const MyBorrows = () => {
  const { data, isLoading, error } = useGetMyBorrowsQuery()

  if (isLoading) {
    return <p className="text-center mt-10 text-sm text-slate-400">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-sm">Failed to load</p>
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-16 text-slate-400">
        <p className="text-base font-medium">
          You have not borrowed any books yet.
        </p>
      </div>
    )
  }

  const statusStyle = (status: string) => {
    if (status === 'requested')
      return 'bg-yellow-50 text-yellow-600 border border-yellow-100'
    if (status === 'issued')
      return 'bg-indigo-50 text-indigo-600 border border-indigo-100'
    if (status === 'returned')
      return 'bg-green-50 text-green-600 border border-green-100'
    return 'bg-red-50 text-red-500 border border-red-100'
  }

  const issuedCount = data.filter((b) => b.status === 'issued').length
  const returnedCount = data.filter((b) => b.status === 'returned').length
  const declinedCount = data.filter((b) => b.status === 'declined').length

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            My Borrowed Books
          </h2>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-indigo-600">
                {issuedCount} Issued
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-green-600">
                {returnedCount} Returned
              </span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-red-500">
                {declinedCount} Declined
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Issued</th>
                <th className="px-4 py-3">Due</th>
                <th className="px-4 py-3">Returned</th>
                <th className="px-4 py-3 text-right">Fine (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.map((borrow) => (
                <tr key={borrow._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {borrow.book?.title}
                  </td>

                  <td className="px-4 py-3 text-slate-500">
                    {borrow.book?.author}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyle(
                        borrow.status
                      )}`}
                    >
                      {borrow.status}
                    </span>
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

                  <td className="px-4 py-3 text-slate-500">
                    {borrow.returnDate
                      ? new Date(borrow.returnDate).toLocaleDateString()
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default MyBorrows