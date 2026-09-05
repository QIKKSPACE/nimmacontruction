import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { serviceList } from "@/data/service-list";
import logoAsset from "@/assets/nimma-metro-logo.jpeg.asset.json";


function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
        <img src={logoAsset.url} alt="Nimmametro Constructions" className="h-full w-full object-contain" />
      </span>
      <div className="flex flex-col justify-center">
        <span className="font-sans text-[18px] font-bold tracking-widest text-white leading-none">
          Nimmametro Constructions
        </span>
        <span className="font-sans text-[8.5px] font-medium tracking-[0.15em] text-white/80 leading-tight mt-1 uppercase">
          Plotted & Farmland Development
        </span>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--ink)]/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/#home"
            className="text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)]"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)]"
          >
            About Us
          </Link>
          
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)] cursor-pointer"
            >
              Services <ChevronDown className="h-4 w-4" />
            </button>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-[320px] -translate-x-1/2 pt-3">
                <div className="max-h-[400px] overflow-y-auto rounded-xl border border-white/10 bg-[color:var(--ink)] p-2 shadow-2xl ring-1 ring-[color:var(--gold)]/20">
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

          {/* Projects Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition hover:text-[color:var(--gold)] cursor-pointer"
            >
              Projects <ChevronDown className="h-4 w-4" />
            </button>
            {projectsOpen && (
              <div className="absolute left-1/2 top-full w-[250px] -translate-x-1/2 pt-3">
                <div className="rounded-xl border border-white/10 bg-[color:var(--ink)] p-2 shadow-2xl ring-1 ring-[color:var(--gold)]/20">
                  <Link
                    to="/projects/plotted-development"
                    className="block rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-[color:var(--gold)]"
                  >
                    Plotted Development
                  </Link>
                  <Link
                    to="/projects/farmland-development"
                    className="block rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-[color:var(--gold)]"
                  >
                    Farmland Development
                  </Link>
                  <Link
                    to="/projects/other-development"
                    className="block rounded-md px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-[color:var(--gold)]"
                  >
                    Other Development
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
        <Link
          to="/#contact"
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
            <Link
              to="/#home"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-white/80"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-white/80"
            >
              About Us
            </Link>
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between text-left text-sm font-medium text-white/80"
            >
              Services <ChevronDown className={`h-4 w-4 transition ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-3 flex flex-col gap-2 border-l border-white/10 pl-3">
                {serviceList.map((s) => (
                  <Link
                    key={s.slug}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="text-sm text-white/70 hover:text-[color:var(--gold)]"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setMobileProjectsOpen((v) => !v)}
              className="flex items-center justify-between text-left text-sm font-medium text-white/80"
            >
              Projects <ChevronDown className={`h-4 w-4 transition ${mobileProjectsOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileProjectsOpen && (
              <div className="ml-3 flex flex-col gap-2 border-l border-white/10 pl-3">
                <Link
                  to="/projects/plotted-development"
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/70 hover:text-[color:var(--gold)]"
                >
                  Plotted Development
                </Link>
                <Link
                  to="/projects/farmland-development"
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/70 hover:text-[color:var(--gold)]"
                >
                  Farmland Development
                </Link>
                <Link
                  to="/projects/other-development"
                  onClick={() => setOpen(false)}
                  className="text-sm text-white/70 hover:text-[color:var(--gold)]"
                >
                  Other Development
                </Link>
              </div>
            )}

            <Link
              to="/#contact"
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
