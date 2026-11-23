import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import KNavbar from "./components/navbar";
import Home from "./pages/home";
import { useReducedMotion } from "./useReducedMotion";
import "./App.css";

const Projects = lazy(() => import("./pages/projects"));
const Resume = lazy(() => import("./pages/resume"));
const Contact = lazy(() => import("./pages/contact"));
const ParticleBackground = lazy(() => import("./components/ParticleBackground"));

export default function App() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const reducedMotion = useReducedMotion();

  const [drawing, setDrawing] = useState(() => location.pathname === "/" && !reducedMotion);
  if (drawing && (location.pathname !== "/" || reducedMotion)) {
    setDrawing(false);
  }

  return (
    <div data-theme="dark" className={drawing ? "App intro-drawing" : "App"}>
      {!reducedMotion && (
        <div className="particle-backdrop" data-glisse-backdrop="" aria-hidden="true">
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        </div>
      )}
      <KNavbar reducedMotion={reducedMotion} />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => {
          if (navigationType !== "POP") window.scrollTo({ top: 0, behavior: "instant" });
        }}
      >
        <motion.main
          key={location.pathname}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: reducedMotion ? 0 : 0.16, ease: "easeOut" }}
        >
          <Suspense fallback={<p role="status" className="text-light">Loading page…</p>}>
            <Routes location={location}>
              <Route path="/" element={<Home drawing={drawing} onDrawn={() => setDrawing(false)} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
