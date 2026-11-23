import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
import { Glass } from "glisse";

type GlassLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  ({ to: string; href?: never } | { href: string; to?: never });

export function GlassLink({ to, href, children, ...props }: GlassLinkProps) {
  const content = <><Glass aria-hidden="true" className="link-lens" />{children}</>;
  return to !== undefined
    ? <Link {...props} className="lg-button glass-link" to={to}>{content}</Link>
    : <a {...props} className="lg-button glass-link" href={href}>{content}</a>;
}
