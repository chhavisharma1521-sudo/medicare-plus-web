import { useEffect, useRef, useState } from 'react'

const CHAT_API = 'https://medical-chatbot-production-e9fc.up.railway.app/chat'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm ShiKhar AI Assistant 🤖 Ask me anything about symptoms, medicines, or general health." },
  ])
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, open])

  const send = async () => {
    const text = input.trim()
    if (!text || busy) return
    const history = messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')
    setBusy(true)
    try {
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply || 'Sorry, I could not respond right now.' }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: '⚠️ Unable to reach the AI service. Please try again.' }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Launcher (bottom-left, away from WhatsApp/emergency) */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-white shadow-lg transition hover:scale-105 hover:bg-brand-700"
        aria-label="Ask AI"
      >
        <span className="text-xl">🤖</span>
        <span className="hidden text-sm font-semibold sm:inline">Ask AI Doctor</span>
      </button>

      {open && (
        <div className="fixed bottom-24 left-5 z-40 flex h-[460px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-ink-800">
          <div className="flex items-center justify-between bg-gradient-to-r from-brand-700 to-brand-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <div className="text-sm font-bold">ShiKhar AI Assistant</div>
                <div className="text-[11px] text-white/80">Powered by MedBot</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-lg">✕</button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3 dark:bg-ink-900">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                  m.role === 'user'
                    ? 'bg-brand-600 text-white'
                    : 'border border-slate-200 bg-white text-ink-900 dark:border-slate-700 dark:bg-ink-800 dark:text-slate-100'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy && <div className="text-xs text-slate-400">MedBot is typing…</div>}
            <div ref={endRef} />
          </div>

          <div className="flex gap-2 border-t border-slate-100 p-2 dark:border-slate-700">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask a health question…"
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <button onClick={send} disabled={busy} className="btn-primary !px-4 !py-2 disabled:opacity-60">➤</button>
          </div>
          <p className="bg-white px-3 pb-2 text-center text-[10px] text-slate-400 dark:bg-ink-800">Not a substitute for professional medical advice.</p>
        </div>
      )}
    </>
  )
}
