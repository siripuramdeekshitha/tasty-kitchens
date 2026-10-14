import {useEffect, useState} from 'react'
import {Link} from 'react-router'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import RestaurantsHeader from '../RestaurantsHeader'
import SomethingWentWrong from '../SomethingWentWrong'

import './index.css'

const LIMIT = 9

const Home = () => {
  const [offers, setOffers] = useState([])
  const [restaurants, setRestaurants] = useState([])

  const [isOffersLoading, setIsOffersLoading] = useState(true)
  const [isRestaurantsLoading, setIsRestaurantsLoading] =
    useState(true)

  const [offersError, setOffersError] = useState(false)
  const [restaurantsError, setRestaurantsError] = useState(false)

  const [activePage, setActivePage] = useState(1)
  const [sortBy, setSortBy] = useState('Lowest')
  const [totalRestaurants, setTotalRestaurants] = useState(0)

  const [searchInput, setSearchInput] = useState('')

  const [activeOffer, setActiveOffer] = useState(0)

  // =========================
  // GET OFFERS
  // =========================

  useEffect(() => {
    const getOffers = async () => {
      setIsOffersLoading(true)
      setOffersError(false)

      const jwtToken = Cookies.get('jwt_token')

      try {
        const response = await fetch(
          'https://apis.ccbp.in/restaurants-list/offers',
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        )

        const data = await response.json()

        if (response.ok) {
          setOffers(data.offers || [])
          setActiveOffer(0)
        } else {
          setOffersError(true)
        }
      } catch (error) {
        setOffersError(true)
      }

      setIsOffersLoading(false)
    }

    getOffers()
  }, [])

  // =========================
  // AUTO CHANGE OFFER
  // =========================

  useEffect(() => {
    if (offers.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setActiveOffer(previousIndex => {
        if (previousIndex === offers.length - 1) {
          return 0
        }

        return previousIndex + 1
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [offers])

  // =========================
  // GET RESTAURANTS
  // =========================

  useEffect(() => {
    const getRestaurants = async () => {
      setIsRestaurantsLoading(true)
      setRestaurantsError(false)

      const jwtToken = Cookies.get('jwt_token')
      const offset = (activePage - 1) * LIMIT

      try {
        const response = await fetch(
          `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortBy}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        )

        const data = await response.json()

        if (response.ok) {
          setRestaurants(data.restaurants || [])
          setTotalRestaurants(data.total || 0)
        } else {
          setRestaurantsError(true)
        }
      } catch (error) {
        setRestaurantsError(true)
      }

      setIsRestaurantsLoading(false)
    }

    getRestaurants()
  }, [activePage, sortBy])

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(totalRestaurants / LIMIT)

  const onChangeSort = event => {
    setSortBy(event.target.value)
    setActivePage(1)
  }

  const onClickPrevious = () => {
    if (activePage > 1) {
      setActivePage(previousPage => previousPage - 1)
    }
  }

  const onClickNext = () => {
    if (activePage < totalPages) {
      setActivePage(previousPage => previousPage + 1)
    }
  }

  // =========================
  // SEARCH
  // =========================

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name
      .toLowerCase()
      .includes(searchInput.toLowerCase()),
  )

  // =========================
  // OFFER BUTTONS
  // =========================

  const onClickPreviousOffer = () => {
    if (offers.length === 0) {
      return
    }

    setActiveOffer(previousIndex => {
      if (previousIndex === 0) {
        return offers.length - 1
      }

      return previousIndex - 1
    })
  }

  const onClickNextOffer = () => {
    if (offers.length === 0) {
      return
    }

    setActiveOffer(previousIndex => {
      if (previousIndex === offers.length - 1) {
        return 0
      }

      return previousIndex + 1
    })
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="tk-home-page">
      <Header />

      <main className="tk-home-main">

        {/* HERO */}

        <section className="tk-hero-section">
          <div className="tk-hero-content">

            <p className="tk-hero-small-text">
              DELICIOUS FOOD, DELIVERED FAST
            </p>

            <h1>
              Hungry?
              <br />
              Find your favourite food.
            </h1>

            <p className="tk-hero-description">
              Discover the best restaurants and delicious meals
              near you.
            </p>

            <div className="tk-search-box">
              <span className="tk-search-icon">⌕</span>

              <input
                type="search"
                placeholder="Search for restaurant"
                value={searchInput}
                onChange={event =>
                  setSearchInput(event.target.value)
                }
              />
            </div>

          </div>
        </section>

        {/* OFFERS */}

        <section className="tk-offers-section">

          <div className="tk-section-heading">
            <div>
              <p className="tk-section-label">
                BEST DEALS
              </p>

              <h2>Offers for you</h2>
            </div>
          </div>

          {isOffersLoading ? (
            <div
              className="tk-loader"
              data-testid="restaurants-offers-loader"
            >
              <p>Loading offers...</p>
            </div>
          ) : offersError ? (
            <div className="tk-offers-error">
              <p>Unable to load offers.</p>
            </div>
          ) : offers.length === 0 ? (
            <div className="tk-offers-error">
              <p>No offers available.</p>
            </div>
          ) : (
            <div className="tk-offer-slider">

              <div className="tk-offer-slide">
                <img
                  src={offers[activeOffer].image_url}
                  alt="offer"
                  className="tk-offer-image"
                />
              </div>

              {offers.length > 1 && (
                <>
                  <button
                    type="button"
                    className="offer-prev-button"
                    onClick={onClickPreviousOffer}
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    className="offer-next-button"
                    onClick={onClickNextOffer}
                  >
                    →
                  </button>

                  <div className="offer-dots">
                    {offers.map((offer, index) => (
                      <button
                        key={offer.id}
                        type="button"
                        className={
                          index === activeOffer
                            ? 'offer-dot active'
                            : 'offer-dot'
                        }
                        onClick={() => setActiveOffer(index)}
                        aria-label={`Go to offer ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

            </div>
          )}
        </section>

        {/* RESTAURANTS */}

        <section className="tk-restaurants-section">

          <div className="tk-restaurants-heading">
            <div>

              <p className="tk-section-label">
                EXPLORE
              </p>

              <h2>Popular Restaurants</h2>

              <p className="tk-subtitle">
                Discover the best restaurants around you
              </p>

            </div>
          </div>

          <RestaurantsHeader
            sortBy={sortBy}
            onChange={onChangeSort}
          />

          {isRestaurantsLoading ? (
            <div
              className="tk-loader"
              data-testid="restaurants-list-loader"
            >
              <p>Loading restaurants...</p>
            </div>
          ) : restaurantsError ? (
            <SomethingWentWrong />
          ) : filteredRestaurants.length === 0 ? (
            <div className="tk-no-results">

              <div className="tk-no-results-icon">
                🍽️
              </div>

              <h3>No restaurants found</h3>

              <p>
                Try searching with another restaurant name.
              </p>

            </div>
          ) : (
            <>
              <div className="tk-restaurant-grid">

                {filteredRestaurants.map(restaurant => (
                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    key={restaurant.id}
                    className="tk-restaurant-link"
                    data-testid="restaurant-item"
                  >

                    <article className="tk-restaurant-card">

                      <div className="tk-restaurant-image-container">

                        <img
                          src={restaurant.image_url}
                          alt="restaurant"
                          className="tk-restaurant-image"
                        />

                        <span className="tk-rating-badge">
                          ⭐{' '}
                          {restaurant.user_rating?.rating || 'N/A'}
                        </span>

                      </div>

                      <div className="tk-restaurant-content">

                        <h3 className="tk-restaurant-name">
                          {restaurant.name}
                        </h3>

                        <p className="tk-restaurant-cuisine">
                          {restaurant.cuisine}
                        </p>

                        <div className="tk-restaurant-meta">

                          <span>
                            ⭐{' '}
                            {restaurant.user_rating?.rating ||
                              'N/A'}
                          </span>

                          <span>
                            {restaurant.user_rating?.votes ||
                              0}{' '}
                            ratings
                          </span>

                        </div>

                      </div>

                    </article>

                  </Link>
                ))}

              </div>

              {/* PAGINATION */}

              {totalPages > 0 && searchInput === '' && (
                <div className="tk-pagination">

                  <button
                    type="button"
                    data-testid="pagination-left-button"
                    className="tk-pagination-button"
                    onClick={onClickPrevious}
                    disabled={activePage === 1}
                  >
                    ←
                  </button>

                  <p>
                    <span data-testid="active-page-number">
                      {activePage}
                    </span>

                    <span> of {totalPages}</span>
                  </p>

                  <button
                    type="button"
                    data-testid="pagination-right-button"
                    className="tk-pagination-button"
                    onClick={onClickNext}
                    disabled={activePage === totalPages}
                  >
                    →
                  </button>

                </div>
              )}

            </>
          )}

        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Home