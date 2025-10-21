// src/components/SideNav.jsx
import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SECTIONS = [
  { id: 'info',        label: 'info' },
  { id: 'licencias',   label: 'licencias' },
  { id: 'proyectos',   label: 'proyectos' },
  { id: 'stack',       label: 'stack' },
  { id: 'experiencia', label: 'experiencia' },
  { id: 'contacto',    label: 'contacto' },
]

export default function SideNav() {
  const [active, setActive] = useState('info')
  const [open, setOpen] = useState(false)

  // Marca la sección activa al hacer scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.6 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  // Navegar a una sección y cerrar el menú móvil
  const go = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }, [])

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Evitar scroll del fondo cuando el menú móvil está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }, [open])

  return (
    <>
      {/* Rail vertical (solo ≥ md) */}
      <aside className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <nav aria-label="Secciones" className="flex flex-col items-end gap-3">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className={
                'text-right uppercase tracking-wide text-xs md:text-sm transition ' +
                (active === s.id ? 'font-extrabold text-black' : 'text-zinc-500 hover:text-black')
              }
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Botón hamburguesa (solo < md) */}
      <button
        type="button"
        aria-label="Abrir menú"
        aria-controls="mobile-menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-5 right-5 z-40 grid place-items-center w-12 h-12 rounded-full border border-black/10 bg-white/90 backdrop-blur shadow-lg"
      >
        {/* Ícono hamburguesa */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Menú móvil: overlay + bottom sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="md:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Fondo oscuro clickable para cerrar */}
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

            {/* Sheet inferior */}
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 pb-8 shadow-2xl"
              style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm uppercase tracking-wider">Navegación</h2>
                <button
                  className="p-2 -m-2"
                  aria-label="Cerrar menú"
                  onClick={() => setOpen(false)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <ul className="mt-4 divide-y divide-black/10">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => go(s.id)}
                      className={
                        'w-full text-left py-4 text-lg tracking-wide capitalize ' +
                        (active === s.id ? 'font-extrabold' : 'font-normal')
                      }
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
