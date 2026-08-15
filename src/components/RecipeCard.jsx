function RecipeCard({ recipe, featured = false, onClick }) {
  const matchRatio = recipe.matchCount / recipe.totalIngredients
  const missingPreview = recipe.missing.slice(0, 3)
  const extraMissing = recipe.missing.length - missingPreview.length

  if (featured) {
    return (
      <button
        onClick={onClick}
        className="text-left border-[1.5px] border-ink rounded bg-paper-deep overflow-hidden flex flex-col md:flex-row"
        style={{ boxShadow: '4px 4px 0 var(--color-ink)' }}
      >
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full md:w-1/2 h-56 md:h-auto object-cover border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-ink"
        />
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h2 className="font-serif text-3xl text-ink leading-tight">
            {recipe.strMeal}
          </h2>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-ink-soft uppercase tracking-wide">
              {recipe.matchCount}/{recipe.totalIngredients}
            </span>
            <div className="flex-1 h-1 bg-ink/15 rounded-full overflow-hidden max-w-[120px]">
              <div
                className="h-full bg-brine"
                style={{ width: `${matchRatio * 100}%` }}
              />
            </div>
          </div>

          <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
            {recipe.timeEstimate} (est.)
          </p>

          {missingPreview.length > 0 && (
            <p className="font-sans text-sm text-peel">
              missing: {missingPreview.join(', ')}
              {extraMissing > 0 && ` +${extraMissing} more`}
            </p>
          )}
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      className="text-left border-[1.5px] border-ink rounded bg-paper-deep p-4 flex items-center gap-4"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-16 h-16 object-cover rounded border-[1.5px] border-ink flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-sans font-medium text-ink truncate">
          {recipe.strMeal}
        </h3>
        {missingPreview.length > 0 && (
          <p className="font-sans text-xs text-peel truncate">
            missing: {missingPreview.join(', ')}
            {extraMissing > 0 && ` +${extraMissing}`}
          </p>
        )}
      </div>
      <span className="font-mono text-xs text-ink-soft uppercase whitespace-nowrap">
        {recipe.matchCount}/{recipe.totalIngredients}
      </span>
    </button>
  )
}

export default RecipeCard