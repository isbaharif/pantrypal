import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="border-b-[1.5px] border-ink bg-paper">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl text-ink tracking-tight">
          What's Cookin
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/my-recipes"
            className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-tomato transition"
          >
            Your recipes
          </Link>
          <Link
            to="/saved"
            className="font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-tomato transition"
          >
            Filed away
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header