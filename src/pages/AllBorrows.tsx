import { useGetAllBorrowsQuery } from '../features/borrow/borrowApi'

const AllBorrows = () => {
  const { data, isLoading, error } = useGetAllBorrowsQuery()

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-slate-100">
        <p className="text-sm text-red-500">Failed to load borrow records.</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-slate-100">
        <p className="text-sm text-slate-400">No borrow records found.</p>
      </div>
    )
  }

  const statusStyle = (status: string) => {
    if (status === 'requested') return 'bg-yellow-50 text-yellow-600 border border-yellow-100'
    if (status === 'issued')    return 'bg-indigo-50 text-indigo-600 border border-indigo-100'
    if (status === 'returned')  return 'bg-green-50 text-green-600 border border-green-100'
    return 'bg-red-50 text-red-500 border border-red-100'
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">All Borrow Records</h2>
          <p className="text-sm text-slate-400 mt-0.5">{data.length} total records</p>
        </div>

        <div className="space-y-3">
          {data.map((borrow) => (
            <div key={borrow.id} className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{borrow.book.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{borrow.user.email}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${statusStyle(borrow.status)}`}>
                  {borrow.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3">
                {borrow.issueDate && (
                  <p className="text-xs text-slate-400">
                    Issued: {new Date(borrow.issueDate).toLocaleDateString()}
                  </p>
                )}
                {borrow.returnDate && (
                  <p className="text-xs text-slate-400">
                    Returned: {new Date(borrow.returnDate).toLocaleDateString()}
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default AllBorrows