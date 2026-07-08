import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doctors, getDoctor } from '../data/doctors.js'
import { specialties } from '../data/specialties.js'
import { buildCalendar, apiCreateAppointment } from '../lib/appointments.js'

const STEPS = ['Doctor', 'Date & Time', 'Details', 'Payment', 'Confirmed']

export default function BookAppointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const preDoc = id ? getDoctor(id) : null

  const [step, setStep] = useState(preDoc ? 1 : 0)
  const [department, setDepartment] = useState(preDoc ? preDoc.department : 'all')
  const [doctor, setDoctor] = useState(preDoc || null)
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [patient, setPatient] = useState({ name: '', phone: '', email: '', reason: '' })
  const [payMethod, setPayMethod] = useState('UPI')
  const [appt, setAppt] = useState(null)
  const [booking, setBooking] = useState(false)
  const [error, setError] = useState('')

  const deptDoctors = useMemo(
    () => (department === 'all' ? doctors : doctors.filter((d) => d.department === department)),
    [department]
  )
  const calendar = useMemo(() => buildCalendar(21, doctor), [doctor])

  const canConfirmPatient = patient.name && patient.phone

  const finish = async () => {
    setError('')
    setBooking(true)
    const record = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialtyLabel,
      hospital: doctor.hospital,
      date,
      slot,
      fee: doctor.fee,
      payMethod,
      status: payMethod === 'Cash at Hospital' ? 'Confirmed (Pay at Hospital)' : 'Confirmed',
      paid: payMethod !== 'Cash at Hospital',
      patient,
    }
    try {
      const saved = await apiCreateAppointment(record)
      setAppt(saved)
      setStep(4)
    } catch {
      setError('Booking failed. Please check your connection and try again.')
    } finally {
      setBooking(false)
    }
  }

  return (
    <div className="container-px py-10 dark:text-slate-100">
      <h1 className="text-center text-3xl font-extrabold text-ink-900 dark:text-white">Book an Appointment</h1>
      <p className="mt-1 text-center text-slate-500">Real-time slots • instant confirmation</p>

      {/* Stepper */}
      <div className="mx-auto mt-8 flex max-w-2xl items-center justify-between">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`grid h-9 w-9 place-items-center rounded-full text-sm font-bold transition ${
                  i <= step ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-700'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className="mt-1 hidden text-[11px] font-semibold text-slate-500 sm:block">{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`mx-1 h-1 flex-1 rounded ${i < step ? 'bg-brand-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        {/* STEP 0 — Department + Doctor */}
        {step === 0 && (
          <Card>
            <h2 className="section-h">Select Department &amp; Doctor</h2>
            <label className="lbl">Department</label>
            <select className="select" value={department} onChange={(e) => { setDepartment(e.target.value); setDoctor(null) }}>
              <option value="all">All Departments</option>
              {specialties.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {deptDoctors.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDoctor(d)}
                  className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition ${
                    doctor?.id === d.id
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                      : 'border-slate-200 hover:border-brand-300 dark:border-slate-700'
                  }`}
                >
                  <img src={d.photo} alt={d.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <div className="truncate font-bold text-ink-900 dark:text-white">{d.name}</div>
                    <div className="truncate text-xs text-brand-700 dark:text-brand-300">{d.specialtyLabel} · ₹{d.fee}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button disabled={!doctor} onClick={() => setStep(1)} className="btn-primary disabled:opacity-50">Next →</button>
            </div>
          </Card>
        )}

        {/* STEP 1 — Date & Time */}
        {step === 1 && doctor && (
          <Card>
            <h2 className="section-h">Choose Date &amp; Time</h2>
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
              <img src={doctor.photo} className="h-10 w-10 rounded-lg object-cover" alt="" />
              <div>
                <div className="font-bold text-ink-900 dark:text-white">{doctor.name}</div>
                <div className="text-xs text-slate-500">Available: {doctor.availableDays.join(', ')}</div>
              </div>
            </div>

            <label className="lbl">Select a date</label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
              {calendar.map((c) => {
                const blocked = !c.status.ok
                const selected = date === c.iso
                return (
                  <button
                    key={c.iso}
                    disabled={blocked}
                    onClick={() => { setDate(c.iso); setSlot('') }}
                    title={blocked ? c.status.reason : 'Available'}
                    className={`rounded-xl border px-1 py-2 text-center transition ${
                      selected
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : blocked
                        ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-600'
                        : 'border-slate-200 hover:border-brand-400 dark:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-semibold uppercase">{c.weekday}</div>
                    <div className="text-sm font-bold">{c.label.split(' ')[0]}</div>
                    <div className="text-[9px]">{blocked ? c.status.reason.split(' ')[0] : c.label.split(' ')[1]}</div>
                  </button>
                )
              })}
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
              <Legend color="bg-brand-600" label="Selected" />
              <Legend color="bg-slate-200 dark:bg-slate-700" label="Available" />
              <Legend color="bg-slate-100 dark:bg-slate-800" label="Blocked / Holiday / Not available" />
            </div>

            {date && (
              <>
                <label className="lbl mt-6">☀️ Morning Session</label>
                <SlotRow slots={doctor.morningSlots} value={slot} onPick={setSlot} />
                <label className="lbl mt-4">🌆 Evening Session</label>
                <SlotRow slots={doctor.eveningSlots} value={slot} onPick={setSlot} />
              </>
            )}

            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(preDoc ? 1 : 0)} className="btn-ghost dark:text-slate-200">← Back</button>
              <button disabled={!date || !slot} onClick={() => setStep(2)} className="btn-primary disabled:opacity-50">Next →</button>
            </div>
          </Card>
        )}

        {/* STEP 2 — Patient details + summary */}
        {step === 2 && doctor && (
          <Card>
            <h2 className="section-h">Your Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name *"><input className="input" value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} placeholder="Your name" /></Field>
              <Field label="Phone *"><input className="input" value={patient.phone} onChange={(e) => setPatient({ ...patient, phone: e.target.value })} placeholder="+91 …" /></Field>
              <Field label="Email"><input className="input" value={patient.email} onChange={(e) => setPatient({ ...patient, email: e.target.value })} placeholder="you@email.com" /></Field>
              <Field label="Reason"><input className="input" value={patient.reason} onChange={(e) => setPatient({ ...patient, reason: e.target.value })} placeholder="Symptoms / concern" /></Field>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="font-bold text-ink-900 dark:text-white">Appointment Summary</h3>
              <dl className="mt-3 space-y-2 text-sm">
                <Row k="Doctor" v={doctor.name} />
                <Row k="Department" v={doctor.specialtyLabel} />
                <Row k="Date" v={date} />
                <Row k="Time" v={slot} />
                <Row k="Consultation Fee" v={`₹${doctor.fee}`} highlight />
              </dl>
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(1)} className="btn-ghost dark:text-slate-200">← Back</button>
              <button disabled={!canConfirmPatient} onClick={() => setStep(3)} className="btn-primary disabled:opacity-50">Proceed to Payment →</button>
            </div>
          </Card>
        )}

        {/* STEP 3 — Payment */}
        {step === 3 && doctor && (
          <Card>
            <h2 className="section-h">Payment</h2>
            <div className="rounded-2xl bg-brand-50 p-4 text-center dark:bg-brand-900/30">
              <div className="text-sm text-slate-500">Amount payable</div>
              <div className="text-3xl font-extrabold text-brand-700 dark:text-brand-300">₹{doctor.fee}</div>
            </div>

            <label className="lbl mt-5">Choose a payment method</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {['UPI', 'Debit Card', 'Credit Card', 'Net Banking', 'Cash at Hospital'].map((m) => (
                <button
                  key={m}
                  onClick={() => setPayMethod(m)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left font-semibold transition ${
                    payMethod === m ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'border-slate-200 hover:border-brand-300 dark:border-slate-700'
                  }`}
                >
                  <span className="text-xl">{payIcon(m)}</span> {m}
                </button>
              ))}
            </div>

            {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(2)} className="btn-ghost dark:text-slate-200" disabled={booking}>← Back</button>
              <button onClick={finish} disabled={booking} className="btn-accent disabled:opacity-60">
                {booking ? 'Processing…' : payMethod === 'Cash at Hospital' ? 'Confirm Booking' : `Pay ₹${doctor.fee}`}
              </button>
            </div>
          </Card>
        )}

        {/* STEP 4 — Confirmation */}
        {step === 4 && appt && (
          <Card>
            <div className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl dark:bg-emerald-900/40">✅</div>
              <h2 className="mt-4 text-2xl font-extrabold text-ink-900 dark:text-white">Appointment Confirmed!</h2>
              <p className="mt-1 text-slate-500">A confirmation has been sent to you.</p>
              <div className="mx-auto mt-4 w-fit rounded-xl bg-slate-900 px-5 py-2 font-mono text-lg font-bold text-white dark:bg-slate-700">
                {appt.id}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <dl className="space-y-2 text-sm">
                <Row k="Patient" v={appt.patient.name} />
                <Row k="Doctor" v={appt.doctorName} />
                <Row k="Date & Time" v={`${appt.date} · ${appt.slot}`} />
                <Row k="Payment" v={`${appt.payMethod} — ${appt.paid ? 'Paid' : 'Pending'}`} />
                <Row k="Amount" v={`₹${appt.fee}`} highlight />
              </dl>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={() => downloadReceipt(appt)} className="btn-primary">⬇ Download Receipt</button>
              <button onClick={() => navigate('/patient-dashboard')} className="btn-outline">Go to My Dashboard</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

/* helpers */
function Card({ children }) {
  return <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-ink-800 sm:p-8">{children}</div>
}
function Field({ label, children }) {
  return <div><label className="lbl">{label}</label>{children}</div>
}
function Row({ k, v, highlight }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
      <dt className="text-slate-500">{k}</dt>
      <dd className={highlight ? 'text-lg font-extrabold text-brand-700 dark:text-brand-300' : 'font-semibold text-ink-900 dark:text-white'}>{v}</dd>
    </div>
  )
}
function SlotRow({ slots, value, onPick }) {
  return (
    <div className="flex flex-wrap gap-2">
      {slots.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
            value === s ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 hover:border-brand-400 dark:border-slate-700 dark:text-slate-200'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
function Legend({ color, label }) {
  return <span className="flex items-center gap-1.5"><span className={`h-3 w-3 rounded ${color}`} /> {label}</span>
}
function payIcon(m) {
  return { UPI: '📲', 'Debit Card': '💳', 'Credit Card': '💳', 'Net Banking': '🏦', 'Cash at Hospital': '💵' }[m] || '💰'
}
function downloadReceipt(a) {
  const text = `ShiKhar Hospital — Appointment Receipt
========================================
Appointment ID : ${a.id}
Patient        : ${a.patient.name}
Phone          : ${a.patient.phone}
Doctor         : ${a.doctorName} (${a.specialty})
Hospital       : ${a.hospital}
Date & Time    : ${a.date} at ${a.slot}
Payment        : ${a.payMethod} — ${a.paid ? 'PAID' : 'PENDING (Pay at hospital)'}
Amount         : Rs. ${a.fee}
Status         : ${a.status}
Booked On      : ${new Date(a.createdAt).toLocaleString('en-IN')}
========================================
Please arrive 10 minutes early. Thank you!`
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${a.id}-receipt.txt`
  link.click()
  URL.revokeObjectURL(url)
}
