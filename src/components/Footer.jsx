import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Quick Links',
    items: ['Find a Doctor', 'Book Appointment', 'Lab Reports', 'Health Packages', 'Emergency'],
  },
  {
    title: 'Centers of Excellence',
    items: ['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Gastro Sciences'],
  },
  {
    title: 'Patients & Visitors',
    items: ['OPD Timings', 'Room Categories', 'Home Care', 'Insurance / TPA', 'Patient Reviews'],
  },
]

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink-900 text-slate-300">
      <div className="container-px grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-lg text-white">✚</span>
            <span className="font-display text-xl font-extrabold text-white">
              Shikhar<span className="text-brand-400"> Hospital</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-slate-400">
            A multi-speciality healthcare network delivering compassionate, world-class care with
            experienced specialists and modern technology.
          </p>
          <div className="mt-5 flex gap-3">
            {['📘', '🐦', '📸', '💼', '▶️'].map((s, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 hover:bg-brand-600"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              {c.title}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.items.map((it) => (
                <li key={it}>
                  <Link to="/doctors" className="text-slate-400 transition-colors hover:text-brand-300">
                    {it}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div>
            <div className="font-display text-lg font-bold text-white">Subscribe to health tips</div>
            <div className="text-sm text-slate-400">Get expert advice & offers in your inbox.</div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed! Thank you.') }} className="flex w-full max-w-md gap-2">
            <input required type="email" placeholder="Your email address" className="h-11 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-brand-400" />
            <button className="btn-primary !py-2.5">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Shikhar Hospital. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-300">Privacy Policy</a>
            <a href="#" className="hover:text-brand-300">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
