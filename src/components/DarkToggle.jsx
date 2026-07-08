import { useEffect, useState } from 'react'

export default function DarkToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle dark mode"
      className="grid h-10 w-10 place-items-center rounded-lg text-lg text-ink-700 hover:bg-slate-100 dark:text-yellow-300 dark:hover:bg-slate-800"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
