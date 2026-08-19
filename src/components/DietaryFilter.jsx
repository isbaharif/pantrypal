const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Seafood', 'Dessert', 'Breakfast']

function DietaryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-xs uppercase tracking-wider text-ink-soft">
        Dietary
      </label>
      <select
        value={selected || ''}
        onChange={(e) => onSelect(e.target.value || null)}
        className="px-3 py-2 bg-paper-deep border-[1.5px] border-ink rounded font-mono text-xs uppercase tracking-wide text-ink focus:outline-none focus:ring-2 focus:ring-ink cursor-pointer"
      >
        <option value="">Any</option>
        {DIETARY_OPTIONS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  )
}

export default DietaryFilter