import type { ComponentProps } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { FileEarmarkText, PersonVcard } from "react-bootstrap-icons";
import { Glass, Menu, TabBar } from "glisse";

const pages = [
  { href: "/", value: "/", label: "Home" },
  { href: "/projects", value: "/projects", label: "Projects" },
  { href: "/contact", value: "/contact", label: "Contact" },
  { href: "/resume", value: "/resume", label: "Resume" },
];

function RouteLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "to"> & { href: string }) {
  return <Link to={href} {...props} />;
}

export const KNavbar = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const { pathname } = useLocation();
  const selected = pages.find(page => matchPath(page.href, pathname));

  return (
    <header className="portfolio-nav">
      <Glass key={String(reducedMotion)} aria-hidden="true" className="navbar-lens" />
      <Link className="portfolio-brand" to="/">Kishan M</Link>
      <div className="portfolio-tab-slot">
        <TabBar
          aria-label="Main navigation"
          className="portfolio-tabs"
          items={pages}
          value={selected?.value ?? null}
          link={RouteLink}
        />
      </div>
      <Menu
        key={reducedMotion ? "static-options" : "glass-options"}
        aria-label="Portfolio options"
        className="portfolio-options"
        items={[
          {
            label: "Contact card",
            icon: <PersonVcard aria-hidden="true" />,
            onSelect: () => window.location.assign("/vcard.vcf"),
          },
          {
            label: "Open résumé PDF",
            icon: <FileEarmarkText aria-hidden="true" />,
            onSelect: () => window.open("/KishanManoharanResume.pdf", "_blank", "noopener"),
          },
        ]}
      />
    </header>
  );
};
