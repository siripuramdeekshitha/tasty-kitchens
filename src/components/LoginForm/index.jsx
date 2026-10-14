import {useState} from 'react'
import {useNavigate} from 'react-router'
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitLoginForm = async event => {
    event.preventDefault()

    setErrorMsg('')
    setIsLoading(true)

    const userDetails = {
      username,
      password,
    }

    try {
      const response = await fetch('https://apis.ccbp.in/login', {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token)
        navigate('/', {replace: true})
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="tk-login-page">
      <div className="tk-login-image-section">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
          alt="website login"
          className="tk-login-image"
        />
      </div>

      <div className="tk-login-form-section">
        <form
          className="tk-login-form"
          onSubmit={onSubmitLoginForm}
        >
          <div className="tk-login-logo">
            <span className="tk-login-logo-icon">🍴</span>
            <span className="tk-login-logo-text">
              Tasty Kitchens
            </span>
          </div>

          <div className="tk-input-container">
            <label htmlFor="username">USERNAME</label>

            <input
              id="username"
              type="text"
              value={username}
              placeholder="Username"
              onChange={event =>
                setUsername(event.target.value)
              }
            />
          </div>

          <div className="tk-input-container">
            <label htmlFor="password">PASSWORD</label>

            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={event =>
                setPassword(event.target.value)
              }
            />
          </div>

          {errorMsg !== '' && (
            <p className="tk-error-message">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="tk-login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm