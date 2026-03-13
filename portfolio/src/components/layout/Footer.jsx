export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <p className="font-mono text-sm text-[var(--accent)]">/ footer</p>
          <p className="mt-2 text-sm text-slate-400">
            Built and designed by Shruti Debnath.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          React · Vite · Tailwind CSS · Framer Motion
        </p>
      </div>
    </footer>
  );
}