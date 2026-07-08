export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href="tel:+919393939393"
        aria-label="Emergency call"
        className="grid h-14 w-14 place-items-center rounded-full bg-red-500 text-2xl text-white shadow-lg transition hover:scale-110 hover:bg-red-600"
        title="Emergency"
      >
        🚑
      </a>
      <a
        href="https://wa.me/919393939393?text=Hi%20ShiKhar%20Hospital%2C%20I%20need%20help"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp chat"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition hover:scale-110"
        title="Chat on WhatsApp"
      >
        💬
      </a>
    </div>
  )
}
