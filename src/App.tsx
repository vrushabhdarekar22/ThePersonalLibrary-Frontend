import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MyBorrows from './pages/MyBorrows'
import PendingRequests from './pages/PendingRequests'
import IssuedBooks from './pages/IssuedBooks'
import AllBorrows from './pages/AllBorrows'
import Favorites from './pages/Favorites'
import AdminOverview from './pages/AdminOverview'
// import BorrowAnalytics from './pages/BorrowAnalytics'


function App() {
  return (
    <div className="min-h-screen bg-slate-100 ">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Toaster position="top-center" />

        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-borrows"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MyBorrows />
              </ProtectedRoute>
            }
          />


          <Route
            path="/requests"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <PendingRequests />
              </ProtectedRoute>
            }
          />


          <Route
            path="/issued"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <IssuedBooks />
              </ProtectedRoute>
            }
          />


          <Route
            path="/all-borrows"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AllBorrows />
              </ProtectedRoute>
            }
          />
          
          <Route path="/favorites" element={<Favorites />} />

          <Route path="/admin" element={<AdminOverview />} />





        </Routes>

      </main>
    </div>
  )
}

export default App
