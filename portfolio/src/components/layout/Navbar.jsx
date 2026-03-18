import { Mail, Github, Linkedin } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#journey" },
  { label: "Projects", href: "#projects" },
];

const socialLinks = [
  {
    label: "Email",
    href: "mailto:debnathshruti477@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/shruti-246",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shrutidebnath224/",
    icon: Linkedin,
  },
];

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 lg:px-12">
        <div className="flex items-center gap-10">
          <a href="#hero" className="flex items-center gap-3">
            {/* <span
              className="h-3 w-3 rounded-full"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 14px var(--accent-soft)",
              }}
            /> */}
            <span className="text-[18px] font-mono text-[var(--accent)]">
              &lt;/&gt;
            </span>
            <span
              className="font-mono text-sm font-medium uppercase tracking-[0.22em]"
              style={{ color: "var(--text-main)" }}
            >
              Shruti Debnath
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[var(--accent-strong)]"
                style={{ color: "var(--text-main)" }}
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
              className="ui-icon-button h-10 w-10 text-[var(--text-main)]"
            >
              <Icon size={18} strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}