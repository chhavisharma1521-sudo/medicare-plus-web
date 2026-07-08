// Real backend API (FastAPI + SQLite on Railway) — appointments persist across devices.
export const API_BASE =
  import.meta.env.VITE_API_URL || 'https://api-production-1b54e.up.railway.app'

const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOLIDAYS = ['01-01', '01-26', '08-15', '10-02', '12-25']

// ── API calls ─────────────────────────────────────────
export async function apiCreateAppointment(record) {
  const payload = {
    doctorId: record.doctorId,
    doctorName: record.doctorName,
    specialty: record.specialty,
    hospital: record.hospital,
    date: record.date,
    slot: record.slot,
    fee: record.fee,
    payMethod: record.payMethod,
    paid: !!record.paid,
    status: record.status,
    patientName: record.patient.name,
    patientPhone: record.patient.phone || '',
    patientEmail: record.patient.email || '',
    reason: record.patient.reason || '',
  }
  const res = await fetch(`${API_BASE}/api/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Booking failed')
  return res.json()
}

export async function apiGetAppointments({ phone = '', email = '' } = {}) {
  const q = phone || email ? `?phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}` : ''
  const res = await fetch(`${API_BASE}/api/appointments${q}`)
  if (!res.ok) return []
  return res.json()
}

export async function apiPatchAppointment(id, patch) {
  const res = await fetch(`${API_BASE}/api/appointments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  })
  return res.ok ? res.json() : null
}

export const apiCancel = (id) => apiPatchAppointment(id, { status: 'Cancelled' })
export const apiConfirmPay = (id) => apiPatchAppointment(id, { paid: true })

// Extra doctors (admin-added, persisted)
export async function apiGetExtraDoctors() {
  const res = await fetch(`${API_BASE}/api/extra-doctors`)
  return res.ok ? res.json() : []
}
export async function apiAddDoctor(d) {
  const res = await fetch(`${API_BASE}/api/extra-doctors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(d),
  })
  return res.ok ? res.json() : null
}
export async function apiDeleteDoctor(id) {
  await fetch(`${API_BASE}/api/extra-doctors/${id}`, { method: 'DELETE' })
}

// Blocked dates (admin manages, booking respects)
export async function apiGetBlockedDates(doctorId = 0) {
  const res = await fetch(`${API_BASE}/api/blocked-dates?doctorId=${doctorId}`)
  return res.ok ? res.json() : []
}
export async function apiAddBlockedDate(b) {
  const res = await fetch(`${API_BASE}/api/blocked-dates`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b),
  })
  return res.ok ? res.json() : null
}
export async function apiDeleteBlockedDate(id) {
  await fetch(`${API_BASE}/api/blocked-dates/${id}`, { method: 'DELETE' })
}

// Notifications
export async function apiGetNotifications() {
  const res = await fetch(`${API_BASE}/api/notifications`)
  return res.ok ? res.json() : []
}
export async function apiAddNotification(n) {
  const res = await fetch(`${API_BASE}/api/notifications`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(n),
  })
  return res.ok ? res.json() : null
}
export async function apiDeleteNotification(id) {
  await fetch(`${API_BASE}/api/notifications/${id}`, { method: 'DELETE' })
}

// ── Calendar / blocked-date logic (client-side, deterministic) ──
export function dateStatus(dateStr, doctor, apiBlocked = {}) {
  if (!dateStr) return { ok: true }
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (date < today) return { ok: false, reason: 'Past date' }
  if (apiBlocked[dateStr]) return { ok: false, reason: apiBlocked[dateStr] } // admin-blocked
  if (HOLIDAYS.includes(dateStr.slice(5))) return { ok: false, reason: 'Holiday' }
  const weekday = DAYS[date.getDay()]
  if (doctor && !doctor.availableDays.includes(weekday)) return { ok: false, reason: 'Doctor Not Available' }
  if (date.getDate() % 7 === 0) return { ok: false, reason: 'Blocked' }
  return { ok: true }
}

// apiBlockedList: array of {date, reason} from the backend
export function buildCalendar(days, doctor, apiBlockedList = []) {
  const apiBlocked = {}
  apiBlockedList.forEach((b) => { apiBlocked[b.date] = b.reason || 'Blocked' })
  const out = []
  const start = new Date()
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const iso = d.toISOString().slice(0, 10)
    out.push({
      iso,
      label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      weekday: DAY_ABBR[d.getDay()],
      status: dateStatus(iso, doctor, apiBlocked),
    })
  }
  return out
}

export function generateAppointmentId() {
  const d = new Date()
  return `SHK-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`
}
