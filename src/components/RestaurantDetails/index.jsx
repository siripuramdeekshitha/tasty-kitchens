import {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import Cookies from 'js-cookie'

import Header from '../Header'
import FoodItems from '../FoodItems'
import Footer from '../Footer'
import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

const RestaurantDetails = () => {
  const {id} = useParams()

  const [restaurant, setRestaurant] = useState(null)
  const [foodItems, setFoodItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getRestaurantDetails = async () => {
      setIsLoading(true)
      setHasError(false)

      const jwtToken = Cookies.get('jwt_token')

      try {
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list/${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        )

        const data = await response.json()

        if (response.ok) {
          setRestaurant(data)
          setFoodItems(data.food_items || [])
        } else {
          setHasError(true)
        }
      } catch (error) {
        setHasError(true)
      }

      setIsLoading(false)
    }

    getRestaurantDetails()
  }, [id])

  const onAddFoodItem = foodItem => {
    const existingCart =
      JSON.parse(localStorage.getItem('cartData')) || []

    const existingItem = existingCart.find(
      item => item.id === foodItem.id,
    )

    let updatedCart

    if (existingItem) {
      updatedCart = existingCart.map(item =>
        item.id === foodItem.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      )
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: foodItem.id,
          name: foodItem.name,
          cost: foodItem.cost,
          imageUrl: foodItem.image_url,
          quantity: 1,
        },
      ]
    }

    localStorage.setItem(
      'cartData',
      JSON.stringify(updatedCart),
    )
  }

  const onRemoveFoodItem = foodItemId => {
    const existingCart =
      JSON.parse(localStorage.getItem('cartData')) || []

    const existingItem = existingCart.find(
      item => item.id === foodItemId,
    )

    if (!existingItem) {
      return
    }

    let updatedCart

    if (existingItem.quantity > 1) {
      updatedCart = existingCart.map(item =>
        item.id === foodItemId
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
    } else {
      updatedCart = existingCart.filter(
        item => item.id !== foodItemId,
      )
    }

    localStorage.setItem(
      'cartData',
      JSON.stringify(updatedCart),
    )
  }

  if (isLoading) {
    return (
      <div
        className="restaurant-details-loader"
        data-testid="restaurant-details-loader"
      >
        <p>Loading...</p>
      </div>
    )
  }

  if (hasError || restaurant === null) {
    return <SomethingWentWrong />
  }

  return (
    <div className="restaurant-details-page">
      <Header />

      <main>
        <section className="restaurant-banner">
          <img
            src={restaurant.image_url}
            alt="restaurant"
            className="restaurant-banner-image"
          />

          <div className="restaurant-info">
            <h1>{restaurant.name}</h1>

            <p>{restaurant.cuisine}</p>

            <p>{restaurant.location}</p>

            <div className="rating-info">
              <span>⭐ {restaurant.rating}</span>

              <span>
                {restaurant.reviews_count} Reviews
              </span>
            </div>
          </div>
        </section>

        <section className="food-section">
          <ul className="food-items-list">
            {foodItems.map(foodItem => (
              <FoodItems
                key={foodItem.id}
                foodItem={foodItem}
                onAddFoodItem={onAddFoodItem}
                onRemoveFoodItem={onRemoveFoodItem}
              />
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default RestaurantDetails