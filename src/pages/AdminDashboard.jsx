import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAdmin, logoutAdmin } from '../lib/auth.js'
import { doctors as seedDoctors } from '../data/doctors.js'
import { ivfServices } from '../data/ivfServices.js'
import {
  apiGetAppointments, apiConfirmPay, apiCancel,
  apiGetExtraDoctors, apiAddDoctor, apiDeleteDoctor,
  apiGetBlockedDates, apiAddBlockedDate, apiDeleteBlockedDate,
  apiGetNotifications, apiAddNotification, apiDeleteNotification,
} from '../lib/appointments.js'

const tabs = ['Overview', 'Doctors', 'Appointments', 'Block Dates', 'Notifications', 'Patients']

export default function AdminDashboard() {
  const nav = useNavigate()
  const [tab, setTab] = useState('Overview')
  const seed = seedDoctors.map((d) => ({ id: 's' + d.id, name: d.name, specialtyLabel: d.specialtyLabel, fee: d.fee, seed: true }))
  const [extraDocs, setExtraDocs] = useState([])
  const [appts, setAppts] = useState([])
  const [blocked, setBlocked] = useState([])
  const [notifs, setNotifs] = useState([])
  const [docForm, setDocForm] = useState({ name: '', specialtyLabel: '', fee: '' })
  const [blockForm, setBlockForm] = useState({ date: '', doctorId: 0, reason: 'Holiday' })
  const [notifForm, setNotifForm] = useState({ title: '', message: '' })

  const refresh = () => apiGetAppointments().then(setAppts)
  const refreshDocs = () => apiGetExtraDoctors().then(setExtraDocs)
  const refreshBlocked = () => apiGetBlockedDates().then(setBlocked)
  const refreshNotifs = () => apiGetNotifications().then(setNotifs)

  useEffect(() => {
    if (!isAdmin()) { nav('/admin-login'); return }
    refresh(); refreshDocs(); refreshBlocked(); refreshNotifs()
  }, [])

  if (!isAdmin()) return null

  const docs = [...extraDocs, ...seed]
  const patients = [...new Map(appts.map((a) => [a.patient.phone || a.patient.name, a.patient])).values()]

  const addDoctor = async (e) => {
    e.preventDefault()
    if (!docForm.name) return
    await apiAddDoctor({ name: docForm.name, specialtyLabel: docForm.specialtyLabel, fee: Number(docForm.fee) || 500 })
    setDocForm({ name: '', specialtyLabel: '', fee: '' }); refreshDocs()
  }
  const removeDoctor = async (id) => {
    if (typeof id === 'string' && id.startsWith('s')) return alert('Seed doctors cannot be removed.')
    await apiDeleteDoctor(id); refreshDocs()
  }
  const addBlock = async (e) => {
    e.preventDefault()
    if (!blockForm.date) return
    await apiAddBlockedDate({ date: blockForm.date, doctorId: Number(blockForm.doctorId), reason: blockForm.reason || 'Not Available' })
    setBlockForm({ date: '', doctorId: 0, reason: 'Holiday' }); refreshBlocked()
  }
  const sendNotif = async (e) => {
    e.preventDefault()
    if (!notifForm.title) return
    await apiAddNotification(notifForm)
    setNotifForm({ title: '', message: '' }); refreshNotifs()
  }

  const overviewCards = [
    ['➕ Add Doctor', 'Doctors'],
    ['📅 Appointments', 'Appointments'],
    ['🚫 Block Dates', 'Block Dates'],
    ['📢 Send Notification', 'Notifications'],
    ['🧑‍🤝‍🧑 View Patients', 'Patients'],
    ['💳 Confirm Payments', 'Appointments'],
  ]

  return (
    <div className="container-px py-10 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 dark:text-white">🏥 Admin Dashboard</h1>
          <p className="text-slate-500">Manage doctors, appointments, dates and notifications</p>
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
        {/* OVERVIEW */}
        {tab === 'Overview' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {overviewCards.map(([label, goto]) => (
              <button key={label} onClick={() => setTab(goto)} className="rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-card transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-ink-800">
                <div className="text-lg font-bold text-ink-900 dark:text-white">{label}</div>
                <p className="mt-1 text-sm text-brand-600 dark:text-brand-300">Open →</p>
              </button>
            ))}
          </div>
        )}

        {/* DOCTORS */}
        {tab === 'Doctors' && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <form onSubmit={addDoctor} className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-ink-800">
              <h3 className="font-bold text-ink-900 dark:text-white">Add Doctor</h3>
              <label className="lbl">Name</label>
              <input className="input" value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} placeholder="Dr. Name" />
              <label className="lbl">Specialization</label>
              <input className="input" value={docForm.specialtyLabel} onChange={(e) => setDocForm({ ...docForm, specialtyLabel: e.target.value })} placeholder="Cardiologist" />
              <label className="lbl">Fee (₹, below 1000)</label>
              <input className="input" type="number" max="999" value={docForm.fee} onChange={(e) => setDocForm({ ...docForm, fee: e.target.value })} placeholder="700" />
              <button className="btn-primary mt-4 w-full">Add Doctor</button>
            </form>
            <div className="space-y-2">
              {docs.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{d.name} {d.seed && <span className="ml-1 text-[10px] text-slate-400">(default)</span>}</div>
                    <div className="text-sm text-slate-500">{d.specialtyLabel} · ₹{d.fee}</div>
                  </div>
                  {!d.seed && <button onClick={() => removeDoctor(d.id)} className="btn-ghost !py-2 !px-3 text-xs !text-red-500">Remove</button>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* APPOINTMENTS */}
        {tab === 'Appointments' && (
          appts.length === 0 ? <p className="text-slate-500">No appointments booked yet.</p> : (
            <div className="space-y-2">
              {appts.map((a) => (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{a.patient.name} → {a.doctorName}</div>
                    <div className="text-sm text-slate-500">{a.date} · {a.slot} · <span className="font-mono">{a.id}</span></div>
                    <div className="mt-1 flex gap-2">
                      <span className={`chip ${a.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>{a.status}</span>
                      <span className={`chip ${a.paid ? 'bg-brand-50 text-brand-700' : 'bg-amber-100 text-amber-700'}`}>{a.paid ? 'Paid ₹' + a.fee : 'Pending ₹' + a.fee}</span>
                    </div>
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

        {/* BLOCK DATES */}
        {tab === 'Block Dates' && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <form onSubmit={addBlock} className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-ink-800">
              <h3 className="font-bold text-ink-900 dark:text-white">Block a Date</h3>
              <p className="mt-1 text-xs text-slate-500">Blocked dates cannot be booked by patients.</p>
              <label className="lbl">Date</label>
              <input className="input" type="date" value={blockForm.date} onChange={(e) => setBlockForm({ ...blockForm, date: e.target.value })} />
              <label className="lbl">Applies to</label>
              <select className="select" value={blockForm.doctorId} onChange={(e) => setBlockForm({ ...blockForm, doctorId: e.target.value })}>
                <option value={0}>All Doctors</option>
                {seedDoctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <label className="lbl">Reason</label>
              <select className="select" value={blockForm.reason} onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}>
                <option>Holiday</option><option>Doctor Not Available</option><option>Maintenance</option><option>Fully Booked</option>
              </select>
              <button className="btn-primary mt-4 w-full">🚫 Block Date</button>
            </form>
            <div className="space-y-2">
              {blocked.length === 0 ? <p className="text-slate-500">No blocked dates yet.</p> : blocked.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{b.date}</div>
                    <div className="text-sm text-slate-500">{b.reason} · {b.doctorId === 0 ? 'All doctors' : (seedDoctors.find((d) => d.id === b.doctorId)?.name || 'Doctor #' + b.doctorId)}</div>
                  </div>
                  <button onClick={async () => { await apiDeleteBlockedDate(b.id); refreshBlocked() }} className="btn-ghost !py-2 !px-3 text-xs !text-red-500">Unblock</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {tab === 'Notifications' && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <form onSubmit={sendNotif} className="h-fit rounded-2xl border border-slate-100 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-ink-800">
              <h3 className="font-bold text-ink-900 dark:text-white">Send Notification</h3>
              <p className="mt-1 text-xs text-slate-500">Shown to all patients in their dashboard.</p>
              <label className="lbl">Title</label>
              <input className="input" value={notifForm.title} onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })} placeholder="Free health camp Sunday" />
              <label className="lbl">Message</label>
              <textarea className="input min-h-[90px]" value={notifForm.message} onChange={(e) => setNotifForm({ ...notifForm, message: e.target.value })} placeholder="Details…" />
              <button className="btn-primary mt-4 w-full">📢 Send</button>
            </form>
            <div className="space-y-2">
              {notifs.length === 0 ? <p className="text-slate-500">No notifications sent yet.</p> : notifs.map((n) => (
                <div key={n.id} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{n.title}</div>
                    <div className="text-sm text-slate-500">{n.message}</div>
                    <div className="text-xs text-slate-400">{(n.createdAt || '').slice(0, 16).replace('T', ' ')}</div>
                  </div>
                  <button onClick={async () => { await apiDeleteNotification(n.id); refreshNotifs() }} className="btn-ghost !py-2 !px-3 text-xs !text-red-500">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PATIENTS */}
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
