import { Link, useParams } from 'react-router-dom'
import { doctors } from '../data/doctors.js'
import StarRating from '../components/StarRating.jsx'

export default function DoctorProfile() {
  const { id } = useParams()
  const doctor = doctors.find((d) => d.id === Number(id))

  if (!doctor) {
    return (
      <div className="container-px grid place-items-center py-32 text-center">
        <p className="text-lg font-semibold">Doctor not found.</p>
        <Link to="/doctors" className="btn-primary mt-4">Back to Doctors</Link>
      </div>
    )
  }

  return (
    <div className="container-px py-10">
      <Link to="/doctors" className="text-sm font-semibold text-brand-600 hover:underline">
        ← Back to all doctors
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Left: details */}
        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
          <div className="h-32 bg-gradient-to-br from-brand-600 to-brand-400" />
          <div className="px-8 pb-8">
            <div className="-mt-14 flex flex-col gap-4 sm:flex-row sm:items-end">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-md"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-ink-900">{doctor.name}</h1>
                  <span
                    className={`chip ${
                      doctor.available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {doctor.available ? 'Available Today' : 'Booked'}
                  </span>
                </div>
                <p className="mt-1 font-semibold text-brand-700">{doctor.specialtyLabel}</p>
                <p className="text-sm text-slate-400">{doctor.credentials}</p>
              </div>
            </div>

            <div className="mt-6"><StarRating rating={doctor.rating} reviews={doctor.reviews} size="lg" /></div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Experience" value={`${doctor.experience} yrs`} />
              <Stat label="Consult Fee" value={`₹${doctor.fee}`} />
              <Stat label="Patients" value={`${doctor.reviews}+`} />
              <Stat label="Rating" value={doctor.rating.toFixed(1)} />
            </div>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-ink-900">About</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{doctor.bio}</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Info title="Hospital" value={doctor.hospital} icon="🏥" />
              <Info title="Languages" value={doctor.languages.join(', ')} icon="💬" />
            </div>
          </div>
        </div>

        {/* Right: booking card */}
        <aside className="h-fit rounded-3xl border border-slate-100 bg-white p-6 shadow-card lg:sticky lg:top-24">
          <div className="rounded-2xl bg-brand-50 p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-brand-700">Next Available</div>
            <div className="mt-1 text-lg font-bold text-ink-900">{doctor.nextSlot}</div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
            <span className="text-sm text-slate-500">Consultation Fee</span>
            <span className="text-xl font-extrabold text-brand-700">₹{doctor.fee}</span>
          </div>
          <Link to={`/book/${doctor.id}`} className="btn-primary mt-4 w-full">
            Book Appointment
          </Link>
          <Link to={`/consult/doc-${doctor.id}`} className="btn-accent mt-2 w-full">🎥 Video Consult Now</Link>
          <a href="tel:+919000000000" className="btn-outline mt-2 w-full">📞 Call to Book</a>
          <p className="mt-3 text-center text-xs text-slate-400">Free cancellation up to 2 hours before</p>
        </aside>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center">
      <div className="text-lg font-extrabold text-ink-900">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  )
}

function Info({ title, value, icon }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 px-4 py-3">
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-xs uppercase tracking-wide text-slate-400">{title}</div>
        <div className="font-semibold text-ink-900">{value}</div>
      </div>
    </div>
  )
}
