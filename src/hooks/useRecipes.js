import { useState } from 'react'
import { searchByIngredient, searchByArea, searchByCategory, getRecipeById, extractIngredients } from '../services/mealdb'

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
      if (i === attempts - 1) return null
      await wait(400)
    }
  }
}

async function fetchFullDetails(ids) {
  const fullRecipes = []
  for (const id of ids) {
    const recipe = await fetchWithRetry(id)
    if (recipe) fullRecipes.push(recipe)
    await wait(150)
  }
  return fullRecipes
}

function buildRecipe(meal, userSet, matchCount) {
  const fullIngredients = extractIngredients(meal)
  const missing = userSet
    ? fullIngredients.filter((ing) => !userSet.has(ing.name.toLowerCase())).map((ing) => ing.name)
    : fullIngredients.map((ing) => ing.name)

  return {
    ...meal,
    matchCount: matchCount ?? 0,
    totalIngredients: fullIngredients.length,
    missing,
    timeEstimate: estimateTime(fullIngredients.length),
  }
}

function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function search(userIngredients, filters = {}) {
    const { cuisine = null, dietary = null } = filters

    if (userIngredients.length === 0) {
      if (cuisine || dietary) {
        await browse(cuisine, dietary)
      } else {
        setRecipes([])
      }
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
        .slice(0, 15)

      const fullRecipes = await fetchFullDetails(ids)
      const userSet = new Set(userIngredients.map((i) => i.toLowerCase()))

      let ranked = fullRecipes.map((meal) => buildRecipe(meal, userSet, matchCount[meal.idMeal]))

      if (cuisine) {
        ranked = ranked.filter((r) => r.strArea?.toLowerCase() === cuisine.toLowerCase())
      }
      if (dietary) {
        ranked = ranked.filter((r) => r.strCategory?.toLowerCase() === dietary.toLowerCase())
      }

      ranked.sort((a, b) => b.matchCount - a.matchCount)
      setRecipes(ranked)

      if (ranked.length === 0 && ids.length > 0) {
        setError('Nothing matches all of that. Try dropping a filter or an ingredient.')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function browse(cuisine, dietary) {
    setLoading(true)
    setError(null)

    try {
      let meals
      if (dietary) {
        meals = await searchByCategory(dietary)
        if (cuisine) {
          // fetch full details to filter by area, since filter.php only supports one param at a time
          const full = await fetchFullDetails(meals.slice(0, 20).map((m) => m.idMeal))
          const filtered = full.filter((m) => m.strArea?.toLowerCase() === cuisine.toLowerCase())
          setRecipes(filtered.map((m) => buildRecipe(m, null, 0)))
          return
        }
      } else {
        meals = await searchByArea(cuisine)
      }

      const ids = meals.slice(0, 15).map((m) => m.idMeal)
      const fullRecipes = await fetchFullDetails(ids)
      setRecipes(fullRecipes.map((m) => buildRecipe(m, null, 0)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { recipes, loading, error, search }
}

export default useRecipes