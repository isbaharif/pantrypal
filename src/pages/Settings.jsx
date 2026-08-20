function Settings() {
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