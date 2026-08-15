import { useEffect } from 'react'
import { searchByIngredient } from './services/mealdb'

function App() {
  useEffect(() => {
    searchByIngredient('chicken').then((meals) => {
      console.log('Recipes found:', meals)
    })
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-emerald-400">
        Check your console 👀
      </h1>
    </div>
  )
}

export default App