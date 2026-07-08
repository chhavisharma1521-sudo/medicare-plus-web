import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDoctor } from '../data/doctors.js'

export default function VideoConsult() {
  const { room } = useParams()
  const roomName = `ShiKharHospital-${room || 'lobby'}`

  // Figure out who we're consulting (room like "doc-1" or "appt-SHK-...")
  const docMatch = /^doc-(\d+)$/.exec(room || '')
  const doctor = docMatch ? getDoctor(docMatch[1]) : null

  const [joined, setJoined] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | live | error
  const containerRef = useRef(null)
  const apiRef = useRef(null)

  useEffect(() => {
    if (!joined) return
    setStatus('loading')
    let script
    const start = () => {
      if (!window.JitsiMeetExternalAPI || !containerRef.current) { setStatus('error'); return }
      try {
        apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          configOverwrite: { prejoinPageEnabled: false, disableDeepLinking: true, startWithAudioMuted: false },
          interfaceConfigOverwrite: { SHOW_JITSI_WATERMARK: false, MOBILE_APP_PROMO: false },
        })
        setStatus('live')
      } catch { setStatus('error') }
    }
    if (window.JitsiMeetExternalAPI) start()
    else {
      script = document.createElement('script')
      script.src = 'https://meet.jit.si/external_api.js'
      script.async = true
      script.onload = start
      script.onerror = () => setStatus('error')
      document.body.appendChild(script)
    }
    return () => { try { apiRef.current && apiRef.current.dispose() } catch {} }
  }, [joined, roomName])

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
  }

  /* ── Pre-call lobby ── */
  if (!joined) {
    return (
      <div className="dark:text-slate-100">
        <section className="bg-gradient-to-br from-brand-800 via-brand-600 to-emerald-500 py-14 text-white">
          <div className="container-px text-center">
            <span className="chip bg-white/15 text-white">🎥 Online Video Consultation</span>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Ready to Connect</h1>
            <p className="mt-2 text-white/85">Secure, private video consultation from the comfort of your home.</p>
          </div>
        </section>

        <div className="container-px py-10">
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_320px]">
            {/* main lobby card */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card dark:border-slate-800 dark:bg-ink-800">
              {doctor ? (
                <div className="flex items-center gap-4">
                  <img src={doctor.photo} alt={doctor.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <div className="text-lg font-extrabold text-ink-900 dark:text-white">{doctor.name}</div>
                    <div className="text-sm font-semibold text-brand-700 dark:text-brand-300">{doctor.specialtyLabel}</div>
                    <div className="text-xs text-slate-400">{doctor.qualification} · {doctor.experience} yrs</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-3xl dark:bg-brand-900/40">🩺</span>
                  <div>
                    <div className="text-lg font-extrabold text-ink-900 dark:text-white">Your Consultation</div>
                    <div className="text-sm text-slate-500">Room: <span className="font-mono">{room}</span></div>
                  </div>
                </div>
              )}

              <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                <h3 className="font-bold text-ink-900 dark:text-white">Before you join</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {[
                    'Allow camera & microphone access when prompted',
                    'Use a stable Wi-Fi or 4G/5G connection',
                    'Sit in a quiet, well-lit room',
                    'Keep your reports / prescriptions handy',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2"><span className="text-brand-600">✓</span> {t}</li>
                  ))}
                </ul>
              </div>

              <button onClick={() => setJoined(true)} className="btn-primary mt-6 w-full !py-3.5 text-base">
                🎥 Start Video Consultation
              </button>
              <button onClick={copyLink} className="btn-outline mt-2 w-full">🔗 Copy Invite Link (for doctor/patient)</button>
            </div>

            {/* side info */}
            <aside className="h-fit space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-ink-800">
                <h3 className="font-bold text-ink-900 dark:text-white">How it works</h3>
                <ol className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {['Share the invite link with the other person', 'Both click "Start Video Consultation"', 'You both enter the same private room', 'Talk face-to-face securely'].map((t, i) => (
                    <li key={t} className="flex gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
                      {t}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-200">
                🔒 End-to-end encrypted &amp; private. No recording without consent.
              </div>
              <Link to="/" className="btn-ghost w-full dark:text-slate-200">← Back to Home</Link>
            </aside>
          </div>
        </div>
      </div>
    )
  }

  /* ── In-call ── */
  return (
    <div className="dark:text-slate-100">
      <section className="bg-ink-900 py-4 text-white dark:bg-black">
        <div className="container-px flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {doctor && <img src={doctor.photo} alt="" className="h-10 w-10 rounded-lg object-cover" />}
            <div>
              <div className="font-bold">{doctor ? doctor.name : 'Video Consultation'}</div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Live
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={copyLink} className="btn !border !border-white/20 !py-2 text-sm text-white hover:!bg-white/10">🔗 Invite</button>
            <Link to="/" className="btn bg-red-500 !py-2 text-sm text-white hover:bg-red-600" onClick={() => { try { apiRef.current?.dispose() } catch {} }}>Leave Call</Link>
          </div>
        </div>
      </section>

      <div className="bg-black">
        <div className="container-px py-4">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-black">
            <div ref={containerRef} style={{ height: '74vh', width: '100%' }} />
          </div>
          {status === 'loading' && <div className="py-10 text-center text-white/80 animate-pulse">Connecting to secure room…</div>}
          {status === 'error' && (
            <div className="grid place-items-center gap-3 py-10 text-center text-white">
              <p>Could not load the video service.</p>
              <a href={`https://meet.jit.si/${roomName}`} target="_blank" rel="noreferrer" className="btn-accent">Open in New Tab</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
