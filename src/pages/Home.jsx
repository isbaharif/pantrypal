import { useState } from 'react'
import IngredientInput from '../components/IngredientInput'
import RecipeCard from '../components/RecipeCard'
import CuisinePicker from '../components/CuisinePicker'
import DietaryFilter from '../components/DietaryFilter'
import useRecipes from '../hooks/useRecipes'
import { useNavigate } from 'react-router-dom'
import { DoodleScribble } from '../components/Doodles'
import { findDietaryConflicts, getConflictMessage } from '../utils/dietaryConflicts'

function Home() {
  const [ingredients, setIngredients] = useState([])
  const [cuisine, setCuisine] = useState(null)
  const [dietary, setDietary] = useState(null)
  const [sortMode, setSortMode] = useState('match') // 'match' | 'gaps' | 'fastest'
  const { recipes, loading, error, search } = useRecipes()
  const navigate = useNavigate()

  function handleCardClick(id) {
    navigate(`/recipe/${id}`, { state: { ingredients } })
  }

  function handleAdd(item) {
    const updated = [...ingredients, item]
    setIngredients(updated)
    search(updated, { cuisine, dietary })
  }

  function handleRemove(item) {
    const updated = ingredients.filter((i) => i !== item)
    setIngredients(updated)
    search(updated, { cuisine, dietary })
  }

  function handleCuisineSelect(newCuisine) {
    setCuisine(newCuisine)
    search(ingredients, { cuisine: newCuisine, dietary })
  }

  function handleDietarySelect(newDietary) {
    setDietary(newDietary)
    search(ingredients, { cuisine, dietary: newDietary })
  }

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sortMode === 'gaps') return a.missing.length - b.missing.length
    if (sortMode === 'fastest') return a.totalIngredients - b.totalIngredients
    return b.matchCount - a.matchCount
  })
  const [featured, ...rest] = sortedRecipes

  const conflicts = findDietaryConflicts(ingredients, dietary)
  const conflictMessage = conflicts.length > 0 ? getConflictMessage(dietary, conflicts) : null

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 px-4 pb-20 relative">
    <h1 className="font-serif text-4xl md:text-6xl text-ink tracking-tight mb-2 text-center">
      What's in there?
    </h1>
      <DoodleScribble className="w-40 h-4 text-tomato mb-6" />

      <IngredientInput
        ingredients={ingredients}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />

    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full max-w-2xl">
      <CuisinePicker selected={cuisine} onSelect={handleCuisineSelect} />
      <DietaryFilter selected={dietary} onSelect={handleDietarySelect} />
    </div>
      <p className="font-mono text-xs uppercase tracking-wider text-tomato mt-8">
        {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} within reach
      </p>

      {recipes.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3 px-4">
          {[
            { key: 'match', label: 'Best match' },
            { key: 'gaps', label: 'Fewest gaps' },
            { key: 'fastest', label: 'Fastest' },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortMode(opt.key)}
              className={`font-mono text-xs uppercase tracking-wide px-3 py-1 border-[1.5px] border-ink rounded transition ${
                sortMode === opt.key ? 'bg-ink text-paper' : 'bg-paper text-ink-soft hover:text-ink'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <p className="font-mono text-xs uppercase text-ink-soft mt-4">
          Rummaging…
        </p>
      )}

      {conflictMessage && (
        <p className="font-sans text-sm text-tomato mt-4 text-center max-w-md">
          {conflictMessage}
        </p>
      )}

      {!loading && ingredients.length > 0 && recipes.length === 0 && !error && (
        <p className="font-sans text-ink-soft mt-8 text-center max-w-md">
          Nothing matches all of that. Drop one ingredient and we'll try again.
        </p>
      )}

      {recipes.length > 0 && (
        <div className="w-full max-w-4xl mt-8 flex flex-col gap-6 relative z-10">
          {featured && <RecipeCard recipe={featured} featured onClick={() => handleCardClick(featured.idMeal)} />}

          {rest.length > 0 && (
            <div className="flex flex-col gap-2">
              {rest.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={() => handleCardClick(recipe.idMeal)} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home