import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error('Invalid credentials')
      }

      const data = await res.json()
      const token = data.access_token

      // Decode token to get role
      const decoded: DecodedToken = jwtDecode(token)

      // Save to Redux
      dispatch(
        loginSuccess({
          token,
          role: decoded.role,
        })
      )

      navigate('/') // redirect to dashboard

    } catch (err: any) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Login
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>

      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}

export default Login
