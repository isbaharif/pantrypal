import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { getRecipeById, extractIngredients } from '../services/mealdb'
import { enhanceRecipe } from '../services/ai'
import { getSubstitute } from '../utils/substitutes'
import FavouriteButton from '../components/FavouriteButton'

function RecipeDetail() {
  const { id } = useParams()
  const location = useLocation()
  const userIngredients = location.state?.ingredients || []

  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [enhancement, setEnhancement] = useState(null)
  const [enhancementLoading, setEnhancementLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getRecipeById(id)
      .then((data) => {
        if (!data) {
          setError("That recipe's gone off.")
        } else {
          setRecipe(data)
        }
      })
      .catch(() => setError("That recipe's gone off."))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!recipe) return

    const cacheKey = `ai-enhancement-${recipe.idMeal}`
    const cached = sessionStorage.getItem(cacheKey)

    if (cached) {
      setEnhancement(JSON.parse(cached))
      return
    }

    setEnhancementLoading(true)
    enhanceRecipe(recipe)
      .then((data) => {
        setEnhancement(data)
        sessionStorage.setItem(cacheKey, JSON.stringify(data))
      })
      .catch(() => {
        setEnhancement(null)
      })
      .finally(() => setEnhancementLoading(false))
  }, [recipe])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-xs uppercase text-ink-soft">Checking the back of the fridge…</p>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-serif text-2xl text-ink">{error}</p>
        <Link to="/" className="font-mono text-xs uppercase text-tomato underline">
          Back to the pantry
        </Link>
      </div>
    )
  }

  const ingredients = extractIngredients(recipe)
  const userSet = new Set(userIngredients.map((i) => i.toLowerCase()))

    const steps = recipe.strInstructions
    .split(/\r?\n+/)
    .map((s) => s.trim())
    .filter((s) => s && !/^step\s*\d*:?$/i.test(s) && !/^\d+\.?$/.test(s))

  return (
    <div className="min-h-screen px-4 pt-8 pb-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="font-mono text-xs uppercase text-ink-soft hover:text-tomato">
          ← Back to the pantry
        </Link>

        <h1 className="font-serif text-3xl md:text-5xl text-ink tracking-tight mt-4 mb-4">
          {recipe.strMeal}
        </h1>

        <div className="mb-8">
          <FavouriteButton meal={recipe} />
        </div>

        {enhancementLoading && (
          <p className="font-mono text-xs uppercase text-ink-soft mb-6">
            Rummaging up some tips…
          </p>
        )}

        {enhancement && (
          <div className="mb-8 max-w-2xl">
            <p className="font-sans text-base md:text-lg text-ink-soft italic mb-4">
              {enhancement.blurb}
            </p>
            <ul className="flex flex-col gap-1">
              {enhancement.tips.map((tip, i) => (
                <li key={i} className="font-sans text-sm text-ink">
                  → {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid md:grid-cols-[320px_1fr] gap-6 md:gap-8">
          <div className="md:sticky md:top-8 self-start border-[1.5px] border-ink rounded bg-paper-deep p-4 md:p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-3">
              Ingredients
            </p>
            <ul className="flex flex-col gap-3">
              {ingredients.map((ing) => {
                const has = userSet.has(ing.name.toLowerCase())
                const substitute = !has ? getSubstitute(ing.name) : null

                return (
                  <li key={ing.name} className="font-sans text-sm">
                    <span className={has ? 'text-brine' : 'text-peel'}>
                      {has ? '✓ ' : '○ '}
                      {ing.name} {ing.measure && `— ${ing.measure}`}
                    </span>
                    {substitute && (
                      <p className="text-xs text-ink-soft mt-0.5 pl-4">
                        → try instead: {substitute}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="border-[1.5px] border-ink rounded bg-paper-deep p-4 md:p-5 flex gap-3 md:gap-4"
              >
                <span className="font-serif text-2xl md:text-3xl text-tomato flex-shrink-0">
                  {i + 1}
                </span>
                <p className="font-sans text-sm md:text-base text-ink leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail