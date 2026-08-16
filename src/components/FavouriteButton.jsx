import { useEffect, useState } from 'react'
import { getFavourites, addFavourite, removeFavourite } from '../services/favourites'

function FavouriteButton({ meal }) {
  const [isFavourited, setIsFavourited] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getFavourites()
      .then((favourites) => {
        if (cancelled) return
        const match = favourites.some((f) => f.meal_id === meal.idMeal)
        setIsFavourited(match)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [meal.idMeal])

  async function handleToggle(e) {
    e.stopPropagation() // don't trigger card click-through when used inside a card
    setLoading(true)

    try {
      if (isFavourited) {
        await removeFavourite(meal.idMeal)
        setIsFavourited(false)
      } else {
        await addFavourite(meal)
        setIsFavourited(true)
      }
    } catch (err) {
      console.error('Favourite toggle failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`font-mono text-xs uppercase tracking-wide px-3 py-1.5 border-[1.5px] border-ink rounded transition disabled:opacity-50 ${
        isFavourited
          ? 'bg-tomato text-paper'
          : 'bg-paper text-ink hover:bg-ink hover:text-paper'
      }`}
    >
      {isFavourited ? 'Filed away ✓' : 'Save this'}
    </button>
  )
}

export default FavouriteButton