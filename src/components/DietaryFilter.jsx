const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Seafood', 'Dessert', 'Breakfast']

function DietaryFilter({ selected, onSelect }) {
  return (
    <select
      value={selected || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      className="px-2.5 py-1.5 bg-paper border-[1.5px] border-ink rounded font-mono text-[11px] uppercase tracking-wide text-ink focus:outline-none focus:ring-2 focus:ring-ink cursor-pointer"
    >
      <option value="">Dietary: any</option>
      {DIETARY_OPTIONS.map((d) => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
  )
}

export default DietaryFilter