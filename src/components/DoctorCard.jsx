import { Link } from 'react-router-dom'
import StarRating from './StarRating.jsx'

export default function DoctorCard({ doctor, index = 0 }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft animate-floatUp"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Header with photo */}
      <div className="relative h-40 bg-gradient-to-br from-brand-50 to-brand-100">
        <div className="absolute right-4 top-4">
          <span
            className={`chip ${
              doctor.available
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-200 text-slate-500'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                doctor.available ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
            {doctor.available ? 'Available Today' : 'Booked'}
          </span>
        </div>
        <img
          src={doctor.photo}
          alt={doctor.name}
          loading="lazy"
          className="absolute -bottom-10 left-6 h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-14">
        <h3 className="text-lg font-bold text-ink-900">{doctor.name}</h3>
        <span className="mt-1 w-fit rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
          {doctor.specialtyLabel}
        </span>
        <p className="mt-1 text-xs text-slate-400">{doctor.credentials}</p>

        <div className="mt-3">
          <StarRating rating={doctor.rating} reviews={doctor.reviews} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Experience</div>
            <div className="font-semibold text-ink-900">{doctor.experience} yrs</div>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <div className="text-[11px] uppercase tracking-wide text-slate-400">Consult Fee</div>
            <div className="font-semibold text-ink-900">₹{doctor.fee}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <span>🕐</span> Next slot: <span className="font-semibold text-ink-900">{doctor.nextSlot}</span>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          <Link to={`/book/${doctor.id}`} className="btn-primary flex-1 !py-2.5">
            Book Appointment
          </Link>
          <Link to={`/doctors/${doctor.id}`} className="btn-outline !px-4 !py-2.5">
            Profile
          </Link>
        </div>
      </div>
    </article>
  )
}
