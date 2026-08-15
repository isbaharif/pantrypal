import { useState } from 'react'
import { searchByIngredient, getRecipeById, extractIngredients } from '../services/mealdb'

function estimateTime(ingredientCount) {
  if (ingredientCount <= 5) return 'QUICK ~20 MIN'
  if (ingredientCount <= 9) return 'MEDIUM ~40 MIN'
  return 'INVOLVED ~60+ MIN'
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchWithRetry(id, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await getRecipeById(id)
    } catch (err) {
      if (i === attempts - 1) return null // give up after final attempt
      await wait(400) // brief pause before retrying
    }
  }
}

function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(userIngredients) {
    if (userIngredients.length === 0) {
      setRecipes([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const resultsPerIngredient = await Promise.all(
        userIngredients.map((ing) => searchByIngredient(ing))
      )

      const matchCount = {}
      resultsPerIngredient.forEach((meals) => {
        meals.forEach((meal) => {
          matchCount[meal.idMeal] = (matchCount[meal.idMeal] || 0) + 1
        })
      })

      const ids = Object.keys(matchCount)
        .sort((a, b) => matchCount[b] - matchCount[a])
        .slice(0, 12)

      const fullRecipes = []
      for (const id of ids) {
        const recipe = await fetchWithRetry(id)
        if (recipe) fullRecipes.push(recipe)
        await wait(150) // small gap between requests, easier on their server
      }

      const userSet = new Set(userIngredients.map((i) => i.toLowerCase()))

      const ranked = fullRecipes
        .map((meal) => {
          const fullIngredients = extractIngredients(meal)
          const missing = fullIngredients
            .filter((ing) => !userSet.has(ing.name.toLowerCase()))
            .map((ing) => ing.name)

          return {
            ...meal,
            matchCount: matchCount[meal.idMeal],
            totalIngredients: fullIngredients.length,
            missing,
            timeEstimate: estimateTime(fullIngredients.length),
          }
        })
        .sort((a, b) => b.matchCount - a.matchCount)

      setRecipes(ranked)

      if (ranked.length === 0 && ids.length > 0) {
        setError('Recipe details are being flaky right now — try again in a moment.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { recipes, loading, error, search }
}

export default useRecipes