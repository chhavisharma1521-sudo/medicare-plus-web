import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import { specialties } from '../data/specialties.js'

export default function Specialties() {
  return (
    <div className="container-px py-12">
      <SectionHeading eyebrow="Departments" title="Our Specialities" subtitle="Explore our full range of medical departments and centers of excellence." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((s) => (
          <Link
            key={s.id}
            to="/doctors"
            className="group flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl transition group-hover:bg-brand-100">
              {s.icon}
            </span>
            <div>
              <h3 className="font-bold text-ink-900">{s.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              <span className="mt-2 inline-block text-sm font-semibold text-brand-600">View Doctors →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
