import { useState } from 'react'
import { searchByIngredient } from '../services/mealdb'

function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(ingredients) {
    if (ingredients.length === 0) {
      setRecipes([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Search for each ingredient separately
      const resultsPerIngredient = await Promise.all(
        ingredients.map((ing) => searchByIngredient(ing))
      )

      // Count how many ingredient-searches each recipe showed up in
      const matchCount = {}
      const mealData = {}

      resultsPerIngredient.forEach((meals) => {
        meals.forEach((meal) => {
          matchCount[meal.idMeal] = (matchCount[meal.idMeal] || 0) + 1
          mealData[meal.idMeal] = meal
        })
      })

      // Build a ranked array: recipe + how many ingredients matched
      const ranked = Object.keys(matchCount)
        .map((id) => ({
          ...mealData[id],
          matchCount: matchCount[id],
          totalIngredients: ingredients.length,
        }))
        .sort((a, b) => b.matchCount - a.matchCount)

      setRecipes(ranked)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { recipes, loading, error, search }
}

export default useRecipes