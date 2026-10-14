import {Link} from 'react-router'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-image"
    />

    <h1>Page Not Found</h1>

    <p>We are sorry, the page you requested could not be found.</p>

    <Link to="/" className="not-found-button">
      Go to Home
    </Link>
  </div>
)

export default NotFound