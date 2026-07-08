import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

const treatments = [
  { icon: '🧬', name: 'IVF (In-Vitro Fertilization)', desc: 'Advanced lab fertilization for couples facing infertility.' },
  { icon: '🔬', name: 'ICSI', desc: 'Intracytoplasmic sperm injection for male-factor infertility.' },
  { icon: '💉', name: 'IUI', desc: 'Intrauterine insemination — a simpler first-line treatment.' },
  { icon: '❄️', name: 'Egg & Embryo Freezing', desc: 'Preserve fertility for the future with vitrification.' },
  { icon: '🤝', name: 'Surrogacy Support', desc: 'End-to-end guidance and legal support for surrogacy.' },
  { icon: '📋', name: 'Fertility Assessment', desc: 'Complete diagnostic workup for both partners.' },
]

const steps = [
  { n: 1, t: 'Consultation', d: 'Meet our fertility specialist and discuss your history.' },
  { n: 2, t: 'Assessment', d: 'Hormonal tests, ultrasound and semen analysis.' },
  { n: 3, t: 'Treatment Plan', d: 'A personalised protocol designed for you.' },
  { n: 4, t: 'Procedure & Care', d: 'IVF/ICSI cycle with continuous monitoring.' },
  { n: 5, t: 'Pregnancy Test', d: 'Confirmation and early-pregnancy support.' },
]

const stats = [
  { num: '70%', label: 'Success Rate' },
  { num: '10,000+', label: 'Babies Delivered' },
  { num: '25+', label: 'Fertility Experts' },
  { num: '15+', label: 'Years of Excellence' },
]

export default function IVF() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-brand-400 text-white">
        <div className="absolute -left-20 -bottom-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="container-px relative grid gap-8 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="chip bg-white/10 text-brand-50">👶 Fertility &amp; IVF Center</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Your Journey to Parenthood Starts Here
            </h1>
            <p className="mt-4 max-w-md text-lg text-brand-50/90">
              World-class fertility care with advanced technology, personalised treatment and a
              compassionate team by your side.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-accent !px-6 !py-3.5">Book Free Consultation</Link>
              <a href="tel:+919000000000" className="btn !border-2 !border-white/30 !py-3.5 text-white hover:!bg-white/10">
                📞 Talk to an Expert
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur">
                <div className="text-3xl font-extrabold">{s.num}</div>
                <div className="mt-1 text-sm text-brand-50/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="container-px py-16">
        <SectionHeading eyebrow="Our Treatments" title="Fertility Services We Offer" subtitle="Comprehensive, evidence-based fertility treatments tailored to you." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => (
            <div key={t.name} className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl transition group-hover:bg-brand-100">
                {t.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink-900">{t.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16">
        <div className="container-px">
          <SectionHeading eyebrow="How It Works" title="Your IVF Journey in 5 Steps" subtitle="A clear, supportive path from first consultation to a positive result." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-3xl border border-slate-100 bg-slate-50 p-6 text-center">
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-brand-600 font-extrabold text-white shadow-soft">
                  {s.n}
                </div>
                <h4 className="mt-3 font-bold text-ink-900">{s.t}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="container-px py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: '🏆', t: 'High Success Rates', d: 'Among the best IVF outcomes in the region.' },
            { icon: '🔬', t: 'Advanced Lab', d: 'State-of-the-art embryology & cryo facilities.' },
            { icon: '❤️', t: 'Personalised Care', d: 'Every couple gets a dedicated fertility coach.' },
            { icon: '💰', t: 'Transparent Pricing', d: 'No hidden costs — clear, upfront packages.' },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-card">
              <div className="text-4xl">{c.icon}</div>
              <h4 className="mt-3 font-bold text-ink-900">{c.t}</h4>
              <p className="mt-1 text-sm text-slate-500">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-px pb-4">
        <div className="rounded-3xl bg-gradient-to-r from-brand-700 to-brand-500 px-8 py-12 text-center text-white sm:px-16">
          <h2 className="text-3xl font-extrabold">Ready to take the first step?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-50">
            Book a free, confidential consultation with our fertility specialists today.
          </p>
          <Link to="/contact" className="btn-accent mt-6 !px-8">Book Free Consultation</Link>
        </div>
      </section>
    </div>
  )
}
