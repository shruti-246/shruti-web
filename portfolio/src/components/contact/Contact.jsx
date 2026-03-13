import SectionWrapper from "../layout/SectionWrapper";

export default function Contact() {
  return (
    <SectionWrapper
      id="contact"
      eyebrow="Contact"
      title="Let’s connect."
      description="This section will include your email, GitHub, LinkedIn, and resume in a clean closing layout."
    >
      <div className="rounded-2xl border border-dashed border-cyan-400/25 bg-slate-900/40 p-6 text-slate-400">
        Contact section placeholder
      </div>
    </SectionWrapper>
  );
}