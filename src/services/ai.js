const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

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
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!res.ok) throw new Error('AI enhancement failed')

  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text

  if (!text) throw new Error('No AI response')

  const cleaned = text.replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned)
}

export async function enhanceCookModeSteps(recipe, steps) {
  const prompt = `You're a witty, warm friend who cooks well. For this recipe, rewrite each step below to be more precise and helpful for someone actively cooking — add realistic timing where relevant (e.g. "about 4-5 minutes"), a quick technique tip if useful, and a touch of dry humor. Keep each rewritten step to 1-2 sentences, don't pad it out.

Also pick ONE icon that best represents each step, from exactly this list: pot, pan, knife, timer, bowl, oven, plate.

Recipe: ${recipe.strMeal}

Steps:
${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Respond ONLY in this exact JSON format, nothing else, no markdown fences:
{"steps": [{"text": "...", "icon": "pot"}, {"text": "...", "icon": "knife"}]}

The steps array must have exactly ${steps.length} items, in the same order as given.`

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!res.ok) throw new Error('Cook mode enhancement failed')

  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('No AI response')

  const cleaned = text.replace(/```json|```/g, '').trim()
  return JSON.parse(cleaned)
}