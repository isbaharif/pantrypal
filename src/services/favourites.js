import { supabase } from './supabase'

// Get all saved favourites
export async function getFavourites() {
const { data, error } = await supabase
    .from('favourites')
    .select('*')
    .order('created_at', { ascending: false })

if (error) throw error
return data
}

// Add a recipe to favourites
export async function addFavourite(meal) {
const { data, error } = await supabase
    .from('favourites')
    .insert([
    {
        meal_id: meal.idMeal,
        meal_name: meal.strMeal,
        meal_thumb: meal.strMealThumb,
    },
    ])
    .select()

if (error) throw error
return data
}

// Remove a recipe from favourites
export async function removeFavourite(mealId) {
const { error } = await supabase
    .from('favourites')
    .delete()
    .eq('meal_id', mealId)

if (error) throw error
}