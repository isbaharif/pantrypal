import { useEffect, useState, useRef } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { getRecipeById, extractIngredients } from '../services/mealdb'
import { enhanceRecipe } from '../services/ai'
import { getSubstitute } from '../utils/substitutes'
import FavouriteButton from '../components/FavouriteButton'
import RecipeLoader from '../components/RecipeLoader'
import { enhanceCookModeSteps } from '../services/ai'
import { DoodlePot, DoodleBowl, DoodleTimer, DoodleKnife, DoodleOven, DoodlePlate } from '../components/Doodles'

function RecipeDetail() {
  const { id } = useParams()
  const location = useLocation()
  const userIngredients = location.state?.ingredients || []

  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [enhancement, setEnhancement] = useState(null)
  const [enhancementLoading, setEnhancementLoading] = useState(false)

  const [cookSteps, setCookSteps] = useState(null)
  const [cookStepsLoading, setCookStepsLoading] = useState(false)

  const [copied, setCopied] = useState(false)
  const [cookMode, setCookMode] = useState(false)
  const wakeLockRef = useRef(null)

    useEffect(() => {
    setLoading(true)
    const startTime = Date.now()
    const MIN_LOADING_MS = 5000

    getRecipeById(id)
        .then((data) => {
        if (!data) {
            setError("That recipe's gone off.")
        } else {
            setRecipe(data)
        }
        })
        .catch(() => setError("That recipe's gone off."))
        .finally(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed)
        setTimeout(() => setLoading(false), remaining)
        })
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

  useEffect(() => {
    return () => {
      wakeLockRef.current?.release()
    }
  }, [])

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

    async function toggleCookMode() {
    if (!cookMode) {
        try {
        wakeLockRef.current = await navigator.wakeLock?.request('screen')
        } catch {
        // wake lock not supported or denied
        }
        setCookMode(true)

        if (!cookSteps) {
        setCookStepsLoading(true)
        const cacheKey = `cook-steps-${recipe.idMeal}`
        const cached = sessionStorage.getItem(cacheKey)

        if (cached) {
            setCookSteps(JSON.parse(cached).steps)
            setCookStepsLoading(false)
        } else {
            try {
            const result = await enhanceCookModeSteps(recipe, steps)
            setCookSteps(result.steps)
            sessionStorage.setItem(cacheKey, JSON.stringify(result))
            } catch {
            setCookSteps(null) // fall back to plain steps silently
            } finally {
            setCookStepsLoading(false)
            }
        }
        }
    } else {
        wakeLockRef.current?.release()
        wakeLockRef.current = null
        setCookMode(false)
    }
    }

  if (loading) {
    return <RecipeLoader />
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

  const ICONS = { pot: DoodlePot, pan: DoodleBowl, knife: DoodleKnife, timer: DoodleTimer, bowl: DoodleBowl, oven: DoodleOven, plate: DoodlePlate }
  
  return (
    <div className="min-h-screen px-4 pt-8 pb-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="font-mono text-xs uppercase text-ink-soft hover:text-tomato">
          ← Back to the pantry
        </Link>

        <h1 className="font-serif text-3xl md:text-5xl text-ink tracking-tight mt-4 mb-4">
          {recipe.strMeal}
        </h1>

        <div className="mb-8 flex items-center gap-3">
          <FavouriteButton meal={recipe} />
          <button
            onClick={handleShare}
            className="font-mono text-xs uppercase tracking-wide px-3 py-1.5 border-[1.5px] border-ink rounded bg-paper hover:bg-ink hover:text-paper transition"
          >
            {copied ? 'Copied ✓' : 'Copy link'}
          </button>
          <button
            onClick={toggleCookMode}
            className="font-mono text-xs uppercase tracking-wide px-3 py-1.5 border-[1.5px] border-ink rounded bg-brine text-paper hover:opacity-90 transition"
          >
            {cookMode ? 'Exit cook mode' : 'Cook mode'}
          </button>
        </div>

        {enhancement && !cookMode && (
          <div className="mb-8 max-w-2xl">
            {enhancementLoading && (
              <p className="font-mono text-xs uppercase text-ink-soft mb-6">
                Rummaging up some tips…
              </p>
            )}
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

        {enhancementLoading && !enhancement && !cookMode && (
          <p className="font-mono text-xs uppercase text-ink-soft mb-6">
            Rummaging up some tips…
          </p>
        )}

        <div className={cookMode ? '' : 'grid md:grid-cols-[320px_1fr] gap-6 md:gap-8'}>
          {!cookMode && (
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
          )}

          <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
            {cookMode && cookStepsLoading && (
                <p className="font-mono text-xs uppercase text-ink-soft text-center">
                Sharpening the details…
                </p>
            )}

            {steps.map((step, i) => {
                const enhanced = cookMode && cookSteps ? cookSteps[i] : null
                const Icon = enhanced ? ICONS[enhanced.icon] || DoodlePot : null

                return (
                <div
                    key={i}
                    className={`border-[1.5px] border-ink rounded bg-paper-deep flex gap-3 md:gap-4 items-start ${
                    cookMode ? 'p-6' : 'p-4 md:p-5'
                    }`}
                >
                    {cookMode && Icon ? (
                    <Icon className="w-9 h-9 text-tomato flex-shrink-0 mt-1" />
                    ) : (
                    <span className={`font-serif text-tomato flex-shrink-0 ${cookMode ? 'text-4xl' : 'text-2xl md:text-3xl'}`}>
                        {i + 1}
                    </span>
                    )}
                    <p className={`font-sans text-ink leading-relaxed ${cookMode ? 'text-xl' : 'text-sm md:text-base'}`}>
                    {enhanced ? enhanced.text : step}
                    </p>
                </div>
                )
            })}
            </div>
        </div>
    </div>
    </div>
)
}

export default RecipeDetail