// Real auth backed by the hospital API (register/login/admin-login).
import { API_BASE } from './appointments.js'

const PKEY = 'shikhar_patient'
const AKEY = 'shikhar_admin_token'

// ── Local state ──
export const getPatient = () => {
  try { return JSON.parse(localStorage.getItem(PKEY) || 'null') } catch { return null }
}
export const setPatient = (p) => localStorage.setItem(PKEY, JSON.stringify(p))
export const logoutPatient = () => localStorage.removeItem(PKEY)

export const isAdmin = () => !!localStorage.getItem(AKEY)
export const setAdminToken = (t) => localStorage.setItem(AKEY, t)
export const logoutAdmin = () => localStorage.removeItem(AKEY)

// ── API calls ──
async function post(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || 'Request failed')
  return data
}

export async function apiRegister({ name, email, phone, password }) {
  const d = await post('/api/auth/register', { name, email, phone, password })
  setPatient({ name: d.name, email: d.email, token: d.token })
  return d
}

export async function apiLogin({ email, password }) {
  const d = await post('/api/auth/login', { email, password })
  setPatient({ name: d.name, email: d.email, token: d.token })
  return d
}

export async function apiAdminLogin({ username, password }) {
  const d = await post('/api/auth/admin-login', { username, password })
  setAdminToken(d.token)
  return d
}
