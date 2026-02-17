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
    return <p className="text-center mt-10 text-sm text-slate-400">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10 text-sm">Failed to load</p>
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-16 text-slate-400">
        <p className="text-base font-medium">No pending requests</p>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Pending Requests</h2>
          <p className="text-sm text-slate-400 mt-0.5">{data.length} requests awaiting review</p>
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
                    Requested by: {borrow.user.email}
                  </p>
                </div>

                <span className="text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 bg-yellow-50 text-yellow-600 border border-yellow-100">
                  requested
                </span>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={async () => {
                    try {
                      await approveRequest(borrow.id).unwrap()
                      toast.success('Request approved')
                    } catch (err: any) {
                      toast.error('Approval failed')
                    }
                  }}
                  className="px-4 py-1.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-medium rounded-lg transition-colors duration-150"
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
                  className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors duration-150"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PendingRequests