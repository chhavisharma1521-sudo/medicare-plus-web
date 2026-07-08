import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

const stats = [
  { num: '40+', label: 'Years of Care' },
  { num: '500+', label: 'Expert Doctors' },
  { num: '1M+', label: 'Patients Treated' },
  { num: '50+', label: 'Specialities' },
]

const values = [
  { icon: '❤️', t: 'Patient-First Care', d: 'Every decision is centered around your comfort and wellbeing.' },
  { icon: '🔬', t: 'Advanced Technology', d: 'World-class diagnostic and surgical equipment.' },
  { icon: '👩‍⚕️', t: 'Expert Specialists', d: 'Highly experienced doctors across every field.' },
  { icon: '🕐', t: '24×7 Availability', d: 'Round-the-clock emergency and critical care.' },
]

export default function About() {
  return (
    <div className="dark:text-slate-100">
      <section className="bg-gradient-to-br from-ink-900 to-brand-700 py-16 text-white">
        <div className="container-px">
          <span className="chip bg-white/10 text-brand-100">About Us</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold">Compassionate Care, Trusted by Millions</h1>
          <p className="mt-3 max-w-xl text-white/80">
            ShiKhar Hospital is a multi-speciality healthcare network committed to delivering
            world-class, affordable and ethical medical care.
          </p>
        </div>
      </section>

      <section className="container-px -mt-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-card dark:border-slate-800 dark:bg-ink-800">
              <div className="text-3xl font-extrabold text-brand-700 dark:text-brand-300">{s.num}</div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading center={false} eyebrow="Our Mission" title="Healthcare that puts you first" subtitle="" />
            <p className="text-slate-600 dark:text-slate-300">
              For over four decades, ShiKhar Hospital has been at the forefront of medical excellence.
              We combine cutting-edge technology with a deeply human approach — ensuring every patient
              receives personalised, dignified and effective care.
            </p>
            <p className="mt-4 text-slate-600 dark:text-slate-300">
              From routine check-ups to complex surgeries and advanced fertility care, our
              multi-disciplinary teams work together to give you the best possible outcomes.
            </p>
            <Link to="/doctors" className="btn-primary mt-6">Meet Our Doctors</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.t} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-ink-800">
                <div className="text-3xl">{v.icon}</div>
                <h3 className="mt-3 font-bold text-ink-900 dark:text-white">{v.t}</h3>
                <p className="mt-1 text-sm text-slate-500">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
