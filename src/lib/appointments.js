// Lightweight client-side appointment store (localStorage) + slot/date availability logic.
// Swap with a real backend API later — the function signatures stay the same.

const KEY = 'shikhar_appointments'
const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Fixed public holidays (MM-DD) — cannot be booked
const HOLIDAYS = ['01-01', '01-26', '08-15', '10-02', '12-25']

export function getAppointments() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export function saveAppointment(appt) {
  const list = getAppointments()
  list.unshift(appt)
  localStorage.setItem(KEY, JSON.stringify(list))
  return appt
}

export function updateAppointment(id, patch) {
  const list = getAppointments().map((a) => (a.id === id ? { ...a, ...patch } : a))
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function cancelAppointment(id) {
  updateAppointment(id, { status: 'Cancelled' })
}

export function generateAppointmentId() {
  const d = new Date()
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}`
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SHK-${stamp}-${rand}`
}

// Deterministic "blocked" dates so the calendar feels real (based on day-of-month)
export function dateStatus(dateStr, doctor) {
  if (!dateStr) return { ok: true }
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (date < today) return { ok: false, reason: 'Past date' }

  const mmdd = dateStr.slice(5)
  if (HOLIDAYS.includes(mmdd)) return { ok: false, reason: 'Holiday' }

  const weekday = DAYS[date.getDay()]
  if (doctor && !doctor.availableDays.includes(weekday)) {
    return { ok: false, reason: 'Doctor Not Available' }
  }

  // Every date whose day-of-month is divisible by 7 is a maintenance/blocked day
  if (date.getDate() % 7 === 0) return { ok: false, reason: 'Blocked' }

  return { ok: true }
}

// Build the next N selectable days with their status
export function buildCalendar(days, doctor) {
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
      status: dateStatus(iso, doctor),
    })
  }
  return out
}
