import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

export default function Hero() {
  const fullText = "Hi there! I'm Shruti";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 70);

      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setShowParagraph(true), 400);
    }
  }, [index]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pt-32 pb-20 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_1fr] gap-16 items-center">

        {/* LEFT GRAPH VISUAL */}
        <div className="hidden lg:flex justify-center">
          <div className="relative w-[320px] h-[320px] opacity-70">
            <div className="absolute inset-0 rounded-full bg-[rgba(78,231,212,0.05)] blur-3xl"></div>
            <div className="w-full h-full border border-[rgba(78,231,212,0.1)] rounded-full flex items-center justify-center text-[var(--accent)]">
              knowledge graph
            </div>
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="max-w-xl ml-auto text-left">

          {/* NOTEBOOK LABEL */}
          <p className="text-[18px] font-mono text-[var(--accent)] mb-6">
            / welcome
          </p>

          {/* TYPEWRITER TITLE */}
          <h1 className="text-[30px] font-mono font-semibold tracking-tight text-slate-100 leading-tight">

            {displayText}

            {/* BLINKING CURSOR */}
            <span className="type-cursor">|</span>

            {/* HAND DRAWN UNDERLINE */}
            {displayText.includes("Shruti") && (
              <span className="underline-animation"></span>
            )}
          </h1>

          {/* PARAGRAPH */}
          <div
            className={`transition-all duration-700 ease-out mt-10 ${
              showParagraph
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-[14px] leading-6 text-[var(--text-soft)]">
              I'm a Computer Science student at the University of Idaho who
              enjoys building software and exploring systems. I like
              experimenting with UI ideas and creating things from scratch.
            </p>

            <p className="text-[14px] leading-6 text-[var(--text-soft)]">
              Outside of coding, I enjoy painting, sketching, and photography.
            </p>

            {/* SAY HELLO BUTTON */}
            <a
                href="mailto:your-email@example.com"
                className="sayhello-btn mt-10 inline-flex items-center gap-3"
                >
                <span className="bracket">[</span>

                <Mail size={18} />

                <span className="sayhello-text">say hello</span>

                <span className="bracket">]</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}