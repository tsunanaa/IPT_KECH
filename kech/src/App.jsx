import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Activation from './pages/Activation'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/activate/:uid/:token" element={<Activation />} />
      </Routes>
    </Router>
  )
}

export default App