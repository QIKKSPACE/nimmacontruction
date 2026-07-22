import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Youtube, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { serviceList } from "@/data/service-list";

export function SiteFooter() {
  const typology = [
    "Plots in Bangalore",
    "Plots in Penukonda",
    "Plots in Devanahalli",
    "Flats in Bangalore",
    "Flats in Devanahalli",
  ];
  const socials = [Facebook, Twitter, Youtube, MessageCircle, Instagram, Linkedin];
  return (
    <footer className="bg-black py-16 text-white/80">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
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
          <p className="mt-6 max-w-xs text-sm text-white/60">
            Complete Living Solutions — building trust, homes and landmarks across South India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Services
          </h4>
          <ul className="mt-5 space-y-2 text-sm">
            {serviceList.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link to={s.to} className="hover:text-[color:var(--gold)]">
                  {s.title}
                </Link>
              </li>
            ))}

          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Typology
          </h4>
          <ul className="mt-5 space-y-2 text-sm">
            {typology.map((t) => (
              <li key={t}>
                <a href="#" className="hover:text-[color:var(--gold)]">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href="tel:+918884898765" className="hover:text-[color:var(--gold)]">
                888-4898-765
              </a>
            </li>
            <li>
              <a href="mailto:info@vinragroup.com" className="hover:text-[color:var(--gold)]">
                info@vinragroup.com
              </a>
            </li>
            <li className="text-white/60">
              No-34-1 First Floor Promenade, Sivanchetti Gardens, Bengaluru 560042
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Vinra Group. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[color:var(--gold)]">Privacy Policy</a>
          <a href="#" className="hover:text-[color:var(--gold)]">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
