import { Linkedin } from 'lucide-react';
import { site, navLinks } from '../data/site.js';
import Wordmark from './Wordmark.jsx';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-ink-800/40">
      <div className="container-page py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" aria-label="BugBiceps — back to top" className="inline-block rounded-lg">
              <Wordmark size="lg" />
            </a>
            <p className="mt-5 font-sans font-medium text-[11px] uppercase tracking-eyebrow text-ember-400">
              {site.motto}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ash-300">{site.tagline}.</p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="font-sans font-medium text-[10px] uppercase tracking-eyebrow text-ash-500">
                Navigate
              </h2>
              <ul className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-ash-300 transition-colors duration-200 hover:text-ash-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-sans font-medium text-[10px] uppercase tracking-eyebrow text-ash-500">
                Contact
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${site.primaryEmail}`}
                    className="text-sm text-ash-300 transition-colors duration-200 hover:text-ash-100"
                  >
                    {site.primaryEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.secondaryEmail}`}
                    className="text-sm text-ash-300 transition-colors duration-200 hover:text-ash-100"
                  >
                    {site.secondaryEmail}
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="BugBiceps on LinkedIn"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.09]
                               bg-ink-800 text-ash-300 transition-colors duration-300
                               hover:border-ember-400/35 hover:text-ember-400"
                  >
                    <Linkedin size={16} strokeWidth={1.9} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ash-500">Â© 2026 BugBiceps. All rights reserved.</p>
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans font-medium text-[11px] tracking-wide text-ash-500 transition-colors duration-200 hover:text-ember-400"
          >
            {site.domain}
          </a>
        </div>
      </div>
    </footer>
  );
}
