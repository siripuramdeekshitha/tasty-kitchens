import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-logo-container">
      <span className="footer-logo-icon">🍴</span>
      <span className="footer-logo-text">Tasty Kitchens</span>
    </div>

    <p className="footer-description">
      The only thing we are serious about is food.
    </p>

    <div className="social-icons-container">
      <a
        href="https://www.pinterest.com/"
        target="_blank"
        rel="noreferrer"
        id="pintrest-social-icon"
        aria-label="Pinterest"
      >
        <FaPinterestSquare />
      </a>

      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noreferrer"
        id="instagram-social-icon"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>

      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noreferrer"
        id="twitter-social-icon"
        aria-label="Twitter"
      >
        <FaTwitter />
      </a>

      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noreferrer"
        id="facebook-social-icon"
        aria-label="Facebook"
      >
        <FaFacebookSquare />
      </a>
    </div>
  </footer>
)

export default Footer