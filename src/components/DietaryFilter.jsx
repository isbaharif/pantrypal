const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Seafood', 'Dessert', 'Breakfast']

function DietaryFilter({ selected, onSelect }) {
  return (
    <div className="w-full max-w-2xl mt-4">
      <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
        Dietary
      </p>
      <div className="flex flex-wrap gap-2">
        {DIETARY_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(selected === option ? null : option)}
            className={`px-3 py-1.5 border-[1.5px] border-ink rounded font-mono text-xs uppercase tracking-wide transition ${
              selected === option
                ? 'bg-brine text-paper'
                : 'bg-paper text-ink hover:bg-ink hover:text-paper'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DietaryFilter