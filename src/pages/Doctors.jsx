import { useMemo, useState } from 'react'
import DoctorCard from '../components/DoctorCard.jsx'
import { doctors } from '../data/doctors.js'
import { specialties, hospitals } from '../data/specialties.js'

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'experience', label: 'Most Experienced' },
  { value: 'fee-low', label: 'Fee: Low to High' },
  { value: 'fee-high', label: 'Fee: High to Low' },
]

export default function Doctors() {
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState('all')
  const [hospital, setHospital] = useState('all')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [sort, setSort] = useState('rating')

  const filtered = useMemo(() => {
    let list = doctors.filter((d) => {
      const q = query.trim().toLowerCase()
      const matchQ =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.specialtyLabel.toLowerCase().includes(q)
      const matchSpec = specialty === 'all' || d.specialty === specialty
      const matchHosp = hospital === 'all' || d.hospital === hospital
      const matchAvail = !onlyAvailable || d.available
      return matchQ && matchSpec && matchHosp && matchAvail
    })

    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating
      if (sort === 'experience') return b.experience - a.experience
      if (sort === 'fee-low') return a.fee - b.fee
      if (sort === 'fee-high') return b.fee - a.fee
      return 0
    })
    return list
  }, [query, specialty, hospital, onlyAvailable, sort])

  const resetFilters = () => {
    setQuery('')
    setSpecialty('all')
    setHospital('all')
    setOnlyAvailable(false)
    setSort('rating')
  }

  return (
    <div>
      {/* Page hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-500 py-14 text-white">
        <div className="container-px text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Find Your Doctor</h1>
          <p className="mx-auto mt-3 max-w-xl text-brand-50">
            Book appointments with our experienced specialists. Search, filter and compare — all in
            one place.
          </p>
          <div className="mx-auto mt-6 flex max-w-xl items-center rounded-2xl bg-white p-1.5 shadow-soft">
            <span className="px-3 text-slate-400">🔍</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by doctor name or specialisation…"
              className="h-11 flex-1 bg-transparent text-ink-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </section>

      <section className="container-px py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters sidebar */}
          <aside className="h-fit rounded-3xl border border-slate-100 bg-white p-6 shadow-card lg:sticky lg:top-24">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink-900">Filters</h3>
              <button onClick={resetFilters} className="text-xs font-semibold text-brand-600 hover:underline">
                Reset
              </button>
            </div>

            <Field label="Speciality">
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="select">
                <option value="all">All Specialities</option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Hospital">
              <select value={hospital} onChange={(e) => setHospital(e.target.value)} className="select">
                <option value="all">All Hospitals</option>
                {hospitals.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </Field>

            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
                className="h-4 w-4 accent-brand-600"
              />
              <span className="text-sm font-medium text-ink-900">Available today only</span>
            </label>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                <span className="font-bold text-ink-900">{filtered.length}</span> doctor
                {filtered.length !== 1 && 's'} found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="select !w-auto">
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="grid place-items-center rounded-3xl border border-dashed border-slate-200 py-24 text-center">
                <div className="text-5xl">🔍</div>
                <p className="mt-4 font-semibold text-ink-900">No doctors match your search</p>
                <button onClick={resetFilters} className="btn-outline mt-4">Clear filters</button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((d, i) => (
                  <DoctorCard key={d.id} doctor={d} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="mt-4">
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </label>
      {children}
    </div>
  )
}
