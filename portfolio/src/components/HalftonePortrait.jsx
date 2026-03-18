import { useEffect, useRef } from "react";

export default function HalftonePortrait() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = "/images/hg.jpg"; // your photo

    img.onload = () => {
      const width = 300;
      const height = 400;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      ctx.clearRect(0, 0, width, height);

      const dotSize = 5;

      for (let y = 0; y < height; y += dotSize) {
        for (let x = 0; x < width; x += dotSize) {
          const index = (y * width + x) * 4;

          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];

          // grayscale
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b);

          const radius = (brightness / 255) * (dotSize / 2);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = "#0ea5e9"; // blue accent
          ctx.fill();
        }
      }
    };
  }, []);

  return (
    <canvas
        ref={canvasRef}
        className="w-full max-w-[200px] rounded-[28px] rounded-[28px] canvas-float"
    />
  );
}