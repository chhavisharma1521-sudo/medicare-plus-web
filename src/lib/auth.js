// Simple client-side auth stub (localStorage). Replace with real API/JWT later.
const PKEY = 'shikhar_patient'
const AKEY = 'shikhar_admin'

export const getPatient = () => {
  try { return JSON.parse(localStorage.getItem(PKEY) || 'null') } catch { return null }
}
export const setPatient = (p) => localStorage.setItem(PKEY, JSON.stringify(p))
export const logoutPatient = () => localStorage.removeItem(PKEY)

export const isAdmin = () => localStorage.getItem(AKEY) === 'yes'
export const setAdmin = () => localStorage.setItem(AKEY, 'yes')
export const logoutAdmin = () => localStorage.removeItem(AKEY)

// demo admin key
export const ADMIN_KEY = 'shikhar123'
