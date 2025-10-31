import Section from '../components/section'
const stack = ['React','Vite','Tailwind','Framer Motion','Zustand','Firebase/Firestore','Vercel','Git/GitHub']
export default function Stack() {
  return (
    <Section id="stack">
      <div>
        <h2 className="font-display text-3xl sm:text-4xl">Stack</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {stack.map(s => <li key={s} className="px-3 py-2 border border-black/10">{s}</li>)}
        </ul>
      </div>
    </Section>
  )
}
