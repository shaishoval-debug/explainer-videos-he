import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShapeKind } from "../types";
import { theme } from "../theme";

// צורות מקוריות ופשוטות. כל צורה חדשה מתווספת כאן ומקבלת שם ב-types.ts.
export const Shape: React.FC<{ kind: ShapeKind; accent: string }> = ({ kind, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 14 } });

  if (kind === "none") return null;

  if (kind === "head") {
    // ראש בפרופיל, ובתוכו נקודה אדומה שגדלה: "המוח מעבד אחרת"
    const r = interpolate(frame, [10, 50], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <svg width={420} height={420} viewBox="0 0 420 420" style={{ transform: `scale(${pop})` }}>
        <path d="M150 380 V300 C90 280 70 220 80 170 C95 90 160 50 230 55 C310 60 360 120 350 195 L380 250 L345 255 V300 C345 330 320 340 290 335 V380 Z" fill={theme.ink} />
        <circle cx={225} cy={175} r={r} fill={accent} />
      </svg>
    );
  }

  if (kind === "dots") {
    // שורה של נקודות שחורות, ונקודה אחת אדומה שזזה בקצב משלה
    const dots = Array.from({ length: 9 });
    return (
      <svg width={1200} height={300} viewBox="0 0 1200 300">
        {dots.map((_, i) => {
          const isAccent = i === 4;
          const y = isAccent ? 150 + Math.sin(frame / 8) * 60 : 150;
          return <circle key={i} cx={120 + i * 120} cy={y} r={36 * pop} fill={isAccent ? accent : theme.ink} />;
        })}
      </svg>
    );
  }

  if (kind === "waves") {
    // גלים: עוצמת גירויים (קול, אור, מגע)
    const amp = interpolate(frame, [0, 60], [10, 70], { extrapolateRight: "clamp" });
    const path = (offset: number) => {
      let d = "M0 150";
      for (let x = 0; x <= 1200; x += 20) d += ` L${x} ${150 + Math.sin((x + frame * 6 + offset) / 60) * amp}`;
      return d;
    };
    return (
      <svg width={1200} height={300} viewBox="0 0 1200 300">
        <path d={path(0)} stroke={theme.ink} strokeWidth={10} fill="none" />
        <path d={path(90)} stroke={accent} strokeWidth={10} fill="none" />
      </svg>
    );
  }

  // doors: דלתות שנפתחות, דרכים שונות להגיע לאותו מקום
  const open = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg width={900} height={360} viewBox="0 0 900 360">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${90 + i * 270} 30)`}>
          <rect width={180} height={300} fill={i === 1 ? accent : theme.ink} />
          <rect width={180 * (1 - open * 0.8)} height={300} fill={theme.background} stroke={theme.ink} strokeWidth={6} />
        </g>
      ))}
    </svg>
  );
};
