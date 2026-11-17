import React from "react";
import { Composition } from "remotion";
import { Explainer, totalFrames } from "./Explainer";
import { theme } from "./theme";
import { VideoContent } from "./types";
import autism from "../content/autism.json";
import maya from "../content/maya.json";

// כל סרטון = קובץ JSON אחד בתיקיית content, ושורה אחת ברשימה הזו.
const videos: VideoContent[] = [autism as VideoContent, maya as VideoContent];

export const RemotionRoot: React.FC = () => (
  <>
    {videos.map((content) => (
      <Composition
        key={content.id}
        id={content.id}
        component={Explainer}
        durationInFrames={totalFrames(content)}
        fps={theme.fps}
        width={theme.width}
        height={theme.height}
        defaultProps={{ content }}
      />
    ))}
  </>
);
