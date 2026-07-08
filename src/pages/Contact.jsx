import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import { hospitals } from '../data/specialties.js'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', hospital: hospitals[0], message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  return (
    <div className="container-px py-12">
      <SectionHeading eyebrow="Get in Touch" title="Contact Us" subtitle="Have a question or need a callback? Our team is here to help 24×7." />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={(e) => { e.preventDefault(); if (form.name && form.phone) setSent(true) }}
          className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card"
        >
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-3xl">✅</div>
              <p className="mt-4 text-lg font-bold text-ink-900">Thank you, {form.name}!</p>
              <p className="mt-1 text-slate-500">Our team will call you back shortly.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Full Name *"><input className="input" value={form.name} onChange={set('name')} placeholder="Your name" /></F>
              <F label="Phone *"><input className="input" value={form.phone} onChange={set('phone')} placeholder="+91 …" /></F>
              <F label="Hospital" full>
                <select className="select" value={form.hospital} onChange={set('hospital')}>
                  {hospitals.map((h) => <option key={h}>{h}</option>)}
                </select>
              </F>
              <F label="Message" full>
                <textarea className="input min-h-[110px]" value={form.message} onChange={set('message')} placeholder="How can we help?" />
              </F>
              <div className="sm:col-span-2">
                <button className="btn-primary w-full sm:w-auto">Request Callback</button>
              </div>
            </div>
          )}
        </form>

        <aside className="space-y-4">
          {[
            { icon: '📞', t: '24×7 Helpline', v: '+91 90000 00000' },
            { icon: '📧', t: 'Email', v: 'care@medicareplus.com' },
            { icon: '📍', t: 'Head Office', v: 'City Center, Main Road' },
            { icon: '🚑', t: 'Emergency', v: 'Dial 102 / 108' },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl">{c.icon}</span>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">{c.t}</div>
                <div className="font-semibold text-ink-900">{c.v}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}

function F({ label, children, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-400">{label}</label>
      {children}
    </div>
  )
}
