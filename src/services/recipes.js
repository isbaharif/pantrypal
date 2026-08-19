import { supabase } from './supabase'

export async function getUserRecipes() {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getUserRecipeById(id) {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createRecipe(recipe) {
  const { data, error } = await supabase
    .from('recipes')
    .insert([
      {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        image_url: recipe.imageUrl || null,
      },
    ])
    .select()

  if (error) throw error
  return data[0]
}