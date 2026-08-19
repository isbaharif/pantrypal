const MEAT_INGREDIENTS = [
  'chicken', 'beef', 'pork', 'lamb', 'bacon', 'sausage', 'turkey',
  'ham', 'duck', 'veal', 'mince', 'steak', 'ribs',
]

const FISH_INGREDIENTS = [
  'fish', 'salmon', 'tuna', 'shrimp', 'prawn', 'crab', 'lobster',
  'anchovy', 'cod', 'squid', 'octopus', 'mussel', 'oyster',
]

const ANIMAL_PRODUCTS = ['egg', 'eggs', 'milk', 'cheese', 'butter', 'cream', 'yogurt', 'honey']

export function findDietaryConflicts(ingredients, dietary) {
  if (!dietary) return []

  const lower = ingredients.map((i) => i.toLowerCase())

  if (dietary === 'Vegetarian') {
    return lower.filter(
      (i) => MEAT_INGREDIENTS.includes(i) || FISH_INGREDIENTS.includes(i)
    )
  }

  if (dietary === 'Vegan') {
    return lower.filter(
      (i) =>
        MEAT_INGREDIENTS.includes(i) ||
        FISH_INGREDIENTS.includes(i) ||
        ANIMAL_PRODUCTS.includes(i)
    )
  }

  if (dietary === 'Seafood') {
    // no real contradiction to flag here, seafood is additive not restrictive
    return []
  }

  return []
}

const WITTY_RESPONSES = {
  Vegetarian: (items) =>
    `${items.join(', ')} ${items.length > 1 ? 'are' : 'is'} not really vegetarian moves. Drop ${items.length > 1 ? 'them' : 'it'}, or drop the filter — your call.`,
  Vegan: (items) =>
    `${items.join(', ')} snuck in from the animal kingdom. Vegan and ${items.join(', ')} don't share a plate.`,
}

export function getConflictMessage(dietary, conflicts) {
  const generator = WITTY_RESPONSES[dietary]
  if (!generator) return null
  return generator(conflicts)
}