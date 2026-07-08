import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 → target when it scrolls into view.
export default function CountUp({ value, suffix = '', duration = 1400, className = '' }) {
  const [display, setDisplay] = useState('0')
  const ref = useRef(null)
  const done = useRef(false)

  // parse numeric part + keep any prefix/suffix inside `value` like "1M+" or "40+"
  const num = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0
  const tail = String(value).replace(/[0-9.,]/g, '') // e.g. "M+", "+", "★"

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const cur = num * eased
          setDisplay(Number.isInteger(num) ? Math.round(cur).toLocaleString() : cur.toFixed(1))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [num, duration])

  return (
    <span ref={ref} className={className}>
      {display}{tail}{suffix}
    </span>
  )
}
