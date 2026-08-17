// Common ingredient substitutes — keys are lowercase, matched loosely against recipe ingredient names
const SUBSTITUTES = {
  'buttermilk': 'milk + a splash of lemon juice or vinegar',
  'heavy cream': 'milk + melted butter',
  'sour cream': 'plain yogurt',
  'egg': 'mashed banana or a flax egg (1 tbsp ground flax + 3 tbsp water)',
  'eggs': 'mashed banana or a flax egg (1 tbsp ground flax + 3 tbsp water)',
  'butter': 'neutral oil or margarine',
  'brown sugar': 'white sugar + a spoon of molasses',
  'cornstarch': 'flour (use double the amount)',
  'white wine': 'chicken or vegetable stock + a splash of vinegar',
  'red wine': 'beef stock + a splash of vinegar',
  'breadcrumbs': 'crushed crackers or oats',
  'parmesan': 'any hard, salty cheese you have',
  'ricotta': 'cottage cheese, blended smooth',
  'mayonnaise': 'plain yogurt or sour cream',
  'honey': 'maple syrup or sugar dissolved in water',
  'shallot': 'a small amount of onion + a little garlic',
  'fresh herbs': 'dried herbs (use about a third of the amount)',
  'coconut milk': 'regular milk + a little oil, in a pinch',
  'worcestershire sauce': 'soy sauce + a dash of vinegar',
  'tomato paste': 'ketchup or reduced tomato sauce',
  'white vinegar': 'lemon juice',
  'lime juice': 'lemon juice',
  'lemon juice': 'lime juice or a splash of vinegar',
  'yeast': 'baking powder (won\'t rise the same way, but it\'ll work in a pinch)',
  'self-raising flour': 'plain flour + baking powder',
  'cream cheese': 'mascarpone or thick yogurt',
  'dijon mustard': 'yellow mustard + a little vinegar',
  'chicken stock': 'vegetable stock or a bouillon cube in water',
  'beef stock': 'vegetable stock or a bouillon cube in water',
  'vegetable stock': 'water with a splash of soy sauce',
  'panko': 'regular breadcrumbs',
}

export function getSubstitute(ingredientName) {
  const key = ingredientName.trim().toLowerCase()

  // exact match first
  if (SUBSTITUTES[key]) return SUBSTITUTES[key]

  // loose match — e.g. "large eggs" should still match "eggs"
  const found = Object.keys(SUBSTITUTES).find(
    (sub) => key.includes(sub) || sub.includes(key)
  )
  return found ? SUBSTITUTES[found] : null
}