import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'

function Navbar() {
  const favoriteCount = useSelector(
    (state: RootState) =>
      state.favorites.favoriteIds.length
  )

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <div className="bg-white text-indigo-600 w-9 h-9 flex items-center justify-center rounded-xl font-bold text-lg shadow-sm">
            P
          </div>

          <h1 className="text-xl font-bold tracking-tight text-white">
            Personal Library
          </h1>
        </div>

        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition hover:bg-white/30">

          <span className="text-white text-sm font-medium">
            Favorites
          </span>

          <span className="bg-white text-indigo-600 text-xs px-2.5 py-0.5 rounded-full font-semibold">
            {favoriteCount}
          </span>

        </div>

      </div>
    </nav>
  )
}

export default Navbar
