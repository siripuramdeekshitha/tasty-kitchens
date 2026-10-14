import './index.css'

const SomethingWentWrong = () => (
  <div className="something-wrong-container">
    <h1>Something Went Wrong</h1>

    <p>
      We are having trouble loading this page. Please try again.
    </p>

    <button
      type="button"
      className="try-again-button"
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
)

export default SomethingWentWrong