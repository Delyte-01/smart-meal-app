"use client";

import React from "react";

type FireLoaderProps = {
  size?: number; // px
  color?: string; // CSS color for main flame (Tailwind tokens or hex)
  secondaryColor?: string; // inner/secondary color
  className?: string;
};

export default function FireLoader({
  size = 72,
  color = "#FF6B35",
  secondaryColor = "#FFB36B",
  className = "",
}: FireLoaderProps) {
  const id = React.useId();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex flex-col items-center gap-3 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="block"
      >
        <defs>
          {/* small flicker animation using <animate> inside paths with unique ids */}
          <linearGradient id={`grad-${id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* outer glow */}
        <g opacity="0.9">
          <path
            d="M32 60c6-6 14-14 14-26 0-9-6-16-11-22-1.6 6-5.5 9.5-8 12-2.6-2.5-6.4-6-8.5-12C18 18 12 25 12 34c0 12 8 20 20 26z"
            fill={`url(#grad-${id})`}
            style={{
              transformOrigin: "32px 32px",
              animation: "flame-sway 1400ms ease-in-out infinite",
            }}
          />
        </g>

        {/* inner core (flickering) */}
        <path
          d="M32 46c4-4 9-9 9-16 0-5-3-9-7-12-.9 3-3 4.7-4.3 6-1.4-1.3-3.4-3-4.6-6C27 19 25 22 25 26c0 7 4 11 7 20z"
          fill={secondaryColor}
          style={{
            transformOrigin: "32px 32px",
            animation: "inner-flicker 900ms linear infinite",
          }}
        />

        {/* small spark — rises and fades */}
        <circle
          cx="38"
          cy="12"
          r="2.2"
          fill={color}
          style={{
            animation: "spark-rise 1100ms ease-in-out infinite",
            transformOrigin: "38px 12px",
          }}
        />
      </svg>


      <style jsx>{`
        @keyframes flame-sway {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          40% {
            transform: translateY(-1px) scale(1.02);
            opacity: 0.95;
          }
          70% {
            transform: translateY(0) scale(1.01);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes inner-flicker {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          30% {
            transform: translateY(-1px) scale(1.03);
            opacity: 0.9;
          }
          60% {
            transform: translateY(0) scale(0.98);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes spark-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-6px) scale(1.1);
            opacity: 0.6;
          }
          100% {
            transform: translateY(-12px) scale(0.9);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
