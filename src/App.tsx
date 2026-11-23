import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
  const reducedMotion = useReducedMotion();

  return (
    <div className="App">
      {!reducedMotion && (
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      )}
      <KNavbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reducedMotion ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          <Suspense fallback={<p role="status" className="text-light">Loading page…</p>}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
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
