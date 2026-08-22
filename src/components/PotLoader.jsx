import { useEffect, useState } from 'react'

function PotLoader({ name, onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 300) // let fade-out finish before unmounting
    }, 1800)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 bg-paper z-[70] flex flex-col items-center justify-center transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <svg viewBox="0 0 70 105" className="w-20 h-28 text-ink" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 30 L8 65 C8 75, 18 82, 35 82 C52 82, 62 75, 62 65 L62 30" />
        <path d="M4 30 L66 30" />
        <circle cx="35" cy="18" r="4" />
        <path d="M20 18 L50 18" />
        <path d="M8 40 L0 40 M62 40 L70 40" />

        <path className="animate-steam-1 text-ink-soft" stroke="currentColor" strokeWidth="2" d="M22 25 C22 15, 28 15, 26 5" />
        <path className="animate-steam-2 text-ink-soft" stroke="currentColor" strokeWidth="2" d="M35 25 C35 15, 41 15, 39 3" />
        <path className="animate-steam-3 text-ink-soft" stroke="currentColor" strokeWidth="2" d="M48 25 C48 15, 54 15, 52 5" />
      </svg>

      <p className="font-serif text-2xl text-ink mt-4">
        {name ? `Cooking something up for you, ${name}…` : 'Cooking something up…'}
      </p>
    </div>
  )
}

export default PotLoader