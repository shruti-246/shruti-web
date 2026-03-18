import { useEffect, useRef, useState } from "react";

export default function Journey() {
  const experienceHeadingFull = "/ leadership experience";
  const updateHeadingFull = "/ up_to_date";

  const experiences = [
    {
      year: "2024 — Present",
      title: "SI-PASS Leader",
      shortLabel: "SI-PASS",
      dept: "College Success Strategies",
      org: "University of Idaho",
      description: [
        "Led weekly peer-assisted study sessions to help students understand core Pre-Calculus concepts.",
        "Facilitated collaborative discussions and guided problem-solving to make complex topics more approachable.",
        "Worked closely with course instructors to identify and address conceptual gaps during sessions.",
      ],
    },
    {
      year: "2023 — Present",
      title: "Lead Tutor",
      shortLabel: "LEAD TUTOR",
      dept: "Math & Statistics Center",
      org: "University of Idaho",
      description: [
        "Led bi-weekly strategy meetings with a team of tutors to align coursework and improve tutoring effectiveness.",
        "Introduced engagement-focused improvements to tutoring sessions to enhance student participation.",
        "Working toward professional certification aligned with CRLA standards.",
      ],
    },
    {
      year: "2024",
      title: "Legend of Warriors",
      shortLabel: "PROJECT",
      dept: "Course Project",
      org: "University of Idaho",
      description: [
        "Led a team of 7 in developing a combat-based game, coordinating tasks and project structure.",
        "Managed version control using Git and GitHub.",
        "Designed and implemented UI systems, including menus and settings, using Unity and C#.",
        "Performed boundary and stress testing to ensure stability.",
        "Applied software engineering concepts such as system design diagrams and project planning tools.",
      ],
    },
    {
      year: "Summer 2024",
      title: "Team Lead",
      shortLabel: "TEAM LEAD",
      dept: "Facilities",
      org: "University of Idaho",
      description: [
        "Led a team of 30 staff in facilities operations, coordinating daily tasks and maintaining quality standards.",
        "Conducted inspections and ensured consistency across assigned areas.",
        "Recognized for leadership and effective team management.",
      ],
    },
  ];

  const sectionRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [experienceHeadingText, setExperienceHeadingText] = useState("");
  const [updateHeadingText, setUpdateHeadingText] = useState("");
  const [showExperiencePanel, setShowExperiencePanel] = useState(false);
  const [showUpdatePanel, setShowUpdatePanel] = useState(false);
  const [activeExperience, setActiveExperience] = useState(0);
  const [detailVisible, setDetailVisible] = useState(false);
  const [aboutDone, setAboutDone] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    if (experienceHeadingText.length < experienceHeadingFull.length) {
      const timeout = setTimeout(() => {
        setExperienceHeadingText(
          experienceHeadingFull.slice(0, experienceHeadingText.length + 1)
        );
      }, 75);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setShowExperiencePanel(true);
      setDetailVisible(true);
    }, 200);

    if (!aboutDone) {
      setAboutDone(true);
    }

    return () => clearTimeout(timer);
  }, [hasStarted, experienceHeadingText, aboutDone, experienceHeadingFull]);

  useEffect(() => {
    if (!showExperiencePanel) return;

    if (updateHeadingText.length < updateHeadingFull.length) {
      const timeout = setTimeout(() => {
        setUpdateHeadingText(
          updateHeadingFull.slice(0, updateHeadingText.length + 1)
        );
      }, 75);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => {
      setShowUpdatePanel(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [showExperiencePanel, updateHeadingText, updateHeadingFull]);

  const handleExperienceChange = (index) => {
    if (index === activeExperience) return;

    setDetailVisible(false);

    setTimeout(() => {
      setActiveExperience(index);
      setDetailVisible(true);
    }, 180);
  };

  const currentExperience = experiences[activeExperience];

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden px-6 pb-20 pt-24 md:px-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1fr_1fr]">
        <div className="max-w-xl text-left">
          <p className="ui-section-label">
            {experienceHeadingText}
            {hasStarted && !aboutDone && <span className="type-cursor">|</span>}
          </p>

          <div className="ui-section-line"></div>

          <div
            className={`transition-all duration-700 ${
              showExperiencePanel
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="grid grid-cols-[110px_24px_1fr] gap-x-6">
              <div className="space-y-8 pt-1">
                {experiences.map((item, index) => (
                  <button
                    key={item.title}
                    onClick={() => handleExperienceChange(index)}
                    className={`block text-left font-mono text-[14px] uppercase tracking-[0.08em] transition ${
                      activeExperience === index
                        ? "text-[var(--text-main)]"
                        : "text-[var(--text-muted)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {item.shortLabel}
                  </button>
                ))}
              </div>

              <div className="relative flex justify-center">
                <div className="h-full w-px bg-[var(--border)]" />
                <div
                  className="absolute w-[2px] bg-[var(--accent)] transition-all duration-300"
                  style={{
                    top: `${activeExperience * 68}px`,
                    height: "58px",
                    boxShadow: "0 0 12px var(--accent-soft)",
                  }}
                />
              </div>

              <div
                className={`transition-all duration-300 ${
                  detailVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                }`}
              >
                <h3 className="ui-card-title" style={{ fontSize: "16px" }}>
                  {currentExperience.title}
                </h3>

                <p className="ui-accent-meta mt-1">
                  {currentExperience.dept}{" "}
                  <span className="text-[var(--text-muted)]">@</span>{" "}
                  {currentExperience.org}
                </p>

                <p className="ui-meta mt-2">{currentExperience.year}</p>

                <div className="mt-4 space-y-3">
                  {currentExperience.description.map((point, i) => (
                    <div key={i} className="flex gap-3 ui-body">
                      <span className="font-mono text-[var(--accent)]">{">"}</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-xl text-left lg:ml-auto">
          <p className="ui-section-label">
            {updateHeadingText}
            {hasStarted && !aboutDone && <span className="type-cursor">|</span>}
          </p>

          <div className="ui-section-line"></div>

          <div
            className={`transition-all duration-700 ${
              showUpdatePanel
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="ui-meta">
              $ currently_building
              {hasStarted && <span className="type-cursor">_</span>}
            </p>

            <div className="ui-body mt-4 space-y-2">
              <div className="flex gap-2">
                <span className="text-[var(--accent)]">{">"}</span>
                <span>Production-Ready SaaS Dashboard</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[var(--accent)]">{">"}</span>
                <span>Real-Time Collaboration Tool</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[var(--accent)]">{">"}</span>
                <span>Exploring AI/ML systems</span>
              </div>
            </div>

            <div className="ui-block-gap">
              <p className="ui-meta">
                $ focus
                {hasStarted && <span className="type-cursor">_</span>}
              </p>

              <div className="ui-body mt-4 space-y-2">
                <div className="flex gap-2">
                  <span className="text-[var(--accent)]">{">"}</span>
                  <span>Fullstack Engineering</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--accent)]">{">"}</span>
                  <span>API Design</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--accent)]">{">"}</span>
                  <span>Scalable Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}