const RUMMAGING_LINES = [
  'Digging through the back of the fridge…',
  'Ooh, good choices. One sec…',
  'Now THIS is going to be interesting…',
  'Give us a moment, we\'re impressed already…',
  'Sniffing out something delicious…',
  'Your fridge, your rules. Let\'s see…',
  'This combo has potential. Hang tight…',
  'Plotting something worth the mess…',
  'One does not simply rush good food…',
  'Consulting the pantry gods…',
  'Bold choices. We respect that…',
  'Manifesting a five-star meal…',
  'Negotiating with the ingredients…',
  'Reading the fridge its rights…',
  'This is giving main character energy…',
]

const COOKING_LINES = [
  'Cooking up something special',
  'Whisking up a little magic',
  'Turning the stove on, just for you',
  'Warming things up nicely',
  'Something delicious is brewing',
  'Preheating the good vibes',
  'Stirring up something worth it',
  'Setting the table, figuratively',
  'Getting the good pan out',
  'Channeling your inner chef',
]

const RECIPE_LOADING_LINES = [
  'Sugar, spice, and everything nice…',
  'Adding a pinch of chaos…',
  'This one\'s a certified banger…',
  'Tossing it all in the pan…',
  'Great pick. We\'re a little jealous…',
  'Simmering up the details…',
  'This recipe has main character energy…',
  'Someone\'s eating well tonight…',
  'Assembling deliciousness…',
]

export function getRandomRummagingLine() {
  return RUMMAGING_LINES[Math.floor(Math.random() * RUMMAGING_LINES.length)]
}

export function getRandomCookingLine(name) {
  const line = COOKING_LINES[Math.floor(Math.random() * COOKING_LINES.length)]
  return name ? `${line}, ${name}…` : `${line}…`
}

export function getRandomRecipeLoadingLine() {
  return RECIPE_LOADING_LINES[Math.floor(Math.random() * RECIPE_LOADING_LINES.length)]
}