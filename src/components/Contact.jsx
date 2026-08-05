import { useState } from 'react';
import { Mail, Linkedin, ChevronDown, Send, ArrowUpRight } from 'lucide-react';
import { site } from '../data/site.js';
import { services } from '../data/services.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';

const PROJECT_TYPES = [...services.map((s) => s.title), 'Something else'];

/** One clickable contact row: icon chip, mono label, value. */
function ContactRow({ icon: Icon, label, value, href, external = false }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 border-b border-white/[0.06] py-4 transition-colors duration-300"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08]
                   bg-ink-800 text-ember-400 transition-colors duration-300 group-hover:border-ember-400/35"
      >
        <Icon size={16} strokeWidth={1.9} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-sans font-medium text-[10px] uppercase tracking-eyebrow text-ash-500">
          {label}
        </span>
        <span className="mt-1 block truncate text-[15px] text-ash-100 transition-colors duration-300 group-hover:text-ember-400">
          {value}
        </span>
      </span>

      <ArrowUpRight
        size={15}
        className="shrink-0 text-ash-500 opacity-0 transition-all duration-300
                   group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-400 group-hover:opacity-100"
      />
    </a>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: PROJECT_TYPES[0],
    message: '',
  });

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  /**
   * No backend — compose a pre-filled mailto: and hand off to the visitor's
   * email client.
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `New Project Enquiry — ${form.projectType} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${form.projectType}`,
      '',
      'Project details:',
      form.message,
      '',
      '— Sent from bugbiceps.in',
    ].join('\n');

    window.location.href = `mailto:${site.projectEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="hairline-top absolute inset-x-0 top-0 h-px" />

      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Contact"
          title="Let's build something"
          lead="Reach us directly, or send the brief through the form — it opens in your own email client, no forms disappearing into a void."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-14">
          {/* Direct details */}
          <Reveal>
            <div>
              <h3 className="font-sans font-medium text-[11px] uppercase tracking-eyebrow text-ash-500">
                Direct Lines
              </h3>

              <div className="mt-3 border-t border-white/[0.06]">
                <ContactRow
                  icon={Mail}
                  label="General"
                  value={site.primaryEmail}
                  href={`mailto:${site.primaryEmail}`}
                />
                <ContactRow
                  icon={Mail}
                  label="Secondary"
                  value={site.secondaryEmail}
                  href={`mailto:${site.secondaryEmail}`}
                />
                <ContactRow
                  icon={Mail}
                  label="New Projects"
                  value={site.projectEmail}
                  href={`mailto:${site.projectEmail}`}
                />
                <ContactRow
                  icon={Linkedin}
                  label="LinkedIn"
                  value="linkedin.com/company/bugbiceps"
                  href={site.linkedin}
                  external
                />
              </div>

              <p className="mt-8 max-w-sm text-sm leading-relaxed text-ash-500">
                {site.status}. Typical first response within one business day.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="surface p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Your name"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="field-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@company.com"
                    className="field"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="projectType" className="field-label">
                  Project Type
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={update('projectType')}
                    className="field appearance-none pr-11"
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-ink-800 text-ash-100">
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ash-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="field-label">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={update('message')}
                  placeholder="What are you building, and what does success look like?"
                  className="field resize-y"
                />
              </div>

              <button type="submit" className="btn-primary group mt-7 w-full">
                Send via Email
                <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-ash-500">
                Opens your email client with the message pre-filled and addressed to{' '}
                <span className="text-ash-300">{site.projectEmail}</span>.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
