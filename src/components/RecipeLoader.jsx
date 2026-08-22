import { getRandomRecipeLoadingLine } from '../utils/loadingLines'

function RecipeLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <svg viewBox="0 0 160 140" className="w-40 h-36" fill="none">
        {/* pan */}
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
          <ellipse cx="80" cy="95" rx="45" ry="16" />
          <path d="M35 95 C35 108, 55 118, 80 118 C105 118, 125 108, 125 95" />
          <path d="M125 92 L150 85" />
        </g>

        {/* steam */}
        <g stroke="currentColor" strokeWidth="2" className="text-ink-soft">
          <path className="animate-steam-1" d="M65 80 C65 68, 71 68, 69 56" />
          <path className="animate-steam-2" d="M80 80 C80 68, 86 68, 84 54" />
          <path className="animate-steam-3" d="M95 80 C95 68, 101 68, 99 56" />
        </g>

        {/* sugar cube — drops first */}
        <rect
          x="34" y="0" width="12" height="12" rx="2"
          stroke="currentColor" strokeWidth="2" className="text-tomato animate-drop-1"
        />

        {/* chili — drops second */}
        <g className="animate-drop-2 text-brine" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M78 2 C74 0, 80 -4, 83 0" />
          <path d="M80 3 C92 8, 104 6, 110 16 C113 21, 108 25, 103 22 C93 17, 82 12, 80 3 Z" />
        </g>

        {/* star — drops third */}
        <path
          className="animate-drop-3 text-peel"
          stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
          d="M124 0 L127 7 L134 7 L128 11 L130 18 L124 14 L118 18 L120 11 L114 7 L121 7 Z"
        />
      </svg>

      <p className="font-serif text-2xl text-ink text-center">
        {getRandomRecipeLoadingLine()}
      </p>
    </div>
  )
}

export default RecipeLoader