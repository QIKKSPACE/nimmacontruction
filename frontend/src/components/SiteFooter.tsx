import { Link } from "@tanstack/react-router";
import { serviceList } from "@/data/service-list";
import { socialLinks } from "@/data/social-links";
import logoAsset from "@/assets/nimma-metro-logo.jpeg.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-black py-16 text-white/80">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-white/20">
              <img src={logoAsset.url} alt="Nimma Metro" className="h-full w-full object-contain" />
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
          <p className="mt-6 max-w-xs text-sm text-white/60">
            Building trust, homes and landmarks across South India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                aria-label={s.name}
                title={s.name}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-[color:var(--gold)]">
            Services & Links
          </h4>
          <ul className="mt-5 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-[color:var(--gold)]">
                About Us
              </Link>
            </li>
            {serviceList.slice(0, 6).map((s) => (
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
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href="tel:+919148806063" className="hover:text-[color:var(--gold)]">
                +91 91488 06063
              </a>
            </li>
            <li>
              <a href="mailto:constructions@nimmametro.com" className="hover:text-[color:var(--gold)]">
                constructions@nimmametro.com
              </a>
            </li>
            <li className="text-white/60">
              Nimmametro Constructions<br />
              212/A, 1st Main Road, Domlur Stage 2,<br />
              Domlur, Bengaluru, Karnataka – 560071
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
        <div>© {new Date().getFullYear()} Nimmametro Constructions. All rights reserved.</div>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-[color:var(--gold)]">Privacy Policy</Link>
          <Link to="/terms-conditions" className="hover:text-[color:var(--gold)]">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
