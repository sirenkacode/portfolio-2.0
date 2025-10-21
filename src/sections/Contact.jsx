import Section from '../components/section'
export default function Contact() {
  return (
    <Section id="contacto">
      <div>
        <h2 className="font-display text-3xl sm:text-4xl">Contacto</h2>
        <p className="mt-4 text-zinc-800">
          Decime hola en <a href="mailto:tu-mail@ejemplo.com" className="underline decoration-black/30 underline-offset-4">tu-mail@ejemplo.com</a>
        </p>
        <div className="mt-6 flex gap-4 text-sm">
          <a className="underline decoration-black/20" href="#">LinkedIn</a>
          <a className="underline decoration-black/20" href="#">GitHub</a>
          <a className="underline decoration-black/20" href="#">Behance</a>
        </div>
      </div>
    </Section>
  )
}
