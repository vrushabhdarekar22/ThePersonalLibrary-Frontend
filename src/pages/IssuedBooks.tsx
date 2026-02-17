import {
  useGetIssuedBooksQuery,
  useReturnBookMutation,
} from '../features/borrow/borrowApi'
import toast from 'react-hot-toast'

const IssuedBooks = () => {
  const { data, isLoading, error } = useGetIssuedBooksQuery()
  const [returnBook] = useReturnBookMutation()

  if (isLoading) {
    return <p className="text-center mt-10 text-sm text-slate-400">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-sm">Failed to load</p>
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-16 text-slate-400">
        <p className="text-base font-medium">No issued books</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Issued Books</h2>
          <p className="text-sm text-slate-400 mt-0.5">{data.length} books currently issued</p>
        </div>

        <div className="space-y-3">
          {data.map((borrow) => (
            <div
              key={borrow.id}
              className="bg-white px-5 py-4 rounded-xl shadow-sm border border-slate-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {borrow.book.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Borrowed by: {borrow.user.email}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Issued On: {new Date(borrow.issueDate).toLocaleDateString()}
                  </p>
                </div>

                <span className="text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 bg-indigo-50 text-indigo-600 border border-indigo-100">
                  issued
                </span>
              </div>

              <button
                onClick={async () => {
                  try {
                    await returnBook(borrow.id).unwrap()
                    toast.success('Book returned successfully')
                  } catch {
                    toast.error('Return failed')
                  }
                }}
                className="mt-4 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-lg transition-colors duration-150"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default IssuedBooks