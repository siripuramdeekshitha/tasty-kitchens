import {Routes, Route} from 'react-router'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import RestaurantDetails from './components/RestaurantDetails'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/restaurant/:id"
      element={
        <ProtectedRoute>
          <RestaurantDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default App