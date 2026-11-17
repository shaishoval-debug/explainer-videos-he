import React from "react";
import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { theme } from "../theme";
import { HebrewText } from "../components/HebrewText";
import { Shape } from "../components/Shape";

export const SceneView: React.FC<{ scene: Scene; accent: string }> = ({ scene, accent }) => {
  const isTitle = scene.type === "title";
  const isEnd = scene.type === "end";
  return (
    <AbsoluteFill
      style={{
        backgroundColor: isTitle || isEnd ? theme.ink : theme.background,
        justifyContent: "center",
        alignItems: "center",
        gap: 60,
        padding: 120,
      }}
    >
      {scene.shape && !isTitle && !isEnd ? <Shape kind={scene.shape} accent={accent} /> : null}
      <HebrewText
        text={scene.text}
        size={isTitle ? 120 : 72}
        color={isTitle || isEnd ? theme.background : theme.ink}
        delay={scene.shape ? 15 : 0}
      />
      {scene.subtext ? (
        <HebrewText text={scene.subtext} size={44} weight={400} color={isTitle || isEnd ? accent : theme.ink} delay={25} />
      ) : null}
    </AbsoluteFill>
  );
};
