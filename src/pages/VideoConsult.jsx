import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function VideoConsult() {
  const { room } = useParams()
  const containerRef = useRef(null)
  const apiRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | live | error
  const roomName = `ShiKharHospital-${room || 'lobby'}`

  useEffect(() => {
    let script
    const start = () => {
      if (!window.JitsiMeetExternalAPI || !containerRef.current) {
        setStatus('error')
        return
      }
      try {
        apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          configOverwrite: { prejoinPageEnabled: true, disableDeepLinking: true },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            MOBILE_APP_PROMO: false,
          },
        })
        setStatus('live')
      } catch {
        setStatus('error')
      }
    }

    if (window.JitsiMeetExternalAPI) {
      start()
    } else {
      script = document.createElement('script')
      script.src = 'https://meet.jit.si/external_api.js'
      script.async = true
      script.onload = start
      script.onerror = () => setStatus('error')
      document.body.appendChild(script)
    }
    return () => {
      try { apiRef.current && apiRef.current.dispose() } catch {}
    }
  }, [roomName])

  return (
    <div className="dark:text-slate-100">
      <section className="bg-gradient-to-r from-brand-700 to-emerald-500 py-6 text-white">
        <div className="container-px flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold">🎥 Video Consultation</h1>
            <p className="text-sm text-white/80">Room: {roomName}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="btn !border-2 !border-white/30 !py-2 text-white hover:!bg-white/10"
            >
              🔗 Copy Invite Link
            </button>
            <Link to="/" className="btn bg-white !py-2 text-brand-700">Leave</Link>
          </div>
        </div>
      </section>

      <div className="container-px py-4">
        <div className="rounded-2xl bg-amber-50 p-3 text-center text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          ℹ️ Share the <b>invite link</b> with the doctor/patient so both join the <b>same room</b>. Allow camera &amp; microphone when asked.
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-card dark:border-slate-700">
          <div ref={containerRef} style={{ height: '72vh', width: '100%' }} />
          {status === 'loading' && (
            <div className="grid place-items-center py-20 text-white">
              <div className="animate-pulse text-lg">Connecting to secure video room…</div>
            </div>
          )}
          {status === 'error' && (
            <div className="grid place-items-center gap-3 py-20 text-center text-white">
              <p>Could not load the video service.</p>
              <a href={`https://meet.jit.si/${roomName}`} target="_blank" rel="noreferrer" className="btn-accent">
                Open Video Call in New Tab
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
