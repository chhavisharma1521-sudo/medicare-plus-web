import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating.jsx'

export default function DoctorCard({ doctor, index = 0 }) {
  const navigate = useNavigate()

  return (
    <article
      onClick={() => navigate(`/doctors/${doctor.id}`)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft dark:border-slate-800 dark:bg-ink-800 animate-floatUp"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative h-40 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/40 dark:to-brand-800/20">
        <span
          className={`chip absolute right-4 top-4 ${
            doctor.available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${doctor.available ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          {doctor.available ? 'Available Today' : 'Booked'}
        </span>
        <img
          src={doctor.photo}
          alt={doctor.name}
          loading="lazy"
          className="absolute -bottom-10 left-6 h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md transition-transform duration-300 group-hover:scale-105 dark:border-ink-800"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white">{doctor.name}</h3>
        <span className="mt-1 w-fit rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          {doctor.specialtyLabel}
        </span>
        <p className="mt-1 text-xs text-slate-400">{doctor.qualification}</p>

        <div className="mt-3"><StarRating rating={doctor.rating} reviews={doctor.reviews} /></div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Mini label="Experience" value={`${doctor.experience} yrs`} />
          <Mini label="Consult Fee" value={`₹${doctor.fee}`} />
        </div>

        <div className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
          <div>🗣️ <span className="font-medium text-ink-800 dark:text-slate-200">{doctor.languages.join(', ')}</span></div>
          <div>📆 Available: <span className="font-medium text-ink-800 dark:text-slate-200">{doctor.availableDays.join(', ')}</span></div>
          <div className="flex flex-wrap gap-1 pt-1">
            <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">☀️ {doctor.morningSlots[0]}–{doctor.morningSlots[doctor.morningSlots.length - 1]}</span>
            <span className="rounded bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">🌆 {doctor.eveningSlots[0]}–{doctor.eveningSlots[doctor.eveningSlots.length - 1]}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => navigate(`/book/${doctor.id}`)} className="btn-primary flex-1 !py-2.5">
            Book Appointment
          </button>
          <button onClick={() => navigate(`/doctors/${doctor.id}`)} className="btn-outline !px-4 !py-2.5">
            Profile
          </button>
        </div>
      </div>
    </article>
  )
}

function Mini({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800">
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
      <div className="font-semibold text-ink-900 dark:text-white">{value}</div>
    </div>
  )
}
