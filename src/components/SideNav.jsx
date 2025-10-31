// src/components/SideNav.jsx
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "info",        label: "info" },
  { id: "licencias",   label: "licencias" },
  { id: "proyectos",   label: "proyectos" },
  { id: "stack",       label: "stack" },
  { id: "experiencia", label: "experiencia" },
  { id: "contacto",    label: "contacto" },
];

export default function SideNav() {
  const [active, setActive] = useState("info");
  const [open, setOpen] = useState(false);

  const go = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setOpen(false);
  }, []);

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]?.target?.id) setActive(vis[0].target.id);
      },
      { threshold: [0.4, 0.6, 0.8] }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock scroll cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // ===== DESKTOP (te gustó así): minimal, sin sombras =====
  return (
    <>
      <aside className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <nav aria-label="Secciones" className="flex flex-col items-end gap-2">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={`uppercase tracking-wide text-xs px-2 py-1 transition 
                  border-b ${isActive ? "border-black" : "border-transparent hover:border-black/30"}
                  bg-transparent text-black`}
                aria-current={isActive ? "true" : "false"}
              >
                {s.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ===== MOBILE: FAB hamburguesa + bottom-sheet vertical ===== */}
      {/* Botón hamburguesa (FAB) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 rounded-full border border-black/15 bg-white p-3"
        aria-label="Abrir navegación"
        aria-expanded={open}
        aria-controls="mobile-sheet"
      >
        {/* ícono hamburguesa minimal */}
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/* Overlay + Drawer desde ABAJO (lista VERTICAL) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay clickeable */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden fixed inset-0 z-40 bg-black"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <motion.nav
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-white border-t border-black/10 rounded-t-2xl p-4"
              role="dialog"
              aria-modal="true"
              id="mobile-sheet"
            >
              {/* tirador */}
              <div className="flex justify-center pb-2">
                <div className="h-1.5 w-12 rounded-full bg-black/15" />
              </div>

              {/* LISTA VERTICAL (no horizontal) */}
              <ul className="flex flex-col gap-2">
                {SECTIONS.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => go(s.id)}
                        className={`w-full text-left uppercase tracking-wide text-sm px-3 py-2 border 
                          ${isActive ? "bg-black text-white border-black" : "bg-black/5 hover:bg-black/10 border-black/10 text-black"}`}
                        aria-current={isActive ? "true" : "false"}
                      >
                        {s.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* cerrar */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="text-xs uppercase tracking-wide underline underline-offset-4"
                >
                  cerrar
                </button>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
