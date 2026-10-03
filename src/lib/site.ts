/*
 * Site-wide identity and links. Edit these once; they feed the characters, the About Me sheet,
 * page metadata (title, description, social previews), structured data, sitemap, and /llms.txt.
 */
export const site = {
  /** Production URL, no trailing slash. Set NEXT_PUBLIC_SITE_URL in your host's env vars, or edit the fallback. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sandfish.me").replace(
    /\/$/,
    "",
  ),
  name: "Hassan Shirazi",
  jobTitle: "Software Developer",
  /** ~150 characters. Shown in Google results and link previews, so answer "who is this and what do they do". */
  description:
    "Hassan Shirazi is a software developer building web apps, Discord bots, and games with Godot, Next.js, and MongoDB. View projects, skills, and resume.",
  locale: "en_US",
  links: {
    github: "https://github.com/Nyqvuist",
    linkedin: "https://www.linkedin.com/in/hassan-shirazi-168522237/",
    /** PDF in /public; opens in the browser's PDF viewer in a new tab. Replace the file to update it. */
    resume: "/Hassan_Shirazi_Resume.pdf",
    email: "shiraziahassan@gmail.com",
  },
};
