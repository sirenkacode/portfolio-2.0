import Section from '../components/Section'
const roles = [
  { role: 'UI Developer — Freelance', period: '2024–2025', bullets: ['E-commerce React','Sistemas de diseño','Performance'] },
  { role: 'Soporte PT/ES', period: '2019–2023', bullets: ['Atención bilingüe','Procesos y QA','Documentación'] },
]
export default function Experience() {
  return (
    <Section id="experiencia">
      <div>
        <h2 className="font-display text-3xl sm:text-4xl">Experiencia</h2>
        <div className="mt-6 space-y-5">
          {roles.map(r => (
            <div key={r.role} className="p-5 rounded-2xl border border-black/10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{r.role}</h3>
                <span className="text-zinc-600 text-sm">{r.period}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 text-zinc-800">{r.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
