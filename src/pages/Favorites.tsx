import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'
import { useGetFavoritesQuery, useRemoveFavoriteMutation } from '../features/books/booksApi'
import BookCard from '../components/BookCard'
import type { Book } from '../types/book'

function Favorites() {
  const { role } = useSelector((state: RootState) => state.auth)

  const isUser = role === 'user'

  const { data: favorites = [], isLoading, error } = useGetFavoritesQuery(undefined, {
    skip: !isUser,
  })

  const [removeFavorite] = useRemoveFavoriteMutation()

  if (!isUser) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-sm">
          Only users can view favorites.
        </p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-sm text-slate-400">
        Loading favorites...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10 text-sm">
        Failed to load favorites
      </p>
    )
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-semibold text-slate-800 mb-6">
          My Favorites
        </h2>

        {favorites.length === 0 ? (
          <div className="text-center mt-16 text-slate-400">
            <p className="text-base font-medium">
              No favorite books yet
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((book: Book) => (
              <BookCard
                key={book._id}
                book={book}
                isFavorite={true}
                showFavorite={true}
                onToggleFavorite={() => removeFavorite(book._id)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Favorites
