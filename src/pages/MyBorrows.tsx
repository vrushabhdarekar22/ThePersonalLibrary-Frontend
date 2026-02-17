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
    if (status === 'requested') return 'bg-yellow-50 text-yellow-600 border border-yellow-100'
    if (status === 'issued') return 'bg-indigo-50 text-indigo-600 border border-indigo-100'
    if (status === 'returned') return 'bg-green-50 text-green-600 border border-green-100'
    return 'bg-red-50 text-red-500 border border-red-100'
  }

  const issuedCount = data.filter((b) => b.status === 'issued').length
  const returnedCount = data.filter((b) => b.status === 'returned').length
  const declinedCount = data.filter((b) => b.status === 'declined').length

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            My Borrowed Books
          </h2>

          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-indigo-600">{issuedCount} Issued</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-green-600">{returnedCount} Returned</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5">
              <span className="text-xs font-medium text-red-500">{declinedCount} Declined</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((borrow) => (
            <div
              key={borrow._id}   // ✅ FIXED
              className="bg-white px-5 py-4 rounded-xl shadow-sm border border-slate-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {borrow.book?.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {borrow.book?.author}
                  </p>
                </div>

                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${statusStyle(
                    borrow.status
                  )}`}
                >
                  {borrow.status}
                </span>
              </div>

              {borrow.issueDate && (
                <p className="text-xs text-slate-400 mt-3">
                  Issued On:{' '}
                  {new Date(borrow.issueDate).toLocaleDateString()}
                </p>
              )}

              {borrow.returnDate && (
                <p className="text-xs text-slate-400">
                  Returned On:{' '}
                  {new Date(borrow.returnDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default MyBorrows