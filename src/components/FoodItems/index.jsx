import {useState} from 'react'

import './index.css'

const FoodItems = props => {
  const {foodItem, onAddFoodItem, onRemoveFoodItem} = props

  const [quantity, setQuantity] = useState(() => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    const existingItem = cartData.find(item => item.id === foodItem.id)

    return existingItem ? existingItem.quantity : 0
  })

  const onClickAdd = () => {
    setQuantity(1)
    onAddFoodItem(foodItem)
  }

  const onClickIncrease = () => {
    setQuantity(previousQuantity => previousQuantity + 1)
    onAddFoodItem(foodItem)
  }

  const onClickDecrease = () => {
    if (quantity === 1) {
      setQuantity(0)
      onRemoveFoodItem(foodItem.id)
    } else {
      setQuantity(previousQuantity => previousQuantity - 1)
      onRemoveFoodItem(foodItem.id)
    }
  }

  return (
    <li className="food-item" data-testid="foodItem">
      <img
        src={foodItem.image_url}
        alt={foodItem.name}
        className="food-item-image"
      />

      <div className="food-item-details">
        <h3>{foodItem.name}</h3>

        <p className="food-item-price">
          ₹ {foodItem.cost}
        </p>

        <p className="food-item-rating">
          ⭐ {foodItem.rating}
        </p>

        {quantity === 0 ? (
          <button
            type="button"
            className="add-button"
            onClick={onClickAdd}
          >
            ADD
          </button>
        ) : (
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-button"
              data-testid="decrement-count"
              onClick={onClickDecrease}
            >
              -
            </button>

            <span data-testid="active-count">
              {quantity}
            </span>

            <button
              type="button"
              className="quantity-button"
              data-testid="increment-count"
              onClick={onClickIncrease}
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItems