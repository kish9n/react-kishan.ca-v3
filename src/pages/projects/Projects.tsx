import { type CSSProperties, useRef, useState } from "react";
import { Button } from "glisse";
import { Container } from "react-bootstrap";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "react-bootstrap-icons";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import { GlassLink } from "../../components/GlassLink";
import ambientSpotify from "../../img/ambientspotify.PNG?url";
import simpleStats from "../../img/simplestats.PNG?url";
import peoplePlanner from "../../img/peopleplanner.PNG?url";
import miniSpotify from "../../img/minimalminispotify.PNG?url";
import { useReducedMotion } from "../../useReducedMotion";

const projects = [
  {
    name: "Ambient Spotify",
    image: ambientSpotify,
    alt: "Ambient Spotify playing Starboy with the album cover filling the screen",
    description: "A now-playing screen that samples album artwork with node-vibrant to set the accent color for each track.",
    url: "https://github.com/kish9n/ambient-spotify-static",
    action: "View source",
  },
  {
    name: "Simple Stats V2",
    image: simpleStats,
    alt: "Simple Stats dashboard displaying hardware readings and graphs",
    description: "An Electron dashboard that charts CPU and GPU clock speeds alongside temperatures, power draw, and memory usage.",
    url: "https://github.com/kish9n/SimpleStats",
    action: "View source",
  },
  {
    name: "People Planner",
    image: peoplePlanner,
    alt: "People Planner group scheduling interface",
    description: "A group scheduling tool built with React and FullCalendar to help people find a time they can meet. The hosted demo is retired.",
    url: peoplePlanner,
    action: "View screenshot",
  },
  {
    name: "Minimal Mini Spotify",
    image: miniSpotify,
    alt: "Minimal Mini Spotify's compact now-playing window",
    description: "A compact player for a second screen. A frameless Electron window shows playback information from the Spotify API.",
    url: "https://github.com/kish9n/minimal-mini-spotify",
    action: "View source",
  },
];

export function Projects() {
  const reducedMotion = useReducedMotion();
  const swiper = useRef<SwiperInstance | null>(null);
  const [index, setIndex] = useState(0);
  const slideDuration = reducedMotion ? 0 : 420;

  function detailPosition(i: number) {
    if (i === index) return "current";
    if (i === (index + 1) % projects.length) return "after";
    if (index === 0 && i === projects.length - 1) return "before";
    return i < index ? "before" : "after";
  }

  return (
    <Container className="App-header portfolio-page projects-page">
      <header className="page-heading">
        <h1>Projects</h1>
        <p>More work on <a href="https://github.com/kish9n">GitHub</a></p>
      </header>
      <section className="project-showcase section-enter" aria-label="Featured projects"
        style={{ "--project-slide-duration": `${slideDuration}ms` } as CSSProperties}>
        <Swiper
          className="project-carousel"
          modules={[A11y]}
          onSwiper={instance => { swiper.current = instance; }}
          onRealIndexChange={slider => setIndex(slider.realIndex)}
          speed={slideDuration}
          loop
          spaceBetween={16}
          a11y={{ wrapperLiveRegion: false }}
        >
          {projects.map(({ name, image, alt }, i) => (
            <SwiperSlide key={name} aria-hidden={i !== index}>
              <img src={image} alt={alt} className="project-image" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="project-panel">
          <span className="visually-hidden" role="status">{projects[index].name}</span>
          <div className="project-details-stack">
            {projects.map(({ name, description, action, url }, i) => (
              <div key={name} className="project-details" aria-hidden={i !== index}
                data-position={detailPosition(i)}>
                <h2>{name}</h2>
                <p>{description}</p>
                <GlassLink href={url} aria-label={`${action} for ${name}`} tabIndex={i === index ? 0 : -1}>
                  {action} <ArrowUpRight aria-hidden="true" size={14} />
                </GlassLink>
              </div>
            ))}
          </div>
          <div className="project-controls" role="group" aria-label="Choose a project">
            <Button icon={<ArrowLeft />} aria-label="Previous project"
              onClick={() => swiper.current?.slidePrev()} />
            <div className="project-dots">
              {projects.map(({ name }, i) => (
                <button type="button" key={name} aria-label={`Show ${name}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => swiper.current?.slideToLoop(i)} />
              ))}
            </div>
            <Button icon={<ArrowRight />} aria-label="Next project"
              onClick={() => swiper.current?.slideNext()} />
          </div>
        </div>
      </section>
    </Container>
  );
}
