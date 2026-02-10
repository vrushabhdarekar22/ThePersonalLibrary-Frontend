import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <h1 className="text-2xl font-semibold p-4">
          📚 Personal Library
        </h1>
      </header>

      <main className="max-w-5xl mx-auto p-4">
        <Dashboard />
      </main>
    </div>
  )
}

export default App
