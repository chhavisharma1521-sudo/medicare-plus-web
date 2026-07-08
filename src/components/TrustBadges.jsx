const badges = [
  { icon: '🏅', title: 'NABH Accredited', sub: 'Quality certified' },
  { icon: '📜', title: 'ISO 9001:2015', sub: 'Certified care' },
  { icon: '🚑', title: '24×7 Emergency', sub: 'Always open' },
  { icon: '🛡️', title: 'Insurance & TPA', sub: 'Cashless available' },
]

export default function TrustBadges() {
  return (
    <section className="border-y border-slate-100 bg-white dark:border-slate-800 dark:bg-ink-800/50">
      <div className="container-px grid grid-cols-2 gap-4 py-8 lg:grid-cols-4">
        {badges.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-2xl dark:bg-brand-900/40">{b.icon}</span>
            <div>
              <div className="font-bold text-ink-900 dark:text-white">{b.title}</div>
              <div className="text-xs text-slate-500">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
