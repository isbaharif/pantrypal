const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// Search recipes by a single ingredient
export async function searchByIngredient(ingredient) {
  const res = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`)
  if (!res.ok) throw new Error('Failed to fetch recipes')
  const data = await res.json()
  return data.meals || [] // TheMealDB returns null if nothing matches
}

// Get full recipe details by ID (instructions, full ingredient list, video, etc.)
export async function getRecipeById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`)
  if (!res.ok) throw new Error('Failed to fetch recipe details')
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

// Get a random recipe (fun "Surprise Me" feature)
export async function getRandomRecipe() {
  const res = await fetch(`${BASE_URL}/random.php`)
  if (!res.ok) throw new Error('Failed to fetch random recipe')
  const data = await res.json()
  return data.meals ? data.meals[0] : null
}

// Get all categories (for filters later)
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/list.php?c=list`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  const data = await res.json()
  return data.meals || []
}