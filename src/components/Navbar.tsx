import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import type { RootState } from '../app/store'
import { logout } from '../features/auth/authSlice'
import { clearFavorites } from '../features/favorites/favoritesSlice'

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const favoriteCount = useSelector(
    (state: RootState) => state.favorites.favoriteIds.length
  )

  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.auth
  )

  const handleLogout = () => {
    dispatch(clearFavorites())
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors duration-150">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
            </svg>
          </div>
          <span className="text-slate-800 font-semibold text-base tracking-tight">
            Personal <span className="text-indigo-600">Library</span>
          </span>
        </Link>

        {/* Nav links + actions */}
        <div className="flex items-center gap-1">

          {isAuthenticated && (
            <Link
              to="/"
              className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              Dashboard
            </Link>
          )}

          {/* USER LINKS */}
          {isAuthenticated && role === 'user' && (
            <>
              <Link
                to="/my-borrows"
                className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
              >
                My Borrows
              </Link>

              <Link
                to="/favorites"
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
                Favorites
                {favoriteCount > 0 && (
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full leading-none">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* MANAGER LINKS */}
          {isAuthenticated && role === 'manager' && (
            <>
              <Link
                to="/requests"
                className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
              >
                Requests
              </Link>
              <Link
                to="/issued"
                className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
              >
                Issued
              </Link>
            </>
          )}

          {/* ADMIN LINKS */}
          {isAuthenticated && role === 'admin' && (
            <Link
              to="/all-borrows"
              className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              All Borrows
            </Link>
          )}

          {/* Divider */}
          {isAuthenticated && (
            <div className="w-px h-5 bg-slate-200 mx-2" />
          )}

          {/* AUTH */}
          {!isAuthenticated ? (
            <div className="flex items-center gap-2 ml-2">
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-800 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all duration-150"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors duration-150 shadow-sm"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Role badge */}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                role === 'admin'
                  ? 'bg-rose-50 text-rose-600'
                  : role === 'manager'
                  ? 'bg-amber-50 text-amber-600'
                  : 'bg-indigo-50 text-indigo-600'
              }`}>
                {role}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}

export default Navbar