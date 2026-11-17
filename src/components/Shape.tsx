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

  if (kind === "doors") {
    // דלתות שנפתחות, דרכים שונות להגיע לאותו מקום
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
  }

  if (kind === "twoHeads") {
    // שני ראשים זה מול זה, בכל אחד נקודה שהולכת במסלול שונה: שתי דרכים לעבד את אותו עולם
    const headPath = "M150 380 V300 C90 280 70 220 80 170 C95 90 160 50 230 55 C310 60 360 120 350 195 L380 250 L345 255 V300 C345 330 320 340 290 335 V380 Z";
    const t = (frame % 90) / 90;
    return (
      <svg width={900} height={420} viewBox="0 0 900 420" style={{ transform: `scale(${pop})` }}>
        <g transform="translate(60 20)">
          <path d={headPath} fill={theme.ink} />
          <circle cx={225} cy={120 + t * 110} r={20} fill={theme.ink} opacity={0.4} />
        </g>
        <g transform="translate(900 20) scale(-1 1)">
          <path d={headPath} fill={accent} fillOpacity={0.15} stroke={accent} strokeWidth={6} />
          <circle cx={225 - t * 150} cy={175} r={20} fill={accent} />
        </g>
      </svg>
    );
  }

  if (kind === "spectrum") {
    // פס ספקטרום: מגוון רחב, נקודות בגדלים שונים לאורך הפס
    const sizes = [14, 40, 22, 60, 16, 48, 30, 54, 20];
    return (
      <svg width={1200} height={220} viewBox="0 0 1200 220">
        <defs>
          <linearGradient id="spectrumGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#B9B2A0" />
            <stop offset="100%" stopColor={accent} />
          </linearGradient>
        </defs>
        <rect x={40} y={95} width={1120 * pop} height={30} rx={15} fill="url(#spectrumGrad)" />
        {sizes.map((s, i) => (
          <circle key={i} cx={100 + i * 128} cy={110} r={s * pop} fill={theme.ink} />
        ))}
      </svg>
    );
  }

  if (kind === "knobs") {
    // שלושה כפתורי ווליום: קולות, אורות, מגע. האמצעי (אדום) מסתובב חזק יותר
    const angles = [40, interpolate(frame, [10, 50], [40, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), 60];
    const colors = [theme.ink, accent, theme.ink];
    return (
      <svg width={900} height={320} viewBox="0 0 900 320">
        {angles.map((a, i) => {
          const cx = 150 + i * 300;
          const rad = (a * Math.PI) / 180;
          return (
            <g key={i}>
              <circle cx={cx} cy={150} r={90 * pop} fill="none" stroke={colors[i]} strokeWidth={10} />
              <line x1={cx} y1={150} x2={cx + Math.cos(rad) * 70} y2={150 - Math.sin(rad) * 70} stroke={colors[i]} strokeWidth={10} strokeLinecap="round" />
            </g>
          );
        })}
      </svg>
    );
  }

  if (kind === "split") {
    // מסך מפוצל: כיתה מסודרת (שקטה) מול חצר הפסקה (הרבה תנועה)
    const desks = Array.from({ length: 6 });
    const chaos = Array.from({ length: 10 });
    return (
      <svg width={1200} height={360} viewBox="0 0 1200 360">
        <line x1={600} y1={0} x2={600} y2={360} stroke={theme.ink} strokeWidth={4} strokeDasharray="12 10" />
        {desks.map((_, i) => (
          <rect key={i} x={70 + (i % 3) * 150} y={60 + Math.floor(i / 3) * 150} width={100} height={70} rx={8} fill={theme.ink} opacity={0.85 * pop} />
        ))}
        {chaos.map((_, i) => {
          const baseX = 700 + (i % 5) * 90;
          const baseY = 80 + Math.floor(i / 5) * 160;
          const jx = Math.sin(frame / 5 + i) * 30;
          const jy = Math.cos(frame / 4 + i * 2) * 30;
          return <circle key={i} cx={baseX + jx} cy={baseY + jy} r={22} fill={i === 3 ? accent : theme.ink} opacity={0.85} />;
        })}
      </svg>
    );
  }

  if (kind === "headSide") {
    // ראש עם מבט הצידה, וגל קול שנכנס אליו: מקשיבה בדרך שלה
    const headPath = "M150 380 V300 C90 280 70 220 80 170 C95 90 160 50 230 55 C310 60 360 120 350 195 L380 250 L345 255 V300 C345 330 320 340 290 335 V380 Z";
    let wavePath = "M0 175";
    for (let x = 0; x <= 150; x += 15) wavePath += ` L${x} ${175 + Math.sin((x + frame * 8) / 30) * 25}`;
    return (
      <svg width={560} height={420} viewBox="0 0 560 420" style={{ transform: `scale(${pop})` }}>
        <path d={wavePath} stroke={accent} strokeWidth={8} fill="none" transform="translate(0 0)" />
        <g transform="translate(140 20)">
          <path d={headPath} fill={theme.ink} />
          <circle cx={200} cy={175} r={14} fill={theme.background} />
        </g>
      </svg>
    );
  }

  if (kind === "joinRow") {
    // שורת נקודות שחורות, ונקודה אדומה שמצטרפת אליהן מבחוץ
    const n = 7;
    const joinX = interpolate(frame, [10, 45], [-300, 100 + 3 * 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <svg width={1200} height={260} viewBox="0 0 1200 260">
        {Array.from({ length: n }).map((_, i) => (
          <circle key={i} cx={100 + i * 150} cy={130} r={36} fill={theme.ink} />
        ))}
        <circle cx={joinX} cy={130} r={36 * pop} fill={accent} />
      </svg>
    );
  }

  if (kind === "tips") {
    // ארבעה טיפים שמופיעים אחד אחרי השני: לשאול, לדבר ברור, לחכות, להזמין
    const labels = ["?", "...", "⏱", "✓"];
    return (
      <svg width={1100} height={260} viewBox="0 0 1100 260">
        {labels.map((label, i) => {
          const start = i * 15;
          const o = interpolate(frame, [start, start + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y = interpolate(frame, [start, start + 10], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={i} transform={`translate(${75 + i * 260} ${30 + y})`} opacity={o}>
              <circle cx={100} cy={100} r={85} fill={i === 3 ? accent : theme.ink} />
              <text x={100} y={128} fontSize={70} fill={theme.background} textAnchor="middle">
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  return null;
};
