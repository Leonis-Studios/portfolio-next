import { projects } from "./projects";

/*
 * Everything shown in the About Me character sheet (opened by the brown character).
 * Images: drop the file in /public/images and set its path, e.g. "/images/me.jpg".
 */
export interface About {
  // Left page
  name: string;
  portrait: {
    src: string;
    alt: string;
    /** "cover" fills the frame and crops the edges (photos); "contain" shows the whole image (sprites, logos). */
    fit: "cover" | "contain";
  };
  stats: { label: string; value: string }[];
  skillsHeading: string;
  skills: string[];
  /** Buttons under the skills. http(s) links open in a new tab; mailto: links open the mail app. */
  links: { label: string; href: string }[];

  // Right page (textbox)
  title: string;
  iconSrc: string;
  bio: string;
}

export const about: About = {
  name: "Hassan Shirazi",
  portrait: {
    // TODO: swap for a profile picture, e.g. { src: "/images/me.jpg", alt: "Hassan Shirazi", fit: "cover" }
    src: "/images/HWP_Brn_Idle_Sc200.gif",
    alt: "Hassan Shirazi",
    fit: "contain",
  },
  stats: [
    { label: "Class", value: "Full-Stack Developer" },
    { label: "Main Stack", value: "React · Node.js · MongoDB" },
    { label: "Quests Completed", value: String(projects.length) },
  ],
  skillsHeading: "Skills",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Material-UI",
    "discord.js",
    "AWS",
    "Firebase",
    "Unity",
  ],
  links: [
    // TODO: replace with real resume/CV URL and email address
    { label: "Resume", href: "https://example.com/TODO-hassan-shirazi-resume" },
    { label: "Email", href: "mailto:TODO@example.com" },
  ],

  title: "About Me",
  iconSrc: "/Hassan_Lion_Website_1_Logo.png",
  // TODO: replace with your own bio
  bio: "Full-stack developer building web apps, Discord bots, and games. Most of my work uses React, Node.js, and MongoDB — from a fast-paced trivia website hosted on Firebase, to a Discord bot running on AWS, to a clicker game made in Unity. This site is built with Next.js and TypeScript.",
};
