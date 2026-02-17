import {
  useGetIssuedBooksQuery,
  useReturnBookMutation,
} from '../features/borrow/borrowApi'
import toast from 'react-hot-toast'

const IssuedBooks = () => {
  const { data, isLoading, error } = useGetIssuedBooksQuery()
  const [returnBook] = useReturnBookMutation()

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
          No issued books
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Issued Books
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
            Borrowed by: {borrow.user.email}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Issued On: {new Date(borrow.issueDate).toLocaleDateString()}
          </p>

          <button
            onClick={async () => {
              try {
                await returnBook(borrow.id).unwrap()
                toast.success('Book returned successfully')
              } catch {
                toast.error('Return failed')
              }
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Return Book
          </button>
        </div>
      ))}
    </div>
  )
}

export default IssuedBooks
