import { Container } from "react-bootstrap";
import { FileEarmarkText } from "react-bootstrap-icons";
import { GlassLink } from "../../components/GlassLink";

const experience = [
  {
    role: "Full Stack Developer",
    company: "BridgeNext",
    url: "https://www.bridgenext.com/",
    dates: "October 2023 – Present",
    description: "Tasked as a Fullstack Developer adept at bolstering functionality and efficiency. Proficient in ReactJS and NextJS for frontend and NodeJS with PostgreSQL for backend development, with a focus on bug resolution, feature enhancements, and seamless deployment. Skilled in client interaction to align software improvements with business objectives.",
  },
  {
    role: "Software Engineer Consultant",
    company: "KPMG Canada",
    url: "https://home.kpmg/ca",
    dates: "May 2022 – June 2023",
    description: "Involved in designing, developing, and testing programs and solutions for clients. Worked on a variety of projects, including architecture migration, application development, and data analytics.",
  },
];

const skillGroups = [
  { label: "Languages", items: ["TypeScript", "HTML", "CSS", "JavaScript", "Java", "C#", "Python"] },
  { label: "Frameworks & technologies", items: ["Bootstrap", "ReactJS", "AngularJS", "NodeJS", "Electron", "NextJS", "GraphQL", "NestJS"] },
  { label: "Tools & platforms", items: ["PostgreSQL", "MongoDB", "Visual Studio Code", "Git", "Powershell", "AWS", "Google Cloud Platform", "Wordpress"] },
];

export const Resume = () => (
  <Container className="App-header portfolio-page resume-page">
    <header className="page-heading">
      <h1>Resume</h1>
      <GlassLink href="/KishanManoharanResume.pdf" target="_blank" rel="noreferrer">
        <FileEarmarkText aria-hidden="true" />Open resume PDF
      </GlassLink>
    </header>
    <div className="portfolio-columns">
      <div className="resume-history">
        <section className="glass-panel section-enter" aria-labelledby="work-experience">
          <h2 id="work-experience">Work experience</h2>
          {experience.map(({ role, company, dates, url, description }) => (
            <article className="resume-entry" key={company}>
              <h3>{role}</h3>
              <div className="resume-meta">
                <a href={url} target="_blank" rel="noreferrer">{company}</a>
                <span>{dates}</span>
              </div>
              <p>{description}</p>
            </article>
          ))}
        </section>
        <section className="glass-panel section-enter section-later" aria-labelledby="education">
          <h2 id="education">Education</h2>
          <div className="resume-entry">
            <h3>Computer Program Analyst – T177</h3>
            <div className="resume-meta">
              <span>George Brown College</span>
              <span>September 2019 – April 2022</span>
            </div>
            <p>
              This program excels at giving students the experience and skills needed for a wide
              variety of software-based careers. This includes experience in web, open-source,
              Unix, and object-oriented languages.
            </p>
          </div>
        </section>
      </div>
      <section className="glass-panel section-enter section-later" aria-labelledby="resume-skills">
        <h2 id="resume-skills">Skills</h2>
        {skillGroups.map(({ label, items }) => (
          <div className="skill-group" key={label}>
            <h3>{label}</h3>
            <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </section>
    </div>
  </Container>
);
