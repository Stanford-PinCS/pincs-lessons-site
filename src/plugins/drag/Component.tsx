import { observer } from "mobx-react-lite";
import React, { useRef, useEffect, useState } from "react";
import State from "./state";

const Component = observer(({ state }: { state: State | undefined }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(10); // Pixels per meter
  const [offsetX, setOffsetX] = useState(75); // Offset for x-axis to center the ball
  const [offsetY, setOffsetY] = useState(400); // Offset for y-axis to invert and position

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state) return;

    const container = canvas.parentElement;
    if (!container) return;

    const setCanvasDimensions = () => {
      canvas.width = container.clientWidth - 50;
      canvas.height = container.clientHeight - 50;
      setOffsetX(canvas.width / 4);
      setOffsetY((canvas.height * 3) / 4);
      setScale(Math.min(canvas.width / 50, canvas.height / 50));
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.beginPath();
      ctx.moveTo(0, offsetY);
      ctx.lineTo(canvas.width, offsetY);
      ctx.strokeStyle = "#555";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw predicted path
      ctx.fillStyle = "blue";
      state.predictedPath.forEach((pos) => {
        const x = pos.x * scale + offsetX;
        const y = offsetY - pos.y * scale;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw actual path
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      state.actualPath.forEach((pos, index) => {
        const x = pos.x * scale + offsetX;
        const y = offsetY - pos.y * scale;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw tennis ball
      ctx.beginPath();
      ctx.arc(
        state.ballPosition.x * scale + offsetX,
        offsetY - state.ballPosition.y * scale,
        10,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw legend
      ctx.font = "16px Arial";
      ctx.fillStyle = "blue";
      ctx.fillText("Blue: Predicted Path", 10, 30);
      ctx.fillStyle = "green";
      ctx.fillText("Green: Actual Path", 10, 50);

      if (state.error) {
        ctx.fillStyle = "red";
        ctx.font = "16px Arial";
        ctx.fillText(`Error: ${state.error}`, 10, 70);
      }
    };

    draw();
  }, [
    state?.predictedPath,
    state?.actualPath,
    state?.ballPosition,
    state?.isComplete,
    state?.error,
    state?.currentAnimation,
    scale,
    offsetX,
    offsetY,
  ]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <canvas
        ref={canvasRef}
        className="bg-white border border-gray-300 shadow-lg"
      ></canvas>
    </div>
  );
});

export default Component;
