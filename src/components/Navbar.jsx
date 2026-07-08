import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DarkToggle from './DarkToggle.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/ivf', label: 'IVF' },
  { to: '/book', label: 'Book Appointment' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-ink-900/90">
      {/* top strip */}
      <div className="hidden bg-ink-900 text-white dark:bg-black md:block">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <span>🏥 Emergency &amp; Ambulance • Open 24×7</span>
          <div className="flex items-center gap-4">
            <a href="tel:+919393939393" className="font-semibold text-brand-300 hover:text-brand-200">
              🚑 Emergency: +91 93939 39393
            </a>
            <span className="text-slate-500">|</span>
            <a href="tel:+911140404040" className="text-slate-300 hover:text-white">Helpline: +91 11 4040 4040</a>
          </div>
        </div>
      </div>

      <nav className="container-px flex h-16 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 text-lg text-white shadow-soft">
            ✚
          </span>
          <span className="font-display text-xl font-extrabold text-ink-900 dark:text-white">
            ShiKhar<span className="text-brand-600 dark:text-brand-400"> Hospital</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
                    : 'text-ink-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DarkToggle />
          <div className="hidden items-center gap-1.5 lg:flex">
            <Link to="/patient-login" className="btn-ghost !px-3 !py-2 text-sm dark:text-slate-200">Patient Login</Link>
            <Link to="/patient-register" className="btn-outline !px-3 !py-2 text-sm">Register</Link>
            <Link to="/admin-login" className="btn-primary !px-3 !py-2 text-sm">Admin</Link>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink-700 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 xl:hidden"
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-ink-900 xl:hidden">
          <div className="container-px flex flex-col py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-semibold ${
                    isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300' : 'text-ink-700 dark:text-slate-200'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Link to="/patient-login" onClick={() => setOpen(false)} className="btn-ghost !py-2 text-xs dark:text-slate-200">Patient Login</Link>
              <Link to="/patient-register" onClick={() => setOpen(false)} className="btn-outline !py-2 text-xs">Register</Link>
              <Link to="/admin-login" onClick={() => setOpen(false)} className="btn-primary !py-2 text-xs">Admin</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
