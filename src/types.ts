export type ShapeKind =
  | "head"
  | "dots"
  | "waves"
  | "doors"
  | "twoHeads"
  | "spectrum"
  | "knobs"
  | "split"
  | "headSide"
  | "joinRow"
  | "tips"
  | "none";

export type Scene = {
  id: string;
  /** "title" = פתיחה, "statement" = משפט + צורה, "end" = סיום */
  type: "title" | "statement" | "end";
  /** טקסט שמופיע על המסך (עברית) */
  text: string;
  /** טקסט משני קטן (לא חובה) */
  subtext?: string;
  /** מה שהקריין אומר. לא מוצג, משמש לתזמון ולהקלטה */
  narration?: string;
  /** אורך הסצנה בשניות */
  seconds: number;
  shape?: ShapeKind;
};

export type VideoContent = {
  id: string;
  title: string;
  accent?: string;
  /** נתיב לקובץ קריינות בתיקיית public (לא חובה) */
  voiceover?: string;
  scenes: Scene[];
};
