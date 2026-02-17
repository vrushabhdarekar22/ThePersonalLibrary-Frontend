import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { loginSuccess } from '../features/auth/authSlice'
import type { AppDispatch } from '../app/store'

interface DecodedToken {
  sub: number
  email: string
  role: string
  exp: number
  iat: number
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error('Invalid credentials')

      const data = await res.json()
      const token = data.access_token
      const decoded: DecodedToken = jwtDecode(token)

      dispatch(loginSuccess({ token, role: decoded.role }))
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-slate-200 px-7 py-9">

        {/* Header */}
        <div className="mb-7 text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 bg-indigo-50 rounded-xl mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-indigo-600" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-0.5">Sign in to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 text-xs px-3.5 py-2.5 rounded-lg mb-4 border border-red-100">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

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
              className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all duration-150"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-600">
                Password
              </label>
              <button type="button" className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder-slate-300 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all duration-150"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm py-2.5 rounded-lg transition-colors duration-150 flex items-center justify-center gap-2 mt-1"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in…
              </>
            ) : (
              'Sign in'
            )}
          </button>

        </form>

        {/* Register */}
        <p className="text-center text-xs text-slate-400 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
            Register
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login