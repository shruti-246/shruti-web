import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Folder,
} from "lucide-react";

export default function Projects() {
  const headingFull = "/ projects";
  const featuredLabelFull = "$ featured";
  const moreLabelFull = "$ more_projects";

  const featuredProjects = [
    {
      title: "BarterDB",
      description:
        "A full-stack barter trading platform with role-based user interactions.",
      tech: "Flask · REST APIs · Python · SQLite",
      image: "/images/projects/barterdb.png",
      github: "https://github.com/shruti-246/BarterSystem",
      live: "https://bartersystem-mowi.onrender.com/",
    },
    {
      title: "Unity Survival Game",
      description:
        "A survival-mode game project featuring UI systems, menus, and gameplay flow.",
      tech: "Unity · C# · UI Systems",
      image: "/images/projects/unity-game.png",
      github: "https://github.com/shruti-246/legend_of_warriors",
      live: "https://drive.google.com/file/d/1fR7Z4LCLAUbvLe8JaqucWBlK9Gi16i0b/view",
    },
    {
      title: "Algorithms Visualizer",
      description:
        "Implemented classic pattern-matching algorithms and compared their behavior.",
      tech: "C · Algorithms · Benchmarking",
      image: "/images/projects/algorithm.png",
      github: "https://github.com/shruti-246/Algorithm_Visualizer",
      live: "https://visual-algos.vercel.app/",
    },
  ];

  const moreProjects = [
    {
      title: "Pong Game in C#",
      description: "A classic Pong game implemented in C# using Unity.",
      tech: "C# · Unity · Game Development",
      github: "https://github.com/shruti-246/Unity-Pong",
      live: "#",
    },
    {
      title: "Netflix UI Clone",
      description:
        "A responsive interface inspired by Netflix built to explore modern frontend design patterns and component architecture.",
      tech: "React · Tailwind CSS · Responsive Design",
      github: "https://github.com/shruti-246/fun_portfolio",
      live: "https://shruti-246.github.io/fun_portfolio/",
    },
    {
      title: "Flutter Developer Portfolio",
      description:
        "A responsive portfolio website for a Flutter developer.",
      tech: "Flutter · Responsive UI · Animation",
      github: "https://github.com/shruti-246/flutter_portfolio",
      live: "https://shruti-246.github.io/flutter_portfolio/",
    },
  ];

  const sectionRef = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [headingText, setHeadingText] = useState("");
  const [featuredLabelText, setFeaturedLabelText] = useState("");
  const [moreLabelText, setMoreLabelText] = useState("");

  const [showFeatured, setShowFeatured] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [aboutDone, setAboutDone] = useState(false);

  useEffect(() => {
    if (!showFeatured || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === featuredProjects.length - 1 ? 0 : prev + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [showFeatured, isPaused, featuredProjects.length]);

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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    if (headingText.length < headingFull.length) {
      const timeout = setTimeout(() => {
        setHeadingText(headingFull.slice(0, headingText.length + 1));
      }, 70);
      if (!aboutDone) {
      setAboutDone(true);
      }
      return () => clearTimeout(timeout);
    }
    if (!aboutDone) {
      setAboutDone(true);
    }
  }, [hasStarted, headingText], aboutDone);

  useEffect(() => {
    if (headingText !== headingFull) return;
    if (featuredLabelText.length < featuredLabelFull.length) {
      const timeout = setTimeout(() => {
        setFeaturedLabelText(
          featuredLabelFull.slice(0, featuredLabelText.length + 1)
        );
      }, 55);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => setShowFeatured(true), 200);
    return () => clearTimeout(timer);
  }, [headingText, featuredLabelText]);

  useEffect(() => {
    if (!showFeatured) return;
    if (moreLabelText.length < moreLabelFull.length) {
      const timeout = setTimeout(() => {
        setMoreLabelText(moreLabelFull.slice(0, moreLabelText.length + 1));
      }, 55);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => setShowMore(true), 150);
    return () => clearTimeout(timer);
  }, [showFeatured, moreLabelText]);

  const prevProject = () => {
    setActiveIndex((prev) =>
      prev === 0 ? featuredProjects.length - 1 : prev - 1
    );
  };

  const nextProject = () => {
    setActiveIndex((prev) =>
      prev === featuredProjects.length - 1 ? 0 : prev + 1
    );
  };

  const getVisibleProjects = () => {
    const prev =
      activeIndex === 0 ? featuredProjects.length - 1 : activeIndex - 1;
    const next =
      activeIndex === featuredProjects.length - 1 ? 0 : activeIndex + 1;

    return {
      left: featuredProjects[prev],
      center: featuredProjects[activeIndex],
      right: featuredProjects[next],
      leftIndex: prev,
      centerIndex: activeIndex,
      rightIndex: next,
    };
  };

  const visible = getVisibleProjects();

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-6 pb-20 pt-20 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p className="ui-section-label">
          {headingText}
          {hasStarted && !aboutDone && <span className="type-cursor">|</span>}
        </p>

        <div className="ui-section-line"></div>

        <p className="ui-meta mb-6">
          {featuredLabelText}
          {featuredLabelText === featuredLabelFull && (
            <span className="type-cursor">_</span>
          )}
        </p>

        {/* Desktop Featured */}
        <div
          className={`hidden transition-all duration-700 lg:block ${
            showFeatured
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div
            className="relative h-[500px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              type="button"
              onClick={prevProject}
              className="ui-icon-button absolute left-0 top-1/2 z-20 -translate-y-1/2 p-3 text-[var(--text-main)]"
              aria-label="Previous project"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextProject}
              className="ui-icon-button absolute right-0 top-1/2 z-20 -translate-y-1/2 p-3 text-[var(--text-main)]"
              aria-label="Next project"
            >
              <ArrowRight size={18} />
            </button>

            {/* LEFT CARD */}
            <button
              type="button"
              onClick={() => setActiveIndex(visible.leftIndex)}
              className="absolute left-[7%] top-[70px] z-0 w-[34%] overflow-hidden rounded-[28px] border text-left opacity-50 shadow-[var(--shadow-soft)] transition duration-500 hover:opacity-70"
              style={{
                transform: "scale(0.9) rotateY(10deg)",
                borderColor: "var(--border)",
                background: "var(--panel-soft)",
              }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={visible.left.image}
                  alt={visible.left.title}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>
            </button>

            {/* CENTER CARD */}
            <div className="absolute left-1/2 top-[0px] z-10 w-[46%] -translate-x-1/2">
              <div
                className="overflow-hidden rounded-[30px] border transition duration-500 hover:-translate-y-1"
                style={{
                  borderColor: "var(--line)",
                  background: "var(--panel-soft)",
                  boxShadow: "var(--shadow-strong)",
                }}
              >
                {/* IMAGE AREA */}
                <div
                  className="relative h-[220px] overflow-hidden border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <img
                    src={visible.center.image}
                    alt={visible.center.title}
                    className="h-full w-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-black/28" />

                  <a
                    href={visible.center.github}
                    target="_blank"
                    rel="noreferrer"
                    className="ui-icon-button absolute right-4 top-4 p-2 text-[var(--text-main)]"
                    aria-label={`${visible.center.title} GitHub`}
                  >
                    <Github size={18} />
                  </a>
                </div>

                {/* CONTENT AREA */}
                <div className="px-8 py-7">
                  <h3
                    className="font-mono text-[28px]"
                    style={{ color: "var(--text-main)" }}
                  >
                    {visible.center.title}
                  </h3>

                  <p className="ui-body mt-3">{visible.center.description}</p>

                  <p className="ui-accent-meta mt-3">{visible.center.tech}</p>

                  <a
                    href={visible.center.live}
                    className="ui-terminal-button mt-5"
                  >
                    <span>[</span>
                    <ExternalLink size={16} />
                    <span>view project</span>
                    <span>]</span>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <button
              type="button"
              onClick={() => setActiveIndex(visible.rightIndex)}
              className="absolute right-[7%] top-[70px] z-0 w-[34%] overflow-hidden rounded-[28px] border text-left opacity-50 shadow-[var(--shadow-soft)] transition duration-500 hover:opacity-70"
              style={{
                transform: "scale(0.9) rotateY(-10deg)",
                borderColor: "var(--border)",
                background: "var(--panel-soft)",
              }}
            >
              <div className="relative h-[240px] overflow-hidden">
                <img
                  src={visible.right.image}
                  alt={visible.right.title}
                  className="h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Featured */}
        <div
          className={`mt-2 flex gap-5 overflow-x-auto pb-2 lg:hidden ${
            showFeatured
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          } transition-all duration-700`}
        >
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="min-w-[290px] overflow-hidden rounded-[24px] border"
              style={{
                borderColor: "var(--border)",
                background: "var(--panel-soft)",
              }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-[220px] w-full object-cover"
                />

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-icon-button absolute right-4 top-4 p-2 text-[var(--text-main)]"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github size={16} />
                </a>
              </div>

              <div className="p-5">
                <h3
                  className="font-mono text-[20px]"
                  style={{ color: "var(--text-main)" }}
                >
                  {project.title}
                </h3>

                <p className="ui-body mt-3">{project.description}</p>

                <p className="ui-accent-meta mt-3">{project.tech}</p>

                <a
                  href={project.live}
                  className="ui-terminal-button mt-5"
                >
                  <span>[</span>
                  <ExternalLink size={16} />
                  <span>view project</span>
                  <span>]</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="ui-meta mb-6 mt-14">
          {moreLabelText}
          {moreLabelText === moreLabelFull && (
            <span className="type-cursor">_</span>
          )}
        </p>

        <div
          className={`grid gap-6 transition-all duration-700 sm:grid-cols-2 xl:grid-cols-4 ${
            showMore ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {moreProjects.map((project) => (
            <div
              key={project.title}
              className="ui-card group p-6"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Folder
                    size={18}
                    className="transition duration-300 group-hover:scale-105"
                    style={{ color: "var(--accent)" }}
                  />

                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="transition"
                      style={{ color: "var(--text-main)" }}
                      aria-label={`${project.title} GitHub`}
                    >
                      <Github size={18} />
                    </a>

                    {project.live && (
                      <a
                        href={project.live}
                        className="transition"
                        style={{ color: "var(--text-main)" }}
                        aria-label={`${project.title} Live`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="font-mono text-[18px] text-slate-50 transition duration-300 group-hover:text-[var(--accent)]">
                  {project.title}
                </h3>
              </div>
              <p className="ui-body mt-5">{project.description}</p>

              <p className="ui-meta mt-8">{project.tech}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}