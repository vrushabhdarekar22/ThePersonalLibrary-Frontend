import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import type { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { clearFavorites } from '../features/favorites/favoritesSlice'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const favoriteCount = useSelector(
    (state: RootState) =>
      state.favorites.favoriteIds.length
  )

  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  )

  const handleLogout = () => {
    dispatch(clearFavorites()) // 🔥 clear user favorites
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="bg-white text-indigo-600 w-9 h-9 flex items-center justify-center rounded-xl font-bold text-lg shadow-sm">
            P
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white">
            Personal Library
          </h1>
        </div>

        {/* Navigation Section */}
        <div className="flex items-center gap-4">

          {isAuthenticated && (
            <>
              <span className="bg-white text-indigo-600 text-xs px-3 py-1 rounded-full font-semibold capitalize">
                {role}
              </span>

              <Link
                to="/"
                className="text-white text-sm font-medium hover:underline"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* USER LINKS */}
          {isAuthenticated && role === 'user' && (
            <>
              <Link
                to="/my-borrows"
                className="text-white text-sm font-medium hover:underline"
              >
                My Borrows
              </Link>

              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition hover:bg-white/30">
                <span className="text-white text-sm font-medium">
                  Favorites
                </span>

                <span className="bg-white text-indigo-600 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  {favoriteCount}
                </span>
              </div>
            </>
          )}

          {/* MANAGER LINKS */}
          {isAuthenticated && role === 'manager' && (
            <>
              <Link
                to="/requests"
                className="text-white text-sm font-medium hover:underline"
              >
                Requests
              </Link>

              <Link
                to="/issued"
                className="text-white text-sm font-medium hover:underline"
              >
                Issued
              </Link>
            </>
          )}

          {/* ADMIN LINKS */}
          {isAuthenticated && role === 'admin' && (
            <Link
              to="/all-borrows"
              className="text-white text-sm font-medium hover:underline"
            >
              All Borrows
            </Link>
          )}

          {/* AUTH LINKS */}
          {!isAuthenticated ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="text-white text-sm font-medium hover:underline"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-white text-sm font-medium hover:underline"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  )
}

export default Navbar
