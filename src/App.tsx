import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Toaster position="top-center" />
        <Dashboard />
      </main>
    </div>
  )
}

export default App
