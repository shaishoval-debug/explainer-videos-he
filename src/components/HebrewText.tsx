import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { fontFamily } from "../fonts";
import { theme } from "../theme";

export const HebrewText: React.FC<{
  text: string;
  size?: number;
  weight?: 400 | 800;
  delay?: number;
  color?: string;
}> = ({ text, size = 72, weight = 800, delay = 0, color = theme.ink }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame - delay, [0, 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      dir="rtl"
      style={{
        fontFamily,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight: 1.25,
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
        maxWidth: 1500,
        whiteSpace: "pre-line",
      }}
    >
      {text}
    </div>
  );
};
