import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setPatient, setAdmin, ADMIN_KEY } from '../lib/auth.js'

function Shell({ title, sub, children }) {
  return (
    <div className="container-px grid place-items-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-ink-800">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-xl text-white">✚</span>
          <h1 className="mt-3 text-2xl font-extrabold text-ink-900 dark:text-white">{title}</h1>
          <p className="text-sm text-slate-500">{sub}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export function PatientLogin() {
  const nav = useNavigate()
  const [f, setF] = useState({ email: '', password: '' })
  return (
    <Shell title="Patient Login" sub="Access your health dashboard">
      <form onSubmit={(e) => { e.preventDefault(); if (f.email) { setPatient({ name: f.email.split('@')[0], email: f.email }); nav('/patient-dashboard') } }}>
        <label className="lbl">Email</label>
        <input className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@email.com" autoComplete="username" />
        <label className="lbl">Password</label>
        <input className="input" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} placeholder="••••••" autoComplete="current-password" />
        <button className="btn-primary mt-5 w-full">Sign In</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        New here? <Link to="/patient-register" className="font-semibold text-brand-600">Register</Link>
      </p>
    </Shell>
  )
}

export function PatientRegister() {
  const nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '' })
  return (
    <Shell title="Patient Register" sub="Create your ShiKhar account">
      <form onSubmit={(e) => { e.preventDefault(); if (f.name && f.email) { setPatient({ name: f.name, email: f.email, phone: f.phone }); nav('/patient-dashboard') } }}>
        <label className="lbl">Full Name</label>
        <input className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" />
        <label className="lbl">Email</label>
        <input className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@email.com" />
        <label className="lbl">Phone</label>
        <input className="input" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="+91 …" />
        <label className="lbl">Password</label>
        <input className="input" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} placeholder="••••••" />
        <button className="btn-primary mt-5 w-full">Create Account</button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account? <Link to="/patient-login" className="font-semibold text-brand-600">Login</Link>
      </p>
    </Shell>
  )
}

export function AdminLogin() {
  const nav = useNavigate()
  const [f, setF] = useState({ user: '', key: '' })
  const [err, setErr] = useState('')
  return (
    <Shell title="Hospital / Admin Login" sub="Staff access only">
      <form onSubmit={(e) => { e.preventDefault(); if (f.key === ADMIN_KEY) { setAdmin(); nav('/admin-dashboard') } else setErr('Invalid admin key') }}>
        <label className="lbl">Username</label>
        <input className="input" value={f.user} onChange={(e) => setF({ ...f, user: e.target.value })} placeholder="admin" />
        <label className="lbl">Admin Key</label>
        <input className="input" type="password" value={f.key} onChange={(e) => setF({ ...f, key: e.target.value })} placeholder="••••••" />
        {err && <p className="mt-2 text-sm text-red-500">{err}</p>}
        <button className="btn-primary mt-5 w-full">Sign In</button>
        <p className="mt-3 text-center text-xs text-slate-400">Demo key: <code>shikhar123</code></p>
      </form>
    </Shell>
  )
}
