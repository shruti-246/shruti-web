import SectionWrapper from "../layout/SectionWrapper";

export default function Research() {
  return (
    <SectionWrapper
      id="research"
      eyebrow="Research Interests"
      title="Questions and areas I want to explore more deeply."
      description="This section will later highlight interests such as database systems, explainable AI, and multimodal machine learning."
    >
      <div className="rounded-2xl border border-dashed border-cyan-400/25 bg-slate-900/40 p-6 text-slate-400">
        Research section placeholder
      </div>
    </SectionWrapper>
  );
}