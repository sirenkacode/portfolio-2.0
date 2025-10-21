import { useEffect } from "react";
import config from "../particles.json";

export default function ParticlesBg() {
  useEffect(() => {
    const boot = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-bg", config);
      } else {
        setTimeout(boot, 50);
      }
    };
    boot();
  }, []);

  return (
    <div
      id="particles-bg"
      className="absolute inset-0"
      style={{
        background: "transparent",
        zIndex: 1 
      }}
    ></div>
  );
}
