import {Link, useNavigate} from 'react-router'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <nav className="header-container">
      <Link to="/" className="logo-link">
        <div className="tasty-logo">
          <span className="logo-icon">🍴</span>
          <span className="logo-text">Tasty Kitchens</span>
        </div>
      </Link>

      <div className="nav-links-container">
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/cart" className="nav-link">
          Cart
        </Link>

        <button
          type="button"
          className="logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header