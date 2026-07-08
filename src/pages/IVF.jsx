import { Link, useNavigate } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import { ivfServices, whyChoose } from '../data/ivfServices.js'

export default function IVF() {
  const navigate = useNavigate()

  return (
    <div className="dark:text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-emerald-500 text-white">
        <div className="absolute -left-20 -bottom-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="container-px relative grid gap-8 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="chip bg-white/15 text-white">👶 ShiKhar Fertility &amp; IVF Center</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Bringing Dreams to Life
            </h1>
            <p className="mt-3 text-xl font-medium text-white/90">
              Advanced IVF Care for Your Parenthood Journey
            </p>
            <p className="mt-4 max-w-md text-white/80">
              Compassionate, world-class fertility treatment with high success rates and complete
              privacy — every step guided by expert specialists.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="btn-accent !px-6 !py-3.5">Book Appointment</Link>
              <a href="tel:+919393900000" className="btn !border-2 !border-white/30 !py-3.5 text-white hover:!bg-white/10">
                📞 IVF Helpline
              </a>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
            <div className="grid grid-cols-2 gap-4 text-center">
              {[['70%', 'Success Rate'], ['10,000+', 'Happy Parents'], ['25+', 'Fertility Experts'], ['15+', 'Years of Care']].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-white/10 p-5">
                  <div className="text-3xl font-extrabold">{n}</div>
                  <div className="mt-1 text-sm text-white/80">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-px py-16">
        <SectionHeading eyebrow="Our Treatments" title="IVF & Fertility Services" subtitle="Comprehensive fertility care — click any service to learn more." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ivfServices.map((s, i) => (
            <button
              key={s.id}
              onClick={() => navigate(`/ivf/${s.id}`)}
              style={{ animationDelay: `${i * 0.03}s` }}
              className="group animate-floatUp rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-card transition hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-soft dark:border-slate-800 dark:bg-ink-800"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-3xl transition group-hover:bg-brand-100 dark:bg-brand-900/40">
                {s.icon}
              </div>
              <h3 className="mt-4 font-bold text-ink-900 dark:text-white">{s.name}</h3>
              <p className="mt-1 text-xs text-slate-500">{s.short}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand-600 dark:text-brand-300">Learn more →</span>
            </button>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-white py-16 dark:bg-ink-800/50">
        <div className="container-px">
          <SectionHeading eyebrow="Why ShiKhar" title="Why Choose ShiKhar Hospital?" subtitle="Everything you need for a safe, supported and successful journey." />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {whyChoose.map((w) => (
              <div key={w.title} className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-ink-800">
                <div className="text-3xl">{w.icon}</div>
                <div className="mt-2 text-sm font-semibold text-ink-900 dark:text-white">{w.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fertility guidance */}
      <section className="container-px py-16">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 to-emerald-500 px-8 py-12 text-center text-white sm:px-16">
          <h2 className="text-3xl font-extrabold">Unsure about your fertility treatment?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Consult our fertility experts for personalized guidance and choose the treatment that's
            right for you.
          </p>
          <Link to="/book" className="btn-accent mt-6 !px-8">Consult Our Experts</Link>
        </div>
      </section>

      {/* Cancer & Fertility */}
      <section className="container-px pb-16">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-ink-800 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="chip bg-rose-100 text-rose-700">🎀 Onco-Fertility</span>
              <h2 className="mt-3 text-2xl font-extrabold text-ink-900 dark:text-white">Cancer &amp; Fertility Preservation</h2>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                Cancer treatments like chemotherapy and radiation can affect fertility. We help you
                preserve your ability to have children in the future — before treatment begins.
              </p>
              <Link to="/book" className="btn-primary mt-6">Book Appointment</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['🧊', 'Egg Freezing'], ['🧪', 'Sperm Freezing'], ['❄️', 'Embryo Freezing'], ['🩺', 'Oncology Consultation']].map(([icon, t]) => (
                <div key={t} className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-slate-800">
                  <div className="text-3xl">{icon}</div>
                  <div className="mt-2 text-sm font-semibold text-ink-900 dark:text-white">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
