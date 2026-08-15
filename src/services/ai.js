const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

export async function enhanceRecipe(recipe) {
  const prompt = `You're a witty, warm friend who cooks well and never lectures about macros. For this recipe, write:
1. A short, punchy intro blurb (1-2 sentences, dry humor, no exclamation marks, no "Discover" or "Get started" style language)
2. Two or three brief practical tips for making it well

Recipe: ${recipe.strMeal}
Category: ${recipe.strCategory || 'unknown'}
Cuisine: ${recipe.strArea || 'unknown'}

Respond ONLY in this exact JSON format, nothing else, no markdown code fences:
{"blurb": "...", "tips": ["...", "...", "..."]}`

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!res.ok) throw new Error('AI enhancement failed')

  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) throw new Error('No AI response')

  // Strip potential markdown fences just in case, then parse
  const cleaned = text.replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned)
}