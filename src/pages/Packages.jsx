import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

const packages = [
  { name: 'Full Body Health Checkup', price: 2499, old: 3999, tests: 62, icon: '🩺', tag: 'Most Popular' },
  { name: 'Cardiac Care Package', price: 3299, old: 4999, tests: 45, icon: '🫀' },
  { name: 'Diabetic Screening', price: 1499, old: 2299, tests: 28, icon: '💉' },
  { name: 'Women’s Wellness', price: 2799, old: 4200, tests: 40, icon: '🌸' },
  { name: 'Cancer Screening', price: 4599, old: 6500, tests: 35, icon: '🎗️' },
  { name: 'Senior Citizen Care', price: 3499, old: 5200, tests: 55, icon: '👵' },
]

export default function Packages() {
  return (
    <div className="container-px py-12">
      <SectionHeading eyebrow="Preventive Care" title="Health Check-up Packages" subtitle="Affordable, comprehensive packages designed for early detection and peace of mind." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <div key={p.name} className="relative flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
            {p.tag && (
              <span className="absolute right-5 top-5 chip bg-accent-500 text-white">{p.tag}</span>
            )}
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl">{p.icon}</div>
            <h3 className="mt-4 text-lg font-bold text-ink-900">{p.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{p.tests} tests included</p>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-2xl font-extrabold text-brand-700">₹{p.price}</span>
              <span className="mb-1 text-sm text-slate-400 line-through">₹{p.old}</span>
            </div>
            <Link to="/contact" className="btn-primary mt-5">Book Package</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
