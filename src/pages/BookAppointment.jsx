import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { doctors } from '../data/doctors.js'

const slots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM']

export default function BookAppointment() {
  const { id } = useParams()
  const doctor = doctors.find((d) => d.id === Number(id))
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', slot: '', reason: '' })
  const [done, setDone] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.slot) return
    setDone(true)
  }

  if (done) {
    return (
      <div className="container-px grid place-items-center py-24">
        <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-card">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl">✅</div>
          <h2 className="mt-5 text-2xl font-extrabold text-ink-900">Appointment Confirmed!</h2>
          <p className="mt-2 text-slate-500">
            {form.name}, your appointment{doctor ? ` with ${doctor.name}` : ''} is booked for{' '}
            <span className="font-semibold text-ink-900">{form.date}</span> at{' '}
            <span className="font-semibold text-ink-900">{form.slot}</span>.
          </p>
          <p className="mt-2 text-sm text-slate-400">A confirmation & reminder will be sent to you.</p>
          <Link to="/doctors" className="btn-primary mt-6 w-full">Back to Doctors</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-px py-10">
      <Link to={doctor ? `/doctors/${doctor.id}` : '/doctors'} className="text-sm font-semibold text-brand-600 hover:underline">
        ← Back
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Form */}
        <form onSubmit={submit} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
          <h1 className="text-2xl font-extrabold text-ink-900">Book an Appointment</h1>
          <p className="mt-1 text-slate-500">Fill in your details and pick a time slot.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <L label="Full Name *"><input className="input" value={form.name} onChange={set('name')} placeholder="Your name" /></L>
            <L label="Phone *"><input className="input" value={form.phone} onChange={set('phone')} placeholder="+91 …" /></L>
            <L label="Email"><input className="input" type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" /></L>
            <L label="Preferred Date *"><input className="input" type="date" value={form.date} onChange={set('date')} /></L>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">Select a Time Slot *</label>
            <div className="flex flex-wrap gap-2">
              {slots.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setForm({ ...form, slot: s })}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                    form.slot === s
                      ? 'border-brand-600 bg-brand-600 text-white'
                      : 'border-slate-200 text-ink-700 hover:border-brand-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <L label="Reason for visit">
              <textarea className="input min-h-[90px]" value={form.reason} onChange={set('reason')} placeholder="Describe your symptoms…" />
            </L>
          </div>

          <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">Confirm Appointment</button>
        </form>

        {/* Summary */}
        {doctor && (
          <aside className="h-fit rounded-3xl border border-slate-100 bg-white p-6 shadow-card lg:sticky lg:top-24">
            <div className="flex items-center gap-4">
              <img src={doctor.photo} alt={doctor.name} className="h-16 w-16 rounded-2xl object-cover" />
              <div>
                <div className="font-bold text-ink-900">{doctor.name}</div>
                <div className="text-sm text-brand-700">{doctor.specialtyLabel}</div>
              </div>
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <Row k="Hospital" v={doctor.hospital} />
              <Row k="Experience" v={`${doctor.experience} yrs`} />
              <Row k="Consultation Fee" v={`₹${doctor.fee}`} highlight />
            </dl>
          </aside>
        )}
      </div>
    </div>
  )
}

function L({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-400">{label}</label>
      {children}
    </div>
  )
}
function Row({ k, v, highlight }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
      <dt className="text-slate-500">{k}</dt>
      <dd className={highlight ? 'text-lg font-extrabold text-brand-700' : 'font-semibold text-ink-900'}>{v}</dd>
    </div>
  )
}
