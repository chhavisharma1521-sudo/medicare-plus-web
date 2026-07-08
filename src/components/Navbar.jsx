import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Find a Doctor' },
  { to: '/specialties', label: 'Specialities' },
  { to: '/packages', label: 'Health Packages' },
  { to: '/ivf', label: 'IVF' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      {/* top strip */}
      <div className="hidden bg-ink-900 text-white md:block">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <span>🏥 24×7 Emergency &amp; Ambulance Helpline</span>
          <a href="tel:+919000000000" className="font-semibold text-brand-300 hover:text-brand-200">
            📞 +91 90000 00000
          </a>
        </div>
      </div>

      <nav className="container-px flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-lg text-white shadow-soft">
            ✚
          </span>
          <span className="font-display text-xl font-extrabold text-ink-900">
            MediCare<span className="text-brand-600"> Plus</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-slate-100'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/doctors" className="btn-primary hidden sm:inline-flex !py-2.5">
            Book Appointment
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg text-ink-700 hover:bg-slate-100 lg:hidden"
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="container-px flex flex-col py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-semibold ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/doctors" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
