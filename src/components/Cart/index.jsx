import {useEffect, useState} from 'react'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import {FaRupeeSign, FaCheckCircle} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import CartEmpty from '../CartEmpty'

import './index.css'

const Cart = () => {
  const [cartList, setCartList] = useState([])

  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem('cartData')) || []

    setCartList(storedCart)
  }, [])

  const updateCart = updatedCart => {
    setCartList(updatedCart)

    localStorage.setItem(
      'cartData',
      JSON.stringify(updatedCart),
    )
  }

  const onClickIncrease = id => {
    const updatedCart = cartList.map(item =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    )

    updateCart(updatedCart)
  }

  const onClickDecrease = id => {
    const updatedCart = cartList
      .map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter(item => item.quantity > 0)

    updateCart(updatedCart)
  }

  const totalPrice = cartList.reduce(
    (total, item) =>
      total + Number(item.cost) * item.quantity,
    0,
  )

  const onClickPlaceOrder = () => {
    alert('Order placed successfully!')
  }

  return (
    <div className="cart-page">
      <Header />

      {cartList.length === 0 ? (
        <CartEmpty />
      ) : (
        <main className="cart-container">
          <h1 className="cart-heading">My Cart</h1>

          <div className="cart-items-container">
            {cartList.map(item => (
              <div
                className="cart-item"
                key={item.id}
                data-testid="cartItem"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>

                  <p className="cart-item-cost">
                    <FaRupeeSign />
                    {item.cost}
                  </p>

                  <div className="cart-quantity-container">
                    <button
                      type="button"
                      data-testid="decrement-quantity"
                      className="quantity-button"
                      onClick={() =>
                        onClickDecrease(item.id)
                      }
                    >
                      <HiOutlineMinusSm />
                    </button>

                    <p data-testid="item-quantity">
                      {item.quantity}
                    </p>

                    <button
                      type="button"
                      data-testid="increment-quantity"
                      className="quantity-button"
                      onClick={() =>
                        onClickIncrease(item.id)
                      }
                    >
                      <BsPlus />
                    </button>
                  </div>
                </div>

                <p className="item-total">
                  ₹ {Number(item.cost) * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-heading">
              <h2>Order Total</h2>

              <p data-testid="total-price">
                ₹ {totalPrice}
              </p>
            </div>

            <p className="payment-status">
              <FaCheckCircle />
              Your order is ready to place
            </p>

            <button
              type="button"
              className="place-order-button"
              onClick={onClickPlaceOrder}
            >
              Place Order
            </button>
          </div>
        </main>
      )}

      <Footer />
    </div>
  )
}

export default Cart