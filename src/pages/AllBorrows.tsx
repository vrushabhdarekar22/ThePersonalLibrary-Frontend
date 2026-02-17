import { useGetAllBorrowsQuery } from '../features/borrow/borrowApi'

const AllBorrows = () => {
  const { data, isLoading, error } = useGetAllBorrowsQuery()

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">Failed to load</p>
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-16 text-gray-500">
        <p className="text-lg font-medium">
          No borrow records found
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        All Borrow Records
      </h2>

      {data.map((borrow) => (
        <div
          key={borrow.id}
          className="bg-white p-5 rounded-xl shadow-md border"
        >
          <h3 className="text-lg font-semibold">
            {borrow.book.title}
          </h3>

          <p className="text-sm text-gray-500">
            User: {borrow.user.email}
          </p>

          <p className="mt-2 text-sm">
            Status:{' '}
            <span
              className={
                borrow.status === 'requested'
                  ? 'text-yellow-500 font-medium'
                  : borrow.status === 'issued'
                  ? 'text-indigo-600 font-medium'
                  : borrow.status === 'returned'
                  ? 'text-green-600 font-medium'
                  : 'text-red-500 font-medium'
              }
            >
              {borrow.status}
            </span>
          </p>

          {borrow.issueDate && (
            <p className="text-xs text-gray-400 mt-1">
              Issued On: {new Date(borrow.issueDate).toLocaleDateString()}
            </p>
          )}

          {borrow.returnDate && (
            <p className="text-xs text-gray-400">
              Returned On: {new Date(borrow.returnDate).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export default AllBorrows
