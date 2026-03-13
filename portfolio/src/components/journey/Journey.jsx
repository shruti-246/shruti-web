import { useEffect, useState } from "react";

export default function Journey() {
  const headingFull = "/ academic_background";

  const educationLines = [
    "[2022 — Present]",
    "University of Idaho",
    "B.S. in Computer Science",
    "Minor in Mathematics",
    "Academic Certificate in AI/ML",
  ];

  const courseworkRows = [
    ["Database Management", "Compiler Design"],
    ["Applied Data Science with Python", "Analysis of Algorithms"],
    ["Adversarial Machine Learning", "Python for Machine Learning"],
    ["Deep Learning", ""],
  ];

  const [headingText, setHeadingText] = useState("");
  const [headingDone, setHeadingDone] = useState(false);

  const [visibleEducationCount, setVisibleEducationCount] = useState(0);
  const [showCourseworkHeader, setShowCourseworkHeader] = useState(false);
  const [visibleCourseworkRows, setVisibleCourseworkRows] = useState(0);

  useEffect(() => {
    if (headingText.length < headingFull.length) {
      const timeout = setTimeout(() => {
        setHeadingText(headingFull.slice(0, headingText.length + 1));
      }, 75);
      return () => clearTimeout(timeout);
    }

    if (!headingDone) {
      setHeadingDone(true);
    }
  }, [headingText, headingDone, headingFull]);

  useEffect(() => {
    if (!headingDone) return;

    if (visibleEducationCount < educationLines.length) {
      const timeout = setTimeout(() => {
        setVisibleEducationCount((prev) => prev + 1);
      }, 180);
      return () => clearTimeout(timeout);
    }

    const headerTimer = setTimeout(() => {
      setShowCourseworkHeader(true);
    }, 250);

    return () => clearTimeout(headerTimer);
  }, [headingDone, visibleEducationCount, educationLines.length]);

  useEffect(() => {
    if (!showCourseworkHeader) return;

    if (visibleCourseworkRows < courseworkRows.length) {
      const timeout = setTimeout(() => {
        setVisibleCourseworkRows((prev) => prev + 1);
      }, 170);
      return () => clearTimeout(timeout);
    }
  }, [showCourseworkHeader, visibleCourseworkRows, courseworkRows.length]);

  return (
    <section
      id="journey"
      className="relative overflow-hidden px-6 pt-24 pb-20 md:px-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT CONTENT */}
        <div className="order-1 flex justify-center lg:justify-start">
            <div className="flex h-[420px] w-full max-w-[320px] items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.02] shadow-[0_0_40px_rgba(0,0,0,0.18)]">
                <div className="text-center">
                    <p className="font-mono text-sm text-[var(--accent)]">/ journey</p>
                    <p className="mt-3 text-sm text-slate-500">
                    optional visual / badge / campus photo
                    </p>
                </div>
            </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="order-2 max-w-xl text-left">
          <p className="mb-6 font-mono text-[14px] text-[var(--accent)]">
            {headingText}
            <span className="type-cursor">|</span>
          </p>

          <div className="space-y-1">
            {educationLines.map((line, index) => (
              <p
                key={line}
                className={`font-mono transition-all duration-500 ease-out ${
                  index === 0
                    ? "text-[14px] text-slate-400"
                    : "text-[14px] text-slate-200"
                } ${
                  visibleEducationCount > index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          <div
            className={`mt-10 transition-all duration-500 ease-out ${
              showCourseworkHeader
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className="font-mono text-[14px] text-slate-300">
              $ related_coursework
            </p>
          </div>

          <div className="mt-6 space-y-2">
            {courseworkRows.map((row, rowIndex) => (
              <div
                key={`${row[0]}-${row[1]}`}
                className={`grid grid-cols-[1fr_24px_1fr] items-start gap-x-2 font-mono text-[14px] transition-all duration-500 ease-out ${
                  visibleCourseworkRows > rowIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <div className="group flex items-start gap-1 text-slate-200 transition-colors duration-200 hover:text-[var(--accent)]">
                  <span className="text-[var(--accent)]">{">"}</span>
                  <span>{row[0]}</span>
                </div>

                <div className="text-center text-slate-500">|</div>

                <div>
                  {row[1] ? (
                    <div className="group flex items-start gap-2 text-slate-200 transition-colors duration-200 hover:text-[var(--accent)]">
                      <span className="text-[var(--accent)]">{">"}</span>
                      <span>{row[1]}</span>
                    </div>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}