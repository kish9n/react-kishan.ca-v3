import Particles from "react-particles";
import { loadBasic } from "tsparticles-basic";
import { loadParticlesLinksInteraction } from "tsparticles-interaction-particles-links";
import type { Engine, ISourceOptions } from "tsparticles-engine";

async function init(engine: Engine) {
  await loadBasic(engine, false);
  await loadParticlesLinksInteraction(engine);
}

const options: ISourceOptions = {
  fpsLimit: 60,
  background: { color: "#000" },
  particles: {
    color: { value: "#fff" },
    number: { value: 80 },
    shape: { type: "circle" },
    size: { value: { min: 0.5, max: 3 } },
    opacity: { value: { min: 0.1, max: 0.8 }, animation: { enable: true, speed: 1 } },
    move: { enable: true, speed: 1, direction: "top", outModes: "out" },
    links: { enable: true, distance: 200, color: "#fff", opacity: 0.45, width: 1 },
  },
};

export default function ParticleBackground() {
  return <Particles id="tsparticles" init={init} options={options} />;
}
