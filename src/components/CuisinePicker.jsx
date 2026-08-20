const CUISINES = [
  'Italian', 'Mexican', 'Indian', 'Chinese', 'Thai',
  'Japanese', 'French', 'Greek', 'American', 'Spanish',
  'Moroccan', 'Vietnamese', 'British', 'Turkish',
]

function CuisinePicker({ selected, onSelect }) {
  return (
    <select
      value={selected || ''}
      onChange={(e) => onSelect(e.target.value || null)}
      className="px-2.5 py-1.5 bg-paper border-[1.5px] border-ink rounded font-mono text-[11px] uppercase tracking-wide text-ink focus:outline-none focus:ring-2 focus:ring-ink cursor-pointer"
    >
      <option value="">Cuisine: any</option>
      {CUISINES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}

export default CuisinePicker