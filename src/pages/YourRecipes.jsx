import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUserRecipes } from '../services/recipes'

function YourRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getUserRecipes()
      .then(setRecipes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen px-4 pt-8 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <h1 className="font-serif text-3xl md:text-5xl text-ink tracking-tight">
            Your recipes
          </h1>
          <Link
            to="/add-recipe"
            className="font-mono text-xs uppercase tracking-wide text-paper bg-tomato px-4 py-2 rounded border-[1.5px] border-ink self-start"
            style={{ boxShadow: '3px 3px 0 var(--color-ink)' }}
          >
            + Add one
          </Link>
        </div>

        {loading && (
          <p className="font-mono text-xs uppercase text-ink-soft">Checking the shelf…</p>
        )}

        {error && (
          <p className="font-mono text-xs uppercase text-tomato">{error}</p>
        )}

        {!loading && recipes.length === 0 && (
          <p className="font-sans text-ink-soft">
            Nothing here yet. Got a recipe worth sharing?
          </p>
        )}

        <div className="flex flex-col gap-2">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => navigate(`/my-recipes/${recipe.id}`)}
              role="button"
              tabIndex={0}
              className="text-left border-[1.5px] border-ink rounded bg-paper-deep p-4 cursor-pointer"
            >
              <h3 className="font-sans font-medium text-ink">{recipe.title}</h3>
              {recipe.description && (
                <p className="font-sans text-sm text-ink-soft mt-1 line-clamp-1">
                  {recipe.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default YourRecipes