import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import { doctors } from '../data/doctors.js'
import { specialties } from '../data/specialties.js'

const quickActions = [
  { icon: '📅', title: 'Book Appointment', desc: 'OPD & consultations', to: '/book' },
  { icon: '💬', title: 'Get an Opinion', desc: 'Second opinion online', to: '/contact' },
  { icon: '🧾', title: 'Lab Reports', desc: 'Access your reports', to: '/contact' },
  { icon: '📦', title: 'Health Packages', desc: 'Preventive check-ups', to: '/packages' },
]

const stats = [
  { num: '40+', label: 'Years of Care' },
  { num: '12+', label: 'Specialities' },
  { num: '500+', label: 'Expert Doctors' },
  { num: '1M+', label: 'Happy Patients' },
]

const homeCare = [
  { icon: '🧪', label: 'Lab Tests at Home' },
  { icon: '🩻', label: 'X-Ray at Home' },
  { icon: '🚑', label: 'Ambulance' },
  { icon: '🧑‍⚕️', label: 'Nursing Care' },
  { icon: '💊', label: 'Pharmacy Delivery' },
  { icon: '🧘', label: 'Physiotherapy' },
]

export default function Home() {
  const featured = doctors.slice(0, 3)

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-brand-800 to-brand-600 text-white">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="container-px relative grid gap-10 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="chip bg-white/10 text-brand-100">🏆 NABH Accredited Multi-Speciality</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Quality Healthcare,<br />Right at Your Fingertips
            </h1>
            <p className="mt-4 max-w-md text-lg text-brand-50/90">
              Book appointments with top specialists, consult online, and manage your health — all in
              one modern platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="btn-accent !px-6 !py-3.5">📅 Book My Appointment</Link>
              <Link to="/doctors" className="btn !border-2 !border-white/30 !py-3.5 text-white hover:!bg-white/10">
                Find a Doctor
              </Link>
            </div>
            <a href="tel:+919393939393" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              🚑 24×7 Emergency Helpline: +91 93939 39393
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                <div className="text-3xl font-extrabold text-white">{s.num}</div>
                <div className="mt-1 text-sm text-brand-50/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="container-px -mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((a) => (
            <Link
              key={a.title}
              to={a.to}
              className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-2xl transition group-hover:scale-110">
                {a.icon}
              </span>
              <div>
                <div className="font-bold text-ink-900">{a.title}</div>
                <div className="text-xs text-slate-500">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SPECIALITIES ── */}
      <section className="container-px py-16">
        <SectionHeading
          eyebrow="Centers of Excellence"
          title="Our Specialities"
          subtitle="Comprehensive care across every major medical discipline."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.slice(0, 8).map((s) => (
            <Link
              key={s.id}
              to="/doctors"
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl transition group-hover:bg-brand-100">
                {s.icon}
              </div>
              <div className="mt-3 font-bold text-ink-900">{s.name}</div>
              <div className="mt-1 text-xs leading-relaxed text-slate-500">{s.desc}</div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/specialties" className="btn-outline">View All Specialities</Link>
        </div>
      </section>

      {/* ── FEATURED DOCTORS ── */}
      <section className="bg-white py-16">
        <div className="container-px">
          <SectionHeading eyebrow="Meet Our Doctors" title="Top-Rated Specialists" subtitle="Experienced, compassionate and highly rated by patients." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d, i) => (
              <DoctorCard key={d.id} doctor={d} index={i} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/doctors" className="btn-primary">View All Doctors</Link>
          </div>
        </div>
      </section>

      {/* ── HOME CARE ── */}
      <section className="container-px py-16">
        <SectionHeading eyebrow="At-Home Services" title="Home Care, When You Need It" subtitle="Quality healthcare delivered to your doorstep." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {homeCare.map((h) => (
            <div key={h.label} className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className="text-3xl">{h.icon}</div>
              <div className="mt-2 text-sm font-semibold text-ink-900">{h.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container-px pb-4">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 to-brand-500 px-8 py-12 text-center text-white sm:px-16">
          <h2 className="text-3xl font-extrabold">Need help choosing a doctor?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50">
            Our care team is available 24×7 to guide you to the right specialist.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/doctors" className="btn-accent !px-6">Book Now</Link>
            <a href="tel:+919000000000" className="btn !border-2 !border-white/40 text-white hover:!bg-white/10">📞 Call Helpline</a>
          </div>
        </div>
      </section>
    </div>
  )
}
