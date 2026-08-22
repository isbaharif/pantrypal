import { useState } from 'react'
import { setUserName } from '../utils/userName'
import { DoodlePot } from './Doodles'

function WelcomeModal({ onComplete }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setUserName(name)
    onComplete(name.trim())
  }

  function handleSkip() {
    onComplete('')
  }

  return (
    <div className="fixed inset-0 bg-ink/40 z-[60] flex items-center justify-center px-4">
      <div
        className="bg-paper border-[1.5px] border-ink rounded max-w-sm w-full p-6"
        style={{ boxShadow: '5px 5px 0 var(--color-ink)' }}
      >
        <DoodlePot className="w-14 h-20 text-tomato mx-auto mb-4" />

        <h2 className="font-serif text-3xl text-ink text-center mb-2">
          Hi there.
        </h2>
        <p className="font-sans text-sm text-ink-soft text-center mb-6">
          What should we call you?
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoFocus
            className="w-full px-4 py-3 bg-paper-deep border-[1.5px] border-ink rounded text-ink placeholder-ink-soft text-center focus:outline-none focus:ring-2 focus:ring-ink"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="px-4 py-2.5 bg-tomato text-paper font-mono text-xs uppercase tracking-wide rounded border-[1.5px] border-ink disabled:opacity-40"
            style={{ boxShadow: '3px 3px 0 var(--color-ink)' }}
          >
            That's me
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="font-mono text-xs uppercase text-ink-soft hover:text-tomato"
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  )
}

export default WelcomeModal