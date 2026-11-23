import Particles from "react-particles";
import { loadBasic } from "tsparticles-basic";
import type { ISourceOptions } from "tsparticles-engine";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  background: { color: "#000" },
  particles: {
    color: { value: "#fff" },
    number: { value: 160 },
    shape: { type: "circle" },
    size: { value: { min: 0.5, max: 3 } },
    opacity: { value: { min: 0.1, max: 0.8 }, animation: { enable: true, speed: 1 } },
    move: { enable: true, speed: 1, direction: "top", outModes: "out" },
  },
  responsive: [
    { maxWidth: 768, options: { particles: { number: { value: 110 } } } },
  ],
};

export default function ParticleBackground() {
  return <Particles id="tsparticles" init={loadBasic} options={options} />;
}
