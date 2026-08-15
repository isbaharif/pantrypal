import { useState } from 'react'
import IngredientInput from '../components/IngredientInput'
import useRecipes from '../hooks/useRecipes'

function Home() {
  const [ingredients, setIngredients] = useState([])
  const { recipes, loading, error, search } = useRecipes()

  function handleAdd(item) {
    const updated = [...ingredients, item]
    setIngredients(updated)
    search(updated)
  }

  function handleRemove(item) {
    const updated = ingredients.filter((i) => i !== item)
    setIngredients(updated)
    search(updated)
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col items-center pt-20 px-4">
      <h1 className="font-serif text-6xl text-ink tracking-tight mb-8">
        What's in there?
      </h1>

      <IngredientInput
        ingredients={ingredients}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />

      <p className="font-mono text-xs uppercase tracking-wider text-tomato mt-8">
        {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} within reach
      </p>

      {loading && (
        <p className="font-mono text-xs uppercase text-ink-soft mt-4">
          Rummaging…
        </p>
      )}

      {error && (
        <p className="font-mono text-xs uppercase text-tomato mt-4">
          Something went wrong: {error}
        </p>
      )}

      {/* Temporary basic results list — we'll replace with proper cards next */}
      <div className="w-full max-w-2xl mt-8 flex flex-col gap-2">
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="border-[1.5px] border-ink rounded p-3 flex justify-between items-center bg-paper-deep"
          >
            <span className="font-sans text-ink">{recipe.strMeal}</span>
            <span className="font-mono text-xs text-ink-soft">
              {recipe.matchCount}/{recipe.totalIngredients}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home