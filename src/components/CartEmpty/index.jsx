
import {Link} from 'react-router'

import './index.css'

const CartEmpty = () => (
  <div className="cart-empty-container">
    <div className="empty-cart-icon">
      🛒
    </div>

    <h1>Your Cart Is Empty</h1>

    <p>Add some delicious food to your cart.</p>

    <Link to="/" className="order-food-button">
      Order Food
    </Link>
  </div>
)

export default CartEmpty