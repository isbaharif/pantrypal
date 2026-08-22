import { useState } from 'react'
import { getUserName, setUserName } from '../utils/userName'

function Settings() {
  const [name, setName] = useState(getUserName())
  const [saved, setSaved] = useState(false)

  function handleSave(e) {
    e.preventDefault()
    setUserName(name)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  function handleClearCache() {
    sessionStorage.clear()
    alert('Cleared cached recipe tips for this session.')
  }

  return (
    <div className="min-h-screen px-4 pt-8 pb-12">
      <div className="max-w-xl mx-auto">
        <h1 className="font-serif text-3xl md:text-5xl text-ink tracking-tight mb-8">
          Settings
        </h1>

        <div className="flex flex-col gap-6">
          <div className="border-[1.5px] border-ink rounded bg-paper-deep p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
              What do we call you?
            </p>
            <form onSubmit={handleSave} className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="flex-1 px-4 py-2 bg-paper border-[1.5px] border-ink rounded text-ink placeholder-ink-soft focus:outline-none focus:ring-2 focus:ring-ink"
              />
              <button
                type="submit"
                className="font-mono text-xs uppercase tracking-wide px-4 py-2 border-[1.5px] border-ink rounded bg-tomato text-paper hover:opacity-90 transition"
              >
                {saved ? 'Saved ✓' : 'Save'}
              </button>
            </form>
          </div>

          <div className="border-[1.5px] border-ink rounded bg-paper-deep p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
              Data
            </p>
            <p className="font-sans text-sm text-ink mb-3">
              Clear cached AI-generated tips for recipes you've viewed this session.
            </p>
            <button
              onClick={handleClearCache}
              className="font-mono text-xs uppercase tracking-wide px-4 py-2 border-[1.5px] border-ink rounded bg-paper hover:bg-ink hover:text-paper transition"
            >
              Clear cache
            </button>
          </div>

          <div className="border-[1.5px] border-ink rounded bg-paper-deep p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
              About
            </p>
            <p className="font-sans text-sm text-ink">
              What's Cookin — find recipes with what you've already got. Recipe data
              from TheMealDB. Tips generated with Gemini. Built with React, Vite,
              Tailwind, and Supabase.
            </p>
          </div>

          <div className="border-[1.5px] border-ink rounded bg-paper-deep p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
              A note on accounts
            </p>
            <p className="font-sans text-sm text-ink">
              There's no login yet — favourites and submitted recipes are shared
              across everyone using this app, not private to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings