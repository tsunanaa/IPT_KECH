import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../global.css'

const Registration = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email, // Since default user model requires username, we map email to it
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Djoser error handling
        let errMsg = ''
        if (data.email) {
          errMsg = `Email: ${data.email.join(' ')}`
        } else if (data.username) {
          errMsg = `Username: ${data.username.join(' ')}`
        } else if (data.password) {
          errMsg = `Password: ${data.password.join(' ')}`
        } else if (data.non_field_errors) {
          errMsg = data.non_field_errors.join(' ')
        } else {
          errMsg = 'Registration failed. Please try again.'
        }
        setError(errMsg)
        return
      }

      setSuccess(true)
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
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/registration" className={({ isActive }) => isActive ? 'btn-nav active' : 'btn-nav'}>Sign Up</NavLink></li>
        </ul>
      </nav>

      <main style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card fade-up" style={{ width: '100%', maxWidth: '460px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>💄</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.9rem', color: 'var(--text-dark)', marginBottom: '0.4rem' }}>
              Join Aphrodite
            </h2>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Create your free beauty account today</p>
          </div>

          {success ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
              <h3 style={{ color: 'var(--text-dark)', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.5rem', marginBottom: '0.8rem' }}>
                Verify Your Email
              </h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                We have sent an activation link to <strong style={{ color: 'var(--pink-deep)' }}>{email}</strong>.<br />
                Please click the link in the email to activate your account and start your beauty journey.
              </p>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">Go to Login</button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Ana"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Dela Cruz"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p style={{ color: 'red', fontSize: '0.88rem', margin: '0.5rem 0 1rem 0' }}>{error}</p>}

              <button className="btn-primary" type="submit" style={{ marginTop: '0.8rem' }} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account ✦'}
              </button>
              <div className="divider">already have an account?</div>

              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary" type="button">Sign In Instead</button>
              </Link>
            </form>
          )}

          <p className="link-text">
            By signing up, you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Registration