import React from "react";
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { VideoContent } from "./types";
import { theme } from "./theme";
import { SceneView } from "./scenes/SceneView";

export const totalFrames = (content: VideoContent) =>
  content.scenes.reduce((sum, s) => sum + Math.round(s.seconds * theme.fps), 0);

export const Explainer: React.FC<{ content: VideoContent }> = ({ content }) => {
  const accent = content.accent ?? theme.accentDefault;
  return (
    <AbsoluteFill style={{ backgroundColor: theme.background }}>
      <Series>
        {content.scenes.map((scene) => (
          <Series.Sequence key={scene.id} durationInFrames={Math.round(scene.seconds * theme.fps)}>
            <SceneView scene={scene} accent={accent} />
          </Series.Sequence>
        ))}
      </Series>
      {content.voiceover ? <Audio src={staticFile(content.voiceover)} /> : null}
    </AbsoluteFill>
  );
};
