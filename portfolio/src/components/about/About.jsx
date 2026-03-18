import { useEffect, useRef, useState } from "react";
import { Mail, FileText } from "lucide-react";

export default function About() {
  const aboutFull = "/ about";
  const skillsFull = "skills_i_am_working_with";

  const skills = [
    ["Python", "REACT"],
    ["JavaScript", "HTML / CSS"],
    ["RESTful APIs", "Typescript"],
  ];

  const flatSkills = skills.flat();
  const sectionRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);

  const [aboutText, setAboutText] = useState("");
  const [aboutDone, setAboutDone] = useState(false);

  const [showParagraph, setShowParagraph] = useState(false);
  const [showTerminalHeader, setShowTerminalHeader] = useState(false);

  const [typedSkills, setTypedSkills] = useState(
    Array(flatSkills.length).fill("")
  );
  const [currentSkillIdx, setCurrentSkillIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [startTypingSkills, setStartTypingSkills] = useState(false);

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
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Type "/ about" after section enters viewport
  useEffect(() => {
    if (!hasStarted) return;

    if (aboutText.length < aboutFull.length) {
      const timeout = setTimeout(() => {
        setAboutText(aboutFull.slice(0, aboutText.length + 1));
      }, 80);

      return () => clearTimeout(timeout);
    }

    if (!aboutDone) {
      setAboutDone(true);
    }
  }, [hasStarted, aboutText, aboutDone]);

  // Fade paragraphs in
  useEffect(() => {
    if (!aboutDone) return;

    const timer = setTimeout(() => {
      setShowParagraph(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [aboutDone]);

  // Fade terminal header in
  useEffect(() => {
    if (!showParagraph) return;

    const timer = setTimeout(() => {
      setShowTerminalHeader(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [showParagraph]);

  // Start typing skills
  useEffect(() => {
    if (!showTerminalHeader) return;

    const timer = setTimeout(() => {
      setStartTypingSkills(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [showTerminalHeader]);

  // Type skill words one by one
  useEffect(() => {
    if (!startTypingSkills) return;
    if (currentSkillIdx >= flatSkills.length) return;

    const currentWord = flatSkills[currentSkillIdx];

    if (currentCharIdx < currentWord.length) {
      const timeout = setTimeout(() => {
        setTypedSkills((prev) => {
          const updated = [...prev];
          updated[currentSkillIdx] = currentWord.slice(0, currentCharIdx + 1);
          return updated;
        });
        setCurrentCharIdx((prev) => prev + 1);
      }, 65);

      return () => clearTimeout(timeout);
    }

    const nextTimer = setTimeout(() => {
      setCurrentSkillIdx((prev) => prev + 1);
      setCurrentCharIdx(0);
    }, 220);

    return () => clearTimeout(nextTimer);
  }, [startTypingSkills, currentSkillIdx, currentCharIdx, flatSkills]);

  const showSkillCursor = (index) =>
    startTypingSkills &&
    currentSkillIdx === index &&
    currentSkillIdx < flatSkills.length;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 pb-20 pt-17 md:px-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT TEXT */}
        <div className="max-w-xl text-left">
          <p className="ui-section-label">
            {aboutText}
            {hasStarted && !aboutDone && <span className="type-cursor">|</span>}
          </p>

          <div className="ui-section-line"></div>

          <div
            className={`transition-all duration-700 ease-out ${
              showParagraph
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="ui-body">
              I’m am currently studying Computer Science at the <span class="highlight">University of Idaho</span>, with a focus on building systems and exploring how software behaves at scale.
            </p>

            <p className="ui-body ui-paragraph-gap">
              Most of my work comes from <span class="highlight">learning by building</span>, where I explore different UI patterns and experiment with interface to
              turn designs into interactive user interfaces that feel intuitive and easy to use.
            </p>
          </div>

          <div
            className={`ui-block-gap transition-all duration-700 ease-out ${
              showTerminalHeader
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="ui-terminal-label">$ {skillsFull}</p>

            <div
              className="mt-6 ml-6 grid grid-cols-[160px_20px_160px] gap-y-1 font-mono text-[14px]"
              style={{ color: "var(--text-main)" }}
            >
              <span>
                <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                {typedSkills[0]}
                {showSkillCursor(0) && <span className="type-cursor">_</span>}
              </span>

              <span className="text-center" style={{ color: "var(--text-muted)" }}>
                |
              </span>

              <span>
                <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                {typedSkills[1]}
                {showSkillCursor(1) && <span className="type-cursor">_</span>}
              </span>

              <span>
                <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                {typedSkills[2]}
                {showSkillCursor(2) && <span className="type-cursor">_</span>}
              </span>

              <span className="text-center" style={{ color: "var(--text-muted)" }}>
                |
              </span>

              <span>
                <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                {typedSkills[3]}
                {showSkillCursor(3) && <span className="type-cursor">_</span>}
              </span>

              <span>
                <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                {typedSkills[4]}
                {showSkillCursor(4) && <span className="type-cursor">_</span>}
              </span>

              <span className="text-center" style={{ color: "var(--text-muted)" }}>
                |
              </span>

              <span>
                <span style={{ color: "var(--accent)" }}>{">"}</span>{" "}
                {typedSkills[5]}
                {showSkillCursor(5) && <span className="type-cursor">_</span>}
              </span>
            </div>
          </div>

          <div
            className={`ui-block-gap transition-all duration-700 ease-out ${
              showTerminalHeader
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="ui-body">
              Lately, I've been exploring the intersection of software and intelligent systems, especially <span class="highlight">AI/ML and data-driven applications</span>.
            </p>

            <p className="ui-body ui-paragraph-gap">
              Outside of my tech-life, I enjoy art, love science-fictions and I teach mathematics through academic support programs.
            </p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end lg:pt-14">
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-full blur-3xl"
              style={{ background: "var(--accent-soft)" }}
            />

            <img
              src="/images/about.jpg"
              alt="Shruti"
              className="relative h-[400px] w-full max-w-[300px] rounded-[28px] object-cover ui-card"
            />
            <a
              href="/resume/shruti-debnath-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center ui-terminal-button gap-2 font-mono text-[16px] transition-all duration-300 hover:-translate-y-[2px]"
              style={{ color: "var(--accent)" }}
            >
              <span className="ui-terminal-bracket-left">[</span>
              <FileText size={18} className="ui-terminal-icon" />
              <span className="ui-terminal-text">view resume</span>
              <span className="ui-terminal-bracket-right">]</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}