import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative px-6 py-16 md:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* TOP DIVIDER */}
        <div
          className="mb-10 h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--line), transparent)",
          }}
        />

        <div className="grid gap-10 md:grid-cols-3 md:items-end">
          {/* LEFT */}
          <div className="text-left">
            <p className="ui-meta">
              $ exit
              <span className="type-cursor">_</span>
            </p>

            <p className="ui-body mt-4 transition-colors duration-300 hover:text-[var(--text-main)]">
              built with curiosity and code
            </p>
          </div>

          {/* CENTER */}
          <div className="flex items-center justify-start gap-5 md:justify-center">
            <a
              href="mailto:debnathshruti477@gmail.com"
              className="ui-icon-button h-10 w-10 text-[var(--text-main)]"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>

            <a
              href="https://github.com/shruti-246"
              target="_blank"
              rel="noreferrer"
              className="ui-icon-button h-10 w-10 text-[var(--text-main)]"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/shrutidebnath224/"
              target="_blank"
              rel="noreferrer"
              className="ui-icon-button h-10 w-10 text-[var(--text-main)]"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>

          {/* RIGHT */}
          <div className="text-left md:text-right">
            <p className="ui-meta">© 2026 Shruti Debnath</p>
          </div>
        </div>
      </div>
    </footer>
  );
}