import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { serviceList } from "@/data/service-list";

const nav = [
  { label: "Home", to: "/", hash: "home" as const },
  { label: "About Us", to: "/", hash: "about" as const },
  { label: "Projects", to: "/", hash: "projects" as const },
  { label: "Cost Calculator", to: "/", hash: "calculator" as const },
  { label: "Blogs", to: "/", hash: "blogs" as const },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border-2"
        style={{ borderColor: "var(--gold)" }}
      >
        <span className="font-display text-lg font-bold text-[color:var(--gold)]">V</span>
      </span>
      <span className="flex flex-col leading-tight text-white">
        <span className="font-display text-lg font-bold tracking-wide">VINRA GROUP</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--gold)]">
          Complete Living Solutions
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--ink)]/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.slice(0, 2).map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              className="text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)]"
            >
              {n.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)]"
            >
              Services <ChevronDown className="h-4 w-4" />
            </Link>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3">
                <div className="rounded-xl border border-white/10 bg-[color:var(--ink)] p-2 shadow-2xl ring-1 ring-[color:var(--gold)]/20">
                  {serviceList.map((s) => (
                    <Link
                      key={s.slug}
                      to={s.to}
                      className="block rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-[color:var(--gold)]"
                    >
                      {s.title}
                    </Link>
                  ))}

                </div>
              </div>
            )}
          </div>
          {nav.slice(2).map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={n.hash}
              className="text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          hash="contact"
          className="hidden rounded-full border-2 border-[color:var(--gold)] px-6 py-2.5 text-sm font-semibold text-[color:var(--gold)] transition hover:bg-[color:var(--gold)] hover:text-[color:var(--gold-foreground)] lg:inline-flex"
        >
          Contact Us
        </Link>
        <button
          className="text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-[color:var(--ink)] lg:hidden">
          <div className="container-x flex flex-col gap-3 py-6">
            {nav.slice(0, 2).map((n) => (
              <Link
                key={n.label}
                to={n.to}
                hash={n.hash}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/80"
              >
                {n.label}
              </Link>
            ))}
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between text-left text-sm font-medium text-white/80"
            >
              Services <ChevronDown className={`h-4 w-4 transition ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-2 border-l border-white/10 pl-3">
                <Link
                  to="/services"
                  onClick={() => setOpen(false)}
                  className="text-sm text-[color:var(--gold)]"
                >
                  All Services
                </Link>
                {serviceList.map((s) => (
                  <Link
                    key={s.slug}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="text-sm text-white/70"
                  >
                    {s.title}
                  </Link>
                ))}

              </div>
            )}
            {nav.slice(2).map((n) => (
              <Link
                key={n.label}
                to={n.to}
                hash={n.hash}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/80"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="contact"
              onClick={() => setOpen(false)}
              className="rounded-full border-2 border-[color:var(--gold)] px-6 py-2.5 text-center text-sm font-semibold text-[color:var(--gold)]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
