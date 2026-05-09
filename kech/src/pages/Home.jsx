import { Link, NavLink } from 'react-router-dom'
import '../global.css'
import aphrodite from '../assets/aphrodite.jpg'

const Home = () => {
  return (
    <div className="bg-wrapper">
      <nav className="navbar">
        <a href="/" className="navbar-brand">✦ Aphrodite</a>
        <ul className="navbar-links">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/registration" className="btn-nav">Sign Up</NavLink></li>
        </ul>
      </nav>

      <main style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', maxWidth: '1100px', width: '100%', flexWrap: 'wrap' }}>
          
          {/* LEFT: Text Content */}
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <p className="fade-up" style={{ fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--pink-deep)', marginBottom: '1rem' }}>
              ✦ Welcome to Your Beauty World
            </p>

            <h1 className="fade-up-delay" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', fontStyle: 'italic', lineHeight: 1.15, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
              Glow Up,<br />
              <span style={{ color: 'var(--pink-deep)' }}>Feel Beautiful</span>
            </h1>

            <p className="fade-up-delay-2" style={{ fontSize: '1.05rem', color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Discover your perfect beauty routine. From skincare essentials to
              stunning makeup — everything you need, all in one place.
            </p>

            <div className="fade-up-delay-2" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/registration" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: 'auto', padding: '0.85rem 2.5rem' }}>
                  Get Started ✦
                </button>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary" style={{ width: 'auto', padding: '0.85rem 2.5rem' }}>
                  Sign In
                </button>
              </Link>
            </div>
          </div>

        
          <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
            <img
              src={aphrodite}
              alt="Aphrodite Beauty"
              style={{
                width: '380px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0px 10px 30px rgba(255,105,135,0.25))'
              }}
            />
          </div>

        </div>
      </main>
    </div>
  )
}

export default Home