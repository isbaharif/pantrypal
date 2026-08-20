import { Link } from 'react-router-dom'

function Header({ onMenuClick }) {
  return (
    <header className="border-b-[1.5px] border-ink bg-paper">
      <div className="max-w-5xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="font-mono text-ink text-xl leading-none"
            aria-label="Open menu"
          >
            ☰
          </button>
          <Link to="/" className="font-serif text-xl md:text-2xl text-ink tracking-tight">
            What's Cookin
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header