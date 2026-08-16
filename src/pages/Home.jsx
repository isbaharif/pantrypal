import { useState } from 'react'
import IngredientInput from '../components/IngredientInput'
import RecipeCard from '../components/RecipeCard'
import useRecipes from '../hooks/useRecipes'
import { useNavigate } from 'react-router-dom'
import { DoodleScribble } from '../components/Doodles'

function Home() {
  const [ingredients, setIngredients] = useState([])
  const { recipes, loading, error, search } = useRecipes()
  const navigate = useNavigate()

  function handleCardClick(id) {
    navigate(`/recipe/${id}`, { state: { ingredients } })
  }

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

  const [featured, ...rest] = recipes

  return (
    <div className="min-h-screen flex flex-col items-center pt-12 px-4 pb-20 relative">
      <h1 className="font-serif text-6xl text-ink tracking-tight mb-2">
        What's in there?
      </h1>
      <DoodleScribble className="w-40 h-4 text-tomato mb-6" />

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
        <p className="font-mono text-xs uppercase text-tomato mt-4 text-center max-w-md">
          {error}
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