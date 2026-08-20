import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Pantry' },
  { to: '/my-recipes', label: 'Your recipes' },
  { to: '/saved', label: 'Filed away' },
  { to: '/settings', label: 'Settings' },
]

function Sidebar({ open, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-ink/30 z-40"
        />
      )}

      {/* Panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-paper border-r-[1.5px] border-ink z-50 transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b-[1.5px] border-ink">
          <span className="font-serif text-xl text-ink">What's Cookin</span>
          <button
            onClick={onClose}
            className="font-mono text-ink-soft hover:text-tomato text-lg"
          >
            ×
          </button>
        </div>

        <nav className="p-5 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`font-mono text-xs uppercase tracking-wide px-3 py-2.5 rounded transition ${
                location.pathname === item.to
                  ? 'bg-ink text-paper'
                  : 'text-ink-soft hover:bg-paper-deep hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar