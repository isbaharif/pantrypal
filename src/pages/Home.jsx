import { useState } from 'react'
import IngredientInput from '../components/IngredientInput'

function Home() {
  const [ingredients, setIngredients] = useState([])

  function handleAdd(item) {
    setIngredients((prev) => [...prev, item])
  }

  function handleRemove(item) {
    setIngredients((prev) => prev.filter((i) => i !== item))
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
        {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''} in the pantry
      </p>
    </div>
  )
}

export default Home