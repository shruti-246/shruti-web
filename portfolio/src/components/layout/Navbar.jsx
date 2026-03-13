import { Mail, Github, Linkedin } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
];

const socialLinks = [
  {
    label: "Email",
    href: "mailto:your-email@example.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-linkedin",
    icon: Linkedin,
  },
];

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 lg:px-12">
        <div className="flex items-center gap-10">
          <a href="#hero" className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_14px_rgba(78,231,212,0.7)]" />
            <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-100">
              Shruti Debnath
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition hover:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="text-slate-300 transition hover:text-[var(--accent)]"
            >
              <Icon size={20} strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}