import SideNav from "./components/SideNav";
import Info from "./sections/Info";
import Licenses from "./sections/Licenses";
import Projects from "./sections/Projects";
import Stack from "./sections/Stack";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import ParticlesBg from "./components/ParticlesBg";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden text-black bg-white">

      <ParticlesBg />

   
      <SideNav />
      <main className="relative z-10 h-screen overflow-y-scroll no-scrollbar snap-y md:snap-mandatory">
        <Info />
        <Licenses />
        <Projects />
        <Stack />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
