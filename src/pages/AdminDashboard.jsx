import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAdmin, logoutAdmin } from '../lib/auth.js'
import { doctors as seedDoctors } from '../data/doctors.js'
import { ivfServices } from '../data/ivfServices.js'
import {
  apiGetAppointments, apiConfirmPay, apiCancel,
  apiGetExtraDoctors, apiAddDoctor, apiDeleteDoctor,
} from '../lib/appointments.js'

const tabs = ['Overview', 'Doctors', 'Appointments', 'Patients', 'IVF Services']

export default function AdminDashboard() {
  const nav = useNavigate()
  const [tab, setTab] = useState('Overview')
  const seed = seedDoctors.map((d) => ({ id: 's' + d.id, name: d.name, specialtyLabel: d.specialtyLabel, fee: d.fee, seed: true }))
  const [extraDocs, setExtraDocs] = useState([])
  const [appts, setAppts] = useState([])
  const [form, setForm] = useState({ name: '', specialtyLabel: '', fee: '' })

  const refresh = () => apiGetAppointments().then(setAppts)
  const refreshDocs = () => apiGetExtraDoctors().then(setExtraDocs)

  useEffect(() => {
    if (!isAdmin()) nav('/admin-login')
    else { refresh(); refreshDocs() }
  }, [])

  if (!isAdmin()) return null

  const docs = [...extraDocs, ...seed]

  const addDoctor = async (e) => {
    e.preventDefault()
    if (!form.name) return
    await apiAddDoctor({ name: form.name, specialtyLabel: form.specialtyLabel, fee: Number(form.fee) || 500 })
    setForm({ name: '', specialtyLabel: '', fee: '' })
    refreshDocs()
  }
  const removeDoctor = async (id) => {
    if (typeof id === 'string' && id.startsWith('s')) return alert('Seed doctors cannot be removed here.')
    await apiDeleteDoctor(id); refreshDocs()
  }

  const patients = [...new Map(appts.map((a) => [a.patient.phone || a.patient.name, a.patient])).values()]

  return (
    <div className="container-px py-10 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 dark:text-white">🏥 Admin Dashboard</h1>
          <p className="text-slate-500">Manage doctors, appointments, patients and services</p>
        </div>
        <button onClick={() => { logoutAdmin(); nav('/') }} className="btn-outline">Logout</button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat n={docs.length} l="Doctors" icon="👨‍⚕️" />
        <Stat n={appts.filter((a) => a.status !== 'Cancelled').length} l="Appointments" icon="📅" />
        <Stat n={patients.length} l="Patients" icon="🧑‍🤝‍🧑" />
        <Stat n={appts.filter((a) => !a.paid && a.status !== 'Cancelled').length} l="Pending Payments" icon="💳" />
      </div>

      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-700">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`whitespace-nowrap px-4 py-3 text-sm font-semibold ${tab === t ? 'border-b-2 border-brand-600 text-brand-700 dark:text-brand-300' : 'text-slate-500'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'Overview' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {['➕ Add Doctor', '📅 Manage Slots', '🚫 Block Dates', '💳 Confirm Payments', '📢 Send Notification', '🧬 Manage IVF Services'].map((a) => (
              <div key={a} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-ink-800">
                <div className="text-lg font-bold text-ink-900 dark:text-white">{a}</div>
                <p className="mt-1 text-sm text-slate-500">Quick action available in the respective tab.</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'Doctors' && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <form onSubmit={addDoctor} className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-ink-800">
              <h3 className="font-bold text-ink-900 dark:text-white">Add Doctor</h3>
              <label className="lbl">Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Name" />
              <label className="lbl">Specialization</label>
              <input className="input" value={form.specialtyLabel} onChange={(e) => setForm({ ...form, specialtyLabel: e.target.value })} placeholder="Cardiologist" />
              <label className="lbl">Fee (₹, below 1000)</label>
              <input className="input" type="number" max="999" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} placeholder="700" />
              <button className="btn-primary mt-4 w-full">Add Doctor</button>
            </form>
            <div className="space-y-2">
              {docs.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{d.name}</div>
                    <div className="text-sm text-slate-500">{d.specialtyLabel} · ₹{d.fee}</div>
                  </div>
                  <button onClick={() => removeDoctor(d.id)} className="btn-ghost !py-2 !px-3 text-xs !text-red-500">Remove</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Appointments' && (
          appts.length === 0 ? <p className="text-slate-500">No appointments booked yet.</p> : (
            <div className="space-y-2">
              {appts.map((a) => (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{a.patient.name} → {a.doctorName}</div>
                    <div className="text-sm text-slate-500">{a.date} · {a.slot} · <span className="font-mono">{a.id}</span></div>
                    <span className={`chip mt-1 ${a.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>{a.status}</span>
                  </div>
                  <div className="flex gap-2">
                    {!a.paid && a.status !== 'Cancelled' && <button onClick={async () => { await apiConfirmPay(a.id); refresh() }} className="btn-accent !py-2 !px-3 text-xs">Confirm Payment</button>}
                    {a.status !== 'Cancelled' && <button onClick={async () => { await apiCancel(a.id); refresh() }} className="btn-ghost !py-2 !px-3 text-xs !text-red-500">Cancel</button>}
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {tab === 'Patients' && (
          patients.length === 0 ? <p className="text-slate-500">No patients yet.</p> : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {patients.map((p, i) => (
                <div key={i} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div className="font-bold text-ink-900 dark:text-white">{p.name}</div>
                  <div className="text-sm text-slate-500">{p.phone || '—'}</div>
                  <div className="text-xs text-slate-400">{p.email || ''}</div>
                </div>
              ))}
            </div>
          )
        )}

        {tab === 'IVF Services' && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ivfServices.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                <span className="text-2xl">{s.icon}</span>
                <div className="font-semibold text-ink-900 dark:text-white">{s.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Stat({ n, l, icon }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-ink-800">
      <div className="text-2xl">{icon}</div>
      <div className="mt-1 text-2xl font-extrabold text-ink-900 dark:text-white">{n}</div>
      <div className="text-xs text-slate-500">{l}</div>
    </div>
  )
}
