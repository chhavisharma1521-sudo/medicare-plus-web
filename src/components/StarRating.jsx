export default function StarRating({ rating, reviews, size = 'sm' }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.5
  const textSize = size === 'lg' ? 'text-base' : 'text-sm'
  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex ${textSize} leading-none text-accent-500`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < full ? '★' : i === full && half ? '★' : '☆'}</span>
        ))}
      </div>
      <span className="text-sm font-semibold text-ink-900">{rating.toFixed(1)}</span>
      {reviews != null && <span className="text-xs text-slate-400">({reviews})</span>}
    </div>
  )
}
