import SectionHeading from './SectionHeading.jsx'

const reviews = [
  { name: 'Ananya Verma', city: 'Delhi', text: 'The doctors were incredibly caring and the online booking made everything so easy. Best hospital experience I have had.', avatar: '👩' },
  { name: 'Rakesh Kumar', city: 'Noida', text: 'Booked a video consultation within minutes and got expert advice from home. Highly professional and quick service.', avatar: '👨' },
  { name: 'Sana Sheikh', city: 'Ghaziabad', text: 'The IVF team supported us through our entire journey with so much warmth. We are finally parents. Forever grateful!', avatar: '🧕' },
  { name: 'Mohit Aggarwal', city: 'Gurgaon', text: 'Clean facilities, no waiting, transparent billing. This is how a modern hospital should be run.', avatar: '🧑' },
]

export default function Testimonials() {
  return (
    <section className="container-px py-16">
      <SectionHeading eyebrow="Patient Stories" title="What Our Patients Say" subtitle="Real experiences from people we've cared for." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r) => (
          <figure key={r.name} className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-ink-800">
            <div className="text-accent-500">★★★★★</div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">"{r.text}"</blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-xl dark:bg-brand-900/40">{r.avatar}</span>
              <div>
                <div className="text-sm font-bold text-ink-900 dark:text-white">{r.name}</div>
                <div className="text-xs text-slate-400">{r.city}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
