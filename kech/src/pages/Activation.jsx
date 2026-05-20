import { useEffect, useState, useRef } from 'react'
import { useParams, Link, NavLink } from 'react-router-dom'
import '../global.css'

const Activation = () => {
  const { uid, token } = useParams()
  const [status, setStatus] = useState('verifying') // 'verifying' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const hasTriggered = useRef(false)

  useEffect(() => {
    // Avoid double triggering in React 18 strict mode
    if (hasTriggered.current) return
    hasTriggered.current = true

    const activateAccount = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/auth/users/activation/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, token }),
        })

        if (response.ok) {
          setStatus('success')
        } else {
          const data = await response.json().catch(() => ({}))
          setStatus('error')
          
          let detail = ''
          if (data.uid) detail += `UID: ${data.uid.join(' ')}. `
          if (data.token) detail += `Token: ${data.token.join(' ')}. `
          if (data.detail) detail += data.detail
          
          setErrorMsg(detail || 'This activation link is invalid or has expired.')
        }
      } catch (err) {
        setStatus('error')
        setErrorMsg('Unable to reach server. Make sure the backend is running.')
      }
    }

    activateAccount()
  }, [uid, token])

  return (
    <div className="bg-wrapper">
      <nav className="navbar">
        <a href="/" className="navbar-brand">✦ Aphrodite</a>
        <ul className="navbar-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/registration" className="btn-nav">Sign Up</NavLink></li>
        </ul>
      </nav>

      <main style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div className="card fade-up" style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
          
          {status === 'verifying' && (
            <div style={{ padding: '2rem 0' }}>
              <div className="spinner" style={{
                width: '50px',
                height: '50px',
                border: '4px solid var(--pink-blush)',
                borderTop: '4px solid var(--pink-deep)',
                borderRadius: '50%',
                margin: '0 auto 1.5rem auto',
                animation: 'spin 1s linear infinite'
              }}></div>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.9rem', color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
                Verifying Your Account
              </h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
                Please wait while we activate your account...
              </p>
            </div>
          )}

          {status === 'success' && (
            <div style={{ padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.9rem', color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
                Activation Successful!
              </h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.2rem' }}>
                Congratulations! Your email has been successfully verified, and your Aphrodite account is now fully active.
              </p>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">Sign In to Your Account</button>
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div style={{ padding: '1rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.9rem', color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
                Activation Failed
              </h2>
              <p style={{ color: '#d32f2f', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.2rem', background: 'rgba(211, 47, 47, 0.06)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(211, 47, 47, 0.15)' }}>
                {errorMsg}
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/registration" style={{ flex: 1, textDecoration: 'none' }}>
                  <button className="btn-secondary" style={{ margin: 0 }}>Register Again</button>
                </Link>
                <Link to="/login" style={{ flex: 1, textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ margin: 0 }}>Go to Login</button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default Activation
