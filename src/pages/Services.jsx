import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'

const services = [
  { icon: '🚑', t: 'Emergency & Trauma', d: '24×7 emergency care with rapid response teams.' },
  { icon: '🏥', t: 'OPD Consultation', d: 'Outpatient care across 50+ specialities.' },
  { icon: '🛏️', t: 'Inpatient (IPD)', d: 'Comfortable wards and expert round-the-clock care.' },
  { icon: '🔬', t: 'Diagnostics & Lab', d: 'Advanced pathology, radiology and imaging.' },
  { icon: '💊', t: 'Pharmacy', d: 'In-house pharmacy with home delivery.' },
  { icon: '🩻', t: 'Radiology & Imaging', d: 'MRI, CT, X-Ray, Ultrasound and more.' },
  { icon: '🫀', t: 'Cardiac Sciences', d: 'Angioplasty, bypass and heart care.' },
  { icon: '👶', t: 'IVF & Fertility', d: 'Complete fertility and IVF treatments.', to: '/ivf' },
  { icon: '🧑‍⚕️', t: 'Health Check-ups', d: 'Preventive packages for every age.' },
  { icon: '🏠', t: 'Home Care', d: 'Nursing, physiotherapy and lab tests at home.' },
  { icon: '🧬', t: 'Oncology', d: 'Comprehensive cancer diagnosis & treatment.' },
  { icon: '🦴', t: 'Orthopedics', d: 'Joint replacement and sports injury care.' },
]

export default function Services() {
  return (
    <div className="container-px py-12 dark:text-slate-100">
      <SectionHeading eyebrow="What We Offer" title="Our Services" subtitle="End-to-end healthcare services under one trusted roof." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Wrapper = s.to ? Link : 'div'
          return (
            <Wrapper
              key={s.t}
              {...(s.to ? { to: s.to } : {})}
              className="group flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-ink-800"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-3xl transition group-hover:bg-brand-100 dark:bg-brand-900/40">
                {s.icon}
              </span>
              <div>
                <h3 className="font-bold text-ink-900 dark:text-white">{s.t}</h3>
                <p className="mt-1 text-sm text-slate-500">{s.d}</p>
              </div>
            </Wrapper>
          )
        })}
      </div>
    </div>
  )
}
