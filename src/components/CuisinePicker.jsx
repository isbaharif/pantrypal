const CUISINES = [
  'Italian', 'Mexican', 'Indian', 'Chinese', 'Thai',
  'Japanese', 'French', 'Greek', 'American', 'Spanish',
  'Moroccan', 'Vietnamese', 'British', 'Turkish',
]

function CuisinePicker({ selected, onSelect }) {
  return (
    <div className="w-full max-w-2xl mt-6">
      <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-2">
        Or browse by cuisine
      </p>
      <div className="flex flex-wrap gap-2">
        {CUISINES.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => onSelect(selected === cuisine ? null : cuisine)}
            className={`px-3 py-1.5 border-[1.5px] border-ink rounded font-mono text-xs uppercase tracking-wide transition ${
              selected === cuisine
                ? 'bg-tomato text-paper'
                : 'bg-paper text-ink hover:bg-ink hover:text-paper'
            }`}
          >
            {cuisine}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CuisinePicker