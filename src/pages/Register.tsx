import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        // handle validation array errors
        if (Array.isArray(data.message)) {
          throw new Error(data.message.join(', '))
        }
        throw new Error(data.message || 'Registration failed')
      }

      setSuccess('Account created! Redirecting to login…')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-200 px-7 py-9">

        <div className="mb-7 text-center">
          <h2 className="text-xl font-semibold text-slate-800">Create an account</h2>
          <p className="text-slate-400 text-sm mt-0.5">Sign up to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-green-100">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              placeholder="John Doe"
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-2.5 pr-10 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !!success}
            className="w-full bg-indigo-600 text-white text-sm py-2.5 rounded-lg"
          >
            {isLoading ? 'Creating account…' : 'Create account'}
          </button>

        </form>

        <p className="text-center text-xs text-slate-400 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register
