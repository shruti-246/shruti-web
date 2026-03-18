import { useEffect, useRef, useState } from "react";

export default function Skills() {
  const headingFull = "/ skills";

  const skillGroups = [
    {
      label: "languages",
      items: ["Python", "C++", "C#", "SQL", "JavaScript"],
    },
    {
      label: "frontend",
      items: ["React", "Tailwind CSS", "HTML", "CSS"],
    },
    {
      label: "backend",
      items: ["Django", "REST APIs"],
    },
    {
      label: "tools",
      items: ["Unity", "Git", "VS Code", "Android Studio"],
    },
    {
      label: "other",
      items: ["Flutter", "Dart", "Kotlin"],
    },
  ];

  const sectionRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [headingText, setHeadingText] = useState("");
  const [showBase, setShowBase] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [visibleGroups, setVisibleGroups] = useState(0);
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
      { threshold: 0.24 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Type heading
  useEffect(() => {
    if (!hasStarted) return;

    if (headingText.length < headingFull.length) {
      const timeout = setTimeout(() => {
        setHeadingText(headingFull.slice(0, headingText.length + 1));
      }, 70);

      return () => clearTimeout(timeout);
    }

    const baseTimer = setTimeout(() => {
      setShowBase(true);
    }, 120);

    const dividerTimer = setTimeout(() => {
      setShowDivider(true);
    }, 180);
    if (!aboutDone) {
      setAboutDone(true);
    }
    return () => {
      clearTimeout(baseTimer);
      clearTimeout(dividerTimer);
    };
    
  }, [hasStarted, headingText, aboutDone]);

  // Stagger category reveal
  useEffect(() => {
    if (!showBase) return;

    if (visibleGroups < skillGroups.length) {
      const timeout = setTimeout(() => {
        setVisibleGroups((prev) => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [showBase, visibleGroups, skillGroups.length]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden px-6 pb-20 pt-24 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="ui-section-label">
          {headingText}
          {hasStarted && !aboutDone && <span className="type-cursor">|</span>}
        </p>

        <div
          className="mt-2 h-px w-[220px] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className={`h-full transition-all duration-500 ease-out ${
              showDivider ? "w-full" : "w-0"
            }`}
            style={{ background: "var(--line)" }}
          />
        </div>

        <div
          className={`ui-block-gap transition-all duration-500 ease-out ${
            showBase ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group, index) => (
              <div
                key={group.label}
                className={`ui-card-soft px-6 py-5 transition-all duration-500 ease-out ${
                  visibleGroups > index
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
              >
                <p className="ui-meta">$ {group.label}</p>

                <div className="mt-4 flex flex-wrap gap-x-1 gap-y-3">
                  {group.items.map((item, itemIndex) => (
                    <span key={item} className="ui-skill-chip">
                      {item}
                      {itemIndex !== group.items.length - 1 && (
                        <span
                          className="mx-2"
                          style={{ color: "var(--accent)" }}
                        >
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}