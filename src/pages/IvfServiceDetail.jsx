import { Link, useParams } from 'react-router-dom'
import { getIvfService, ivfServices } from '../data/ivfServices.js'

export default function IvfServiceDetail() {
  const { serviceId } = useParams()
  const service = getIvfService(serviceId)

  if (!service) {
    return (
      <div className="container-px grid place-items-center py-32 text-center">
        <p className="text-lg font-semibold dark:text-white">Service not found.</p>
        <Link to="/ivf" className="btn-primary mt-4">Back to IVF</Link>
      </div>
    )
  }

  const related = ivfServices.filter((s) => s.id !== service.id).slice(0, 4)

  return (
    <div className="dark:text-slate-100">
      <section className="bg-gradient-to-br from-brand-700 to-emerald-500 py-14 text-white">
        <div className="container-px">
          <Link to="/ivf" className="text-sm font-semibold text-white/80 hover:text-white">← All IVF services</Link>
          <div className="mt-4 flex items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-4xl">{service.icon}</span>
            <div>
              <h1 className="text-3xl font-extrabold">{service.name}</h1>
              <p className="text-white/85">{service.short}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-ink-800">
            <h2 className="text-xl font-extrabold text-ink-900 dark:text-white">About this treatment</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">{service.desc}</p>

            <h3 className="mt-8 font-bold text-ink-900 dark:text-white">What to expect</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {['Detailed consultation with a fertility specialist', 'Personalised assessment and diagnostic tests', 'A treatment plan tailored to you', 'Continuous monitoring and emotional support', 'Transparent, affordable pricing'].map((t) => (
                <li key={t} className="flex items-start gap-2"><span className="text-brand-600">✓</span> {t}</li>
              ))}
            </ul>

            <h3 className="mt-8 font-bold text-ink-900 dark:text-white">Related services</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {related.map((r) => (
                <Link key={r.id} to={`/ivf/${r.id}`} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200">
                  {r.icon} {r.name}
                </Link>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-ink-800 lg:sticky lg:top-24">
            <h3 className="font-bold text-ink-900 dark:text-white">Ready to start?</h3>
            <p className="mt-2 text-sm text-slate-500">Book a confidential consultation with our fertility experts.</p>
            <Link to="/book" className="btn-primary mt-4 w-full">Book Appointment</Link>
            <a href="tel:+919393900000" className="btn-outline mt-2 w-full">📞 IVF Helpline</a>
            <a href="https://wa.me/919393939393" target="_blank" rel="noreferrer" className="btn mt-2 w-full bg-[#25D366] text-white hover:opacity-90">💬 WhatsApp Us</a>
          </aside>
        </div>
      </section>
    </div>
  )
}
