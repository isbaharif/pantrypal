import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFavourites, removeFavourite } from '../services/favourites'

function Saved() {
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadFavourites()
  }, [])

  function loadFavourites() {
    setLoading(true)
    getFavourites()
      .then(setFavourites)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  async function handleRemove(e, mealId) {
    e.stopPropagation()
    try {
      await removeFavourite(mealId)
      setFavourites((prev) => prev.filter((f) => f.meal_id !== mealId))
    } catch (err) {
      console.error('Failed to remove favourite:', err)
    }
  }

  return (
    <div className="min-h-screen bg-paper px-4 pt-8 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-5xl text-ink tracking-tight mb-8">
          Filed away
        </h1>

        {loading && (
          <p className="font-mono text-xs uppercase text-ink-soft">
            Checking the shelf…
          </p>
        )}

        {error && (
          <p className="font-mono text-xs uppercase text-tomato">{error}</p>
        )}

        {!loading && favourites.length === 0 && (
          <p className="font-sans text-ink-soft">
            Nothing filed away yet. Go save something worth remembering.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {favourites.map((fav) => (
            <div
              key={fav.id}
              onClick={() => navigate(`/recipe/${fav.meal_id}`)}
              role="button"
              tabIndex={0}
              className="text-left border-[1.5px] border-ink rounded bg-paper-deep p-4 flex items-center gap-4 cursor-pointer"
            >
              <img
                src={fav.meal_thumb}
                alt={fav.meal_name}
                className="w-16 h-16 object-cover rounded border-[1.5px] border-ink flex-shrink-0"
              />
              <span className="font-sans font-medium text-ink flex-1">
                {fav.meal_name}
              </span>
              <button
                onClick={(e) => handleRemove(e, fav.meal_id)}
                className="font-mono text-xs uppercase text-ink-soft hover:text-tomato px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Saved