'use client'

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/6281314110863?text=Halo,%20Wardhana%20Flora,%20saya%20ingin%konsultasi%20untuk%20rental%20tanaman"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat via WhatsApp"
    >
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-green-700 text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
        Konsultasi via WhatsApp
      </span>

      {/* Button */}
      <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7"
        >
          <path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.5 2.1 7.9L.4 31.5l7.8-2.1c2.3 1.3 5 2 7.8 2 8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.5 0-4.9-.7-7-2l-.5-.3-4.6 1.2 1.2-4.5-.3-.5c-1.4-2.2-2.1-4.7-2.1-7.3C2.7 8.4 8.4 2.7 16 2.7s13.3 5.7 13.3 13.3S23.6 28.8 16 28.8z"/>
          <path d="M23.2 18.9c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2-.3.3-.6.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6s-.7-1.7-.9-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3s1.2 3.5 1.4 3.8c.2.3 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.2 1.6.2 2.2.1.7-.1 1.8-.7 2-1.3.3-.6.3-1.2.2-1.3-.1-.1-.3-.2-.6-.3z"/>
        </svg>
      </div>
    </a>
  )
}
