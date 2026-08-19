const CUISINES = [
  'Italian', 'Mexican', 'Indian', 'Chinese', 'Thai',
  'Japanese', 'French', 'Greek', 'American', 'Spanish',
  'Moroccan', 'Vietnamese', 'British', 'Turkish',
]

function CuisinePicker({ selected, onSelect }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-mono text-xs uppercase tracking-wider text-ink-soft">
        Cuisine
      </label>
      <select
        value={selected || ''}
        onChange={(e) => onSelect(e.target.value || null)}
        className="px-3 py-2 bg-paper-deep border-[1.5px] border-ink rounded font-mono text-xs uppercase tracking-wide text-ink focus:outline-none focus:ring-2 focus:ring-ink cursor-pointer"
      >
        <option value="">Any</option>
        {CUISINES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}

export default CuisinePicker