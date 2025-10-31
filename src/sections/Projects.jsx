import Section from '../components/Section.jsx'
const items = [
  { title: 'Reboot — E-commerce tech second-hand', tags: ['React','Firestore','UI'] },
  { title: 'EcoResi — Conciencia ambiental', tags: ['Bootstrap','UX','Landing'] },
  { title: 'Oisho — Habit tracker', tags: ['React','Zustand','UI'] },
]
export default function Projects() {
  return (
    <Section id="proyectos">
      <div>
        <h2 className="font-display text-3xl sm:text-4xl">Proyectos</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(p => (
            <article key={p.title} className="p-5 border border-black/10 hover:shadow-lg transition ">
              <h3 className="font-semibold">{p.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-wide">
                {p.tags.map(t => <span key={t} className="px-2 py-1 border border-black/10">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
