import { useState } from 'react'

const USUAL_SUSPECTS = [
  'eggs', 'onion', 'garlic', 'rice', 'chicken', 'tomato',
  'butter', 'cheese', 'potato', 'milk', 'flour', 'lemon',
]

function IngredientInput({ ingredients, onAdd, onRemove }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const clean = value.trim().toLowerCase()
    if (!clean || ingredients.includes(clean)) return
    onAdd(clean)
    setValue('')
  }

  function handleSuspectClick(item) {
    if (ingredients.includes(item)) return
    onAdd(item)
  }

  return (
    <div className="w-full max-w-2xl px-2 sm:px-0">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type an ingredient, hit enter…"
          className="w-full px-4 py-3 bg-paper-deep border-[1.5px] border-ink rounded text-ink placeholder-ink-soft font-sans text-lg focus:outline-none focus:ring-2 focus:ring-ink"
        />
      </form>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {ingredients.map((item) => (
            <button
              key={item}
              onClick={() => onRemove(item)}
              className="flex items-center gap-2 px-3 py-1.5 bg-tomato text-paper border-[1.5px] border-ink rounded font-mono text-xs uppercase tracking-wide animate-chip-in hover:scale-105 active:scale-95 transition-transform"
              style={{ boxShadow: '3px 3px 0 var(--color-ink)' }}
            >
              {item}
              <span className="text-paper/80">×</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
          Usual suspects
        </p>
        <div className="flex flex-wrap gap-2">
          {USUAL_SUSPECTS.map((item) => (
            <button
              key={item}
              onClick={() => handleSuspectClick(item)}
              disabled={ingredients.includes(item)}
              className="px-3 py-1.5 border-[1.5px] border-ink rounded font-mono text-xs uppercase tracking-wide text-ink bg-paper hover:bg-ink hover:text-paper transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IngredientInput