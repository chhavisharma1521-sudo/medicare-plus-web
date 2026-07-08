import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getPatient, logoutPatient } from '../lib/auth.js'
import { apiGetAppointments, apiCancel, apiGetNotifications } from '../lib/appointments.js'

const tabs = ['Appointments', 'Prescriptions', 'Medical History', 'Notifications']

export default function PatientDashboard() {
  const nav = useNavigate()
  const patient = getPatient()
  const [tab, setTab] = useState('Appointments')
  const [appts, setAppts] = useState([])
  const [notifs, setNotifs] = useState([])

  const refresh = () =>
    apiGetAppointments({ email: patient?.email || '', phone: patient?.phone || '' }).then(setAppts)

  useEffect(() => {
    if (!patient) nav('/patient-login')
    else { refresh(); apiGetNotifications().then(setNotifs) }
  }, [])

  const cancel = async (id) => {
    if (confirm('Cancel this appointment?')) { await apiCancel(id); refresh() }
  }

  if (!patient) return null

  return (
    <div className="container-px py-10 dark:text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 dark:text-white">Welcome, {patient.name} 👋</h1>
          <p className="text-slate-500">Manage your appointments and health records</p>
        </div>
        <div className="flex gap-2">
          <Link to="/book" className="btn-primary">+ Book Appointment</Link>
          <button onClick={() => { logoutPatient(); nav('/') }} className="btn-outline">Logout</button>
        </div>
      </div>

      {/* stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat n={appts.filter((a) => a.status !== 'Cancelled').length} l="Active Appointments" icon="📅" />
        <Stat n={appts.filter((a) => !a.paid && a.status !== 'Cancelled').length} l="Pending Bills" icon="💳" />
        <Stat n={2} l="Prescriptions" icon="💊" />
        <Stat n={notifs.length} l="Notifications" icon="🔔" />
      </div>

      {/* tabs */}
      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-700">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-semibold ${
              tab === t ? 'border-b-2 border-brand-600 text-brand-700 dark:text-brand-300' : 'text-slate-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'Appointments' && (
          appts.length === 0 ? (
            <Empty text="No appointments yet." cta />
          ) : (
            <div className="space-y-3">
              {appts.map((a) => (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{a.doctorName} · {a.specialty}</div>
                    <div className="text-sm text-slate-500">📅 {a.date} · 🕐 {a.slot} · <span className="font-mono">{a.id}</span></div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs">
                      <span className={`chip ${a.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>{a.status}</span>
                      <span className={`chip ${a.paid ? 'bg-brand-50 text-brand-700' : 'bg-amber-100 text-amber-700'}`}>{a.paid ? 'Paid ₹' + a.fee : 'Bill Pending ₹' + a.fee}</span>
                    </div>
                  </div>
                  {a.status !== 'Cancelled' && (
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/consult/appt-${a.id}`} className="btn-primary !py-2 !px-3 text-xs">🎥 Join Video Call</Link>
                      {!a.paid && <Link to="/book" className="btn-accent !py-2 !px-3 text-xs">Pay Bill</Link>}
                      <Link to={`/book/${a.doctorId}`} className="btn-outline !py-2 !px-3 text-xs">Reschedule</Link>
                      <button onClick={() => cancel(a.id)} className="btn-ghost !py-2 !px-3 text-xs !text-red-500">Cancel</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {tab === 'Prescriptions' && (
          <div className="space-y-3">
            {[['Dr. Priya Sharma', 'Amlodipine 5mg · Once daily', '2026-06-20'], ['Dr. Anjali Singh', 'Retino-A cream · At night', '2026-05-11']].map(([d, m, dt]) => (
              <div key={m} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                <div>
                  <div className="font-bold text-ink-900 dark:text-white">{d}</div>
                  <div className="text-sm text-slate-500">{m} · {dt}</div>
                </div>
                <button className="btn-outline !py-2 !px-3 text-xs">⬇ PDF</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'Medical History' && (
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-ink-800">
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {['Blood Pressure: 128/82 mmHg (Jun 2026)', 'Blood Sugar (Fasting): 96 mg/dL (May 2026)', 'Allergy: Penicillin', 'Last Full Body Checkup: Apr 2026'].map((h) => (
                <li key={h} className="flex items-start gap-2"><span className="text-brand-600">•</span> {h}</li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'Notifications' && (
          <div className="space-y-3">
            {notifs.length === 0 ? (
              <p className="text-slate-500">No notifications yet.</p>
            ) : notifs.map((n) => (
              <div key={n.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-ink-800">
                <div className="font-bold text-ink-900 dark:text-white">🔔 {n.title}</div>
                {n.message && <div className="mt-1 text-sm text-slate-500 dark:text-slate-300">{n.message}</div>}
                <div className="mt-1 text-xs text-slate-400">{(n.createdAt || '').slice(0, 16).replace('T', ' ')}</div>
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
function Empty({ text, cta }) {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-slate-200 py-16 text-center dark:border-slate-700">
      <p className="text-slate-500">{text}</p>
      {cta && <Link to="/book" className="btn-primary mt-4">Book Now</Link>}
    </div>
  )
}
