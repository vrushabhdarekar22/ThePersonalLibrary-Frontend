import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'

function App() {
  const favoriteCount = useSelector(
    (state) => state.favorites.favoriteIds.length
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold">
          📚 Personal Library
        </h1>

        <div className="text-lg">
          ⭐ Favorites: {favoriteCount}
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
