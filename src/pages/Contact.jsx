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
            { icon: '📍', t: 'Hospital Address', v: 'ShiKhar Hospital, City Center, Main Road' },
            { icon: '📧', t: 'Email', v: 'care@shikharhospital.com' },
            { icon: '🚑', t: 'Emergency Number', v: '+91 93939 39393' },
            { icon: '👶', t: 'IVF Helpline', v: '+91 93939 00000' },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-ink-800">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl dark:bg-brand-900/40">{c.icon}</span>
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-400">{c.t}</div>
                <div className="font-semibold text-ink-900 dark:text-white">{c.v}</div>
              </div>
            </div>
          ))}

          <a href="https://wa.me/919393939393" target="_blank" rel="noreferrer" className="btn w-full bg-[#25D366] text-white hover:opacity-90">💬 Chat on WhatsApp</a>

          <div className="flex justify-center gap-3">
            {['📘', '🐦', '📸', '💼', '▶️'].map((s, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-lg hover:bg-brand-100 dark:bg-slate-800">{s}</a>
            ))}
          </div>
        </aside>
      </div>

      {/* Map */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-100 shadow-card dark:border-slate-800">
        <iframe
          title="ShiKhar Hospital Location"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.05%2C28.55%2C77.35%2C28.70&layer=mapnik"
          className="h-72 w-full"
          loading="lazy"
        />
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
