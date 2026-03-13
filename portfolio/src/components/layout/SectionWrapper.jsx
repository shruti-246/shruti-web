export default function SectionWrapper({
  id,
  eyebrow,
  title,
  description,
  children,
}) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="mb-12 max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}