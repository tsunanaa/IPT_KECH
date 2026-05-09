import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../global.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const loginBody = { password }
      if (email.includes('@')) {
        loginBody.email = email
      }
      loginBody.username = email

      const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginBody),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data?.detail || data?.non_field_errors?.[0] || 'Login failed. Check your email and password.')
        return
      }

      const token = data?.auth_token || data?.token
      if (!token) {
        setError('Login succeeded but no token was returned.')
        return
      }

      localStorage.setItem('authToken', token)
      navigate('/')
    } catch (err) {
      setError('Unable to reach server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-wrapper">
      <nav className="navbar">
        <a href="/" className="navbar-brand">✦ Aphrodite</a>
        <ul className="navbar-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink></li>
          <li><NavLink to="/registration" className="btn-nav">Sign Up</NavLink></li>
        </ul>
      </nav>

      <main style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card fade-up" style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>🌸</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.9rem', color: 'var(--text-dark)', marginBottom: '0.4rem' }}>
              Welcome Back
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Sign in to your Aphrodite account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginBottom: '0.5rem' }}>
              <a href="#" style={{ fontSize: '0.83rem', color: 'var(--pink-deep)', textDecoration: 'none' }}>Forgot password?</a>
            </div>

            {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In ✦'}
            </button>
          </form>
          <div className="divider">or</div>

          <Link to="/registration" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary">Create an Account</button>
          </Link>

          <p className="link-text">
            Don't have an account? <Link to="/registration">Sign up here</Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login