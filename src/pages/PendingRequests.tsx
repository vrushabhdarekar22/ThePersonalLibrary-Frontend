import {
  useGetPendingRequestsQuery,
  useApproveRequestMutation,
  useDeclineRequestMutation,
} from '../features/borrow/borrowApi'
import toast from 'react-hot-toast'

const PendingRequests = () => {
  const { data, isLoading, error } = useGetPendingRequestsQuery()
  const [approveRequest] = useApproveRequestMutation()
  const [declineRequest] = useDeclineRequestMutation()

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
          No pending requests
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        Pending Requests
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
            Requested by: {borrow.user.email}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={async () => {
                try {
                  await approveRequest(borrow.id).unwrap()
                  toast.success('Request approved')
                } catch (err: any) {
                  toast.error('Approval failed')
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Approve
            </button>

            <button
              onClick={async () => {
                try {
                  await declineRequest(borrow.id).unwrap()
                  toast.success('Request declined')
                } catch (err: any) {
                  toast.error('Decline failed')
                }
              }}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PendingRequests
