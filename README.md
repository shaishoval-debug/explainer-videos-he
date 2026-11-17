# explainer-videos-he

תבנית קוד פתוח לסרטוני הסבר מונפשים בעברית, בסגנון מינימליסטי: שחור, לבן וצבע הדגשה אחד, צורות פשוטות ושטח ריק.
הסרטון הראשון בסדרה מסביר מה זה אוטיזם.

An open-source template for minimalist, animated Hebrew explainer videos, built with [Remotion](https://www.remotion.dev).

## איך זה עובד

כל סרטון הוא קובץ תוכן אחד (`content/<name>.json`). העיצוב, הצורות והאנימציה משותפים לכל הסרטונים.

```
content/autism.json      ← התסריט: סצנות, טקסטים, קריינות, אורך כל סצנה
src/theme.ts             ← צבעים, גודל ומהירות פריימים
src/components/Shape.tsx ← ספריית הצורות (head, dots, waves, doors)
src/scenes/SceneView.tsx ← איך נראית כל סצנה
src/Root.tsx             ← רשימת הסרטונים
public/fonts             ← הפונט Heebo (SIL OFL), שמור מקומית
public/audio             ← קבצי קריינות (לא חובה)
```

## התקנה והרצה

דרוש [Node.js](https://nodejs.org) 18 ומעלה.

```bash
npm install
npm run studio          # תצוגה מקדימה בדפדפן
npm run render:autism   # רינדור ל-out/autism.mp4
```

## יצירת סרטון חדש

1. מעתיקים את `content/autism.json` לקובץ חדש, למשל `content/adhd.json`, ומשנים את `id`, הכותרת והסצנות.
2. מוסיפים אותו לרשימה ב-`src/Root.tsx`.
3. אם יש קריינות, שמים אותה ב-`public/audio/` ומוסיפים `"voiceover": "audio/adhd.mp3"` לקובץ התוכן.
4. `npx remotion render adhd out/adhd.mp4`

## רישיונות

- הקוד בריפו הזה: MIT (ראו `LICENSE`).
- הפונט Heebo: SIL Open Font License 1.1 (ראו `public/fonts/OFL-Heebo.txt`).
- **Remotion אינו MIT.** הוא חינמי לאנשים פרטיים, לעמותות ולחברות עד 3 עובדים. חברה גדולה יותר שמשתמשת בתבנית צריכה רישיון משלה מ-Remotion. פרטים: https://www.remotion.dev/license

## השראה

הסגנון הוויזואלי בהשראת הגישה של המאייר נועם בר (Noma Bar): מטאפורה אחת, שטח שלילי ופלטה מצומצמת. כל האיורים בריפו מקוריים.
