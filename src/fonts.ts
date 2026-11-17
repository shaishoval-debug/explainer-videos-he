import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// הפונט Heebo נשמר מקומית ב-public/fonts (רישיון SIL OFL), כך שהרינדור לא תלוי באינטרנט.
export const fontFamily = "Heebo";

for (const subset of ["hebrew", "latin"]) {
  for (const weight of ["400", "800"]) {
    loadFont({
      family: fontFamily,
      url: staticFile(`fonts/heebo-${subset}-${weight}-normal.woff2`),
      weight,
    });
  }
}
