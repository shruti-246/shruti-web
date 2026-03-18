import { useEffect, useRef, useState } from "react";
import { Mail, FileText } from "lucide-react";
import HalftonePortrait from "../HalftonePortrait";

// function DotPortrait() {
//   const canvasRef = useRef(null);
//   const [ready, setReady] = useState(false);

//   const mouseRef = useRef({ x: 210, y: 210 });
//   const hoveredRef = useRef(false);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     if (!canvas || !ctx) return;

//     const width = 420;
//     const height = 420;
//     canvas.width = width;
//     canvas.height = height;

//     let animationFrameId;
//     const dots = [];
//     const pointer = { x: width / 2, y: height / 2 };

//     const img = new Image();
//     img.src = "/images/prof.png";

//     img.onload = () => {
//       const off = document.createElement("canvas");
//       off.width = width;
//       off.height = height;
//       const offCtx = off.getContext("2d");
//       if (!offCtx) return;

//       offCtx.clearRect(0, 0, width, height);

//       const scale = Math.min(width / img.width, height / img.height) * 0.8;
//       const drawWidth = img.width * scale;
//       const drawHeight = img.height * scale;

//       const offsetX = (width - drawWidth) / 2;
//       const offsetY = (height - drawHeight) / 2;
//       offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

//       const imageData = offCtx.getImageData(0, 0, width, height).data;

//       let minX = width;
//       let minY = height;
//       let maxX = 0;
//       let maxY = 0;

//       for (let y = 0; y < height; y++) {
//         for (let x = 0; x < width; x++) {
//           const i = (y * width + x) * 4;
//           const alpha = imageData[i + 3];

//           if (alpha > 40) {
//             if (x < minX) minX = x;
//             if (y < minY) minY = y;
//             if (x > maxX) maxX = x;
//             if (y > maxY) maxY = y;
//           }
//         }
//       }

//       if (minX >= maxX || minY >= maxY) return;

//       const boundsWidth = maxX - minX;
//       const boundsHeight = maxY - minY;

//       const centerOffsetX = width / 2 - (minX + boundsWidth / 2);
//       const centerOffsetY = height / 2 - (minY + boundsHeight / 2);

//       const gap = 7;
//       const radius = 1.7;

//       for (let y = minY; y <= maxY; y += gap) {
//         for (let x = minX; x <= maxX; x += gap) {
//           const i = (Math.floor(y) * width + Math.floor(x)) * 4;
//           const alpha = imageData[i + 3];

//           if (alpha < 60) continue;

//           dots.push({
//             baseX: x + centerOffsetX,
//             baseY: y + centerOffsetY,
//             radius,
//             delay: Math.random() * 0.45,
//             progress: 0,
//           });
//         }
//       }

//       setReady(true);

//       const start = performance.now();

//       const render = (t) => {
//         ctx.clearRect(0, 0, width, height);

//         const elapsed = (t - start) / 1000;
//         const mouse = mouseRef.current;

//         const centerX = width / 2;
//         const centerY = height / 2;

//         const parallaxX = (mouse.x - centerX) * 0.012;
//         const parallaxY = (mouse.y - centerY) * 0.012;

//         for (const dot of dots) {
//           const target = Math.max(0, Math.min(1, (elapsed - dot.delay) * 2.3));
//           dot.progress += (target - dot.progress) * 0.08;

//           let x = dot.baseX + parallaxX;
//           let y = dot.baseY + parallaxY;

//           const startY = dot.baseY + 24;
//           y = startY + (y - startY) * dot.progress;

//           if (hoveredRef.current) {
//             const dx = x - pointer.x;
//             const dy = y - pointer.y;
//             const dist = Math.sqrt(dx * dx + dy * dy);

//             if (dist < 42 && dist > 0) {
//               const force = (42 - dist) / 42;
//               x += (dx / dist) * force * 7;
//               y += (dy / dist) * force * 7;
//             }
//           }

//           ctx.beginPath();
//           ctx.fillStyle = "var(--accent)";
//           ctx.shadowColor = "rgba(79, 156, 249, 0.14)";
//           ctx.shadowBlur = 3;
//           ctx.arc(x, y, dot.radius, 0, Math.PI * 2);
//           ctx.fill();
//         }

//         animationFrameId = requestAnimationFrame(render);
//       };

//       animationFrameId = requestAnimationFrame(render);
//     };

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);

//   return (
//     <div className="relative mx-auto flex h-[380px] w-[320px] items-center justify-center">
//       <div
//         className="absolute h-[250px] w-[190px] rounded-full blur-3xl"
//         style={{ background: "var(--accent-soft)" }}
//       />
//       <div
//         className="absolute h-[320px] w-[260px] rounded-full"
//         style={{ border: "1px solid var(--border)" }}
//       />

//       <canvas
//         ref={canvasRef}
//         className={`relative z-10 h-[380px] w-[320px] transition-opacity duration-700 ${
//           ready ? "opacity-100" : "opacity-0"
//         }`}
//         onMouseMove={(e) => {
//           const rect = e.currentTarget.getBoundingClientRect();
//           const scaleX = 420 / rect.width;
//           const scaleY = 420 / rect.height;

//           pointer.x = (e.clientX - rect.left) * scaleX;
//           pointer.y = (e.clientY - rect.top) * scaleY;

//           mouseRef.current = {
//             x: (e.clientX - rect.left) * scaleX,
//             y: (e.clientY - rect.top) * scaleY,
//           };
//         }}
//         onMouseEnter={() => {
//           hoveredRef.current = true;
//         }}
//         onMouseLeave={() => {
//           hoveredRef.current = false;
//           pointer.x = 210;
//           pointer.y = 210;
//           mouseRef.current = { x: 210, y: 210 };
//         }}
//       />
//     </div>
//   );
// }

export default function Hero() {
  const fullText = "Hi there! I'm Shruti";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 70);

      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(() => setShowParagraph(true), 400);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pb-43 pt-32 md:px-10 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1fr]">
        {/* LEFT VISUAL */}
        <div className="relative flex justify-center items-center lg:mt-17">
          <div
            className="absolute -inset-6 rounded-full blur-2xl opacity-30"
            style={{ background: "var(--accent-soft)" }}
          />

          <HalftonePortrait />
        </div>

        {/* RIGHT TEXT */}
        <div className="ml-auto max-w-xl text-left lg:mt-17">
          <p className="ui-section-label">/ welcome</p>

          <h1 className="ui-hero-title">
            {displayText}
            <span className="type-cursor">|</span>
            {displayText.includes("Shruti") && (
              <span className="underline-animation"></span>
            )}
          </h1>

          <div
            className={`ui-block-gap transition-all duration-700 ease-out ${
              showParagraph
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <p className="ui-body">
              I build user-centric applications with a focus on <span class="highlight">software engineering, UI design, and scalable systems</span>. 
              My work blends creativity and technical precision to deliver clean, engaging, and scalable interfaces.
              </p>

            <a
              href="mailto:debnathshruti477@gmail.com"
              className="ui-terminal-button ui-block-gap"
            >
              <span className="ui-terminal-bracket-left">[</span>
              <Mail size={18} className="ui-terminal-icon" />
              <span className="ui-terminal-text">say hello</span>
              <span className="ui-terminal-bracket-right">]</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}