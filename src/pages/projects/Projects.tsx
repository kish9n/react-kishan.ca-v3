import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ambientSpotify from "../../img/ambientspotify.PNG?url";
import simpleStats from "../../img/simplestats.PNG?url";
import peoplePlanner from "../../img/peopleplanner.PNG?url";
import miniSpotify from "../../img/minimalminispotify.PNG?url";
import { useReducedMotion } from "../../useReducedMotion";

const projects = [
  {
    name: "Ambient Spotify",
    image: ambientSpotify,
    description: "A now-playing screen that samples album artwork with node-vibrant to set the accent color for each track.",
    url: "https://github.com/kish9n/ambient-spotify-static",
    action: "View source",
  },
  {
    name: "Simple Stats V2",
    image: simpleStats,
    description: "An Electron dashboard that charts CPU and GPU clock speeds alongside temperatures, power draw, and memory usage.",
    url: "https://github.com/kish9n/SimpleStats",
    action: "View source",
  },
  {
    name: "People Planner",
    image: peoplePlanner,
    description: "A group scheduling tool built with React and FullCalendar to help people find a time they can meet. The hosted demo is retired.",
    url: peoplePlanner,
    action: "View screenshot",
  },
  {
    name: "Minimal Mini Spotify",
    image: miniSpotify,
    description: "A compact player for a second screen. A frameless Electron window shows playback information from the Spotify API.",
    url: "https://github.com/kish9n/minimal-mini-spotify",
    action: "View source",
  },
];

export function Projects() {
  const reducedMotion = useReducedMotion();

  return (
    <Container className="App-header title-pad-1">
      <h1>Projects</h1>
      <p>More work on <a href="https://github.com/kish9n">GitHub</a></p>
      <Swiper
        aria-label="Featured projects"
        modules={[A11y, Navigation, Pagination, Scrollbar]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="project-carousel"
        role="region"
        navigation={{ prevEl: ".project-prev", nextEl: ".project-next" }}
        a11y={{ prevSlideMessage: "Previous project", nextSlideMessage: "Next project" }}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 } }}
        spaceBetween={20}
        speed={reducedMotion ? 0 : 300}
        watchSlidesProgress
      >
        {projects.map(({ name, image, description, url, action }) => (
          <SwiperSlide key={name}>
            {({ isVisible }) => (
              <article className="project-card">
                <img src={image} alt="" className="project-image" />
                <div className="project-text">
                  <h2 className="project-title">{name}</h2>
                  <p>{description}</p>
                  <a href={url} aria-label={`${action} for ${name}`} tabIndex={isVisible ? 0 : -1}>
                    {action}
                  </a>
                </div>
              </article>
            )}
          </SwiperSlide>
        ))}
        <div slot="container-end" className="project-controls">
          <button type="button" className="btn project-prev">Previous project</button>
          <button type="button" className="btn project-next">Next project</button>
        </div>
      </Swiper>
    </Container>
  );
}
