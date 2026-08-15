const BASE_URL = '/api/mealdb'

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

// Turns TheMealDB's messy strIngredient1..20 fields into a clean array
export function extractIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      })
    }
  }
  return ingredients
}