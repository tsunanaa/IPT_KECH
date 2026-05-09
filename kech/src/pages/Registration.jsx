import { Link, NavLink } from 'react-router-dom'
import '../global.css'

const Registration = () => {
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Ana" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Dela Cruz" />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a strong password" />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Repeat your password" />
          </div>

          <button className="btn-primary" style={{ marginTop: '0.8rem' }}>Create Account ✦</button>
          <div className="divider">already have an account?</div>

          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary">Sign In Instead</button>
          </Link>

          <p className="link-text">
            By signing up, you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Registration