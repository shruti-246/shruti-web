import { useEffect, useMemo, useState } from "react";

export default function About() {
  const aboutFull = "/ about";
  const skillsCommand = "$ skills_applied_in_projects";

  const skills = useMemo(
    () => [
      ["Python", "SQL"],
      ["Unity", "HTML / CSS"],
      ["C++", "C#"],
    ],
    []
  );

  const flatSkills = useMemo(() => skills.flat(), [skills]);

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

  // 1) type "/ about"
  useEffect(() => {
    if (aboutText.length < aboutFull.length) {
      const timeout = setTimeout(() => {
        setAboutText(aboutFull.slice(0, aboutText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }

    if (!aboutDone) {
      setAboutDone(true);
    }
  }, [aboutText, aboutDone]);

  // 2) fade paragraph in
  useEffect(() => {
    if (!aboutDone) return;

    const timer = setTimeout(() => {
      setShowParagraph(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [aboutDone]);

  // 3) fade terminal header in
  useEffect(() => {
    if (!showParagraph) return;

    const timer = setTimeout(() => {
      setShowTerminalHeader(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [showParagraph]);

  // 4) start typing skills after terminal header appears
  useEffect(() => {
    if (!showTerminalHeader) return;

    const timer = setTimeout(() => {
      setStartTypingSkills(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [showTerminalHeader]);

  // 5) type each skill one by one
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
      id="about"
      className="relative overflow-hidden px-6 pt-24 pb-20 md:px-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT TEXT */}
        <div className="max-w-xl text-left">
          <p className="mb-6 font-mono text-[18px] text-[var(--accent)]">
            {aboutText}
            <span className="type-cursor">|</span>
          </p>

          <div
            className={`transition-all duration-700 ease-out ${
              showParagraph
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="text-[14px] leading-6 text-[var(--text-soft)]">
              I&apos;m a Computer Science student at the University of Idaho who
              enjoys building software and exploring systems.
            </p>

            <p className="mt-4 text-[14px] leading-2 text-[var(--text-soft)]">
              I like experimenting with UI ideas and creating things from
              scratch.
            </p>
          </div>

          <div
            className={`mt-10 transition-all duration-700 ease-out ${
              showTerminalHeader
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="font-mono text-[14px] leading-2 text-slate-300">
              {skillsCommand}
            </p>

            <div className="mt-6 ml-6 grid grid-cols-[160px_20px_160px] gap-y-2 font-mono text-[14px] text-slate-200">

                <span>
                    <span className="text-[var(--accent)]">&gt;</span> {typedSkills[0]}
                    {showSkillCursor(0) && <span className="type-cursor">_</span>}
                </span>

                <span className="text-center text-slate-500">|</span>

                <span>
                    <span className="text-[var(--accent)]">&gt;</span> {typedSkills[1]}
                    {showSkillCursor(1) && <span className="type-cursor">_</span>}
                </span>


                <span>
                    <span className="text-[var(--accent)]">&gt;</span> {typedSkills[2]}
                    {showSkillCursor(2) && <span className="type-cursor">_</span>}
                </span>

                <span className="text-center text-slate-500">|</span>

                <span>
                    <span className="text-[var(--accent)]">&gt;</span> {typedSkills[3]}
                    {showSkillCursor(3) && <span className="type-cursor">_</span>}
                </span>


                <span>
                    <span className="text-[var(--accent)]">&gt;</span> {typedSkills[4]}
                    {showSkillCursor(4) && <span className="type-cursor">_</span>}
                </span>

                <span className="text-center text-slate-500">|</span>

                <span>
                    <span className="text-[var(--accent)]">&gt;</span> {typedSkills[5]}
                    {showSkillCursor(5) && <span className="type-cursor">_</span>}
                </span>

            </div>
            <div className="mt-10 text-[14px] leading-6 text-[var(--text-soft)]">
                <p>
                    Most of my projects focus on learning by building — whether it's designing
                    interfaces, experimenting with algorithms, or implementing systems from
                    scratch.
                </p>

                <p className="mt-4">
                    I'm especially interested in how thoughtful software design and clean
                    systems thinking can turn small ideas into meaningful tools.
                </p>
            </div>
          </div>
        </div>

        {/* RIGHT PHOTO SPACE */}
        <div className="flex justify-center lg:justify-end">
          <div className="flex h-[420px] w-full max-w-[320px] items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.02] shadow-[0_0_40px_rgba(0,0,0,0.18)]">
            <p className="font-mono text-sm text-slate-500">photo space</p>
          </div>
        </div>
      </div>
    </section>
  );
}