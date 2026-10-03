import { projects } from "./projects";
import { site } from "./site";

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
  };
  stats: { label: string; value: string }[];
  skillsHeading: string;
  skills: string[];
  /** Buttons under the skills. Links (including /files like PDFs) open in a new tab; mailto: links open the mail app. */
  links: { label: string; href: string }[];

  // Right page (textbox)
  title: string;
  iconSrc: string;
  bio: string;
}

export const about: About = {
  name: site.name,
  portrait: {
    src: "/images/HassanProfile.jpg",
    alt: "Hassan Shirazi",
  },
  stats: [
    { label: "Class", value: site.jobTitle },
    { label: "Main Stack", value: "MongoDB · Next.js · Godot" },
    { label: "Quests Completed", value: String(projects.length) },
  ],
  skillsHeading: "Skills",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Sanity",
    "MongoDB",
    "Material-UI",
    "discord.js",
    "AWS",
    "Vercel",
    "Godot",
  ],
  links: [
    // URLs live in site.ts; add more buttons here, e.g. { label: "GitHub", href: site.links.github }
    { label: "Resume", href: site.links.resume },
    { label: "Email", href: `mailto:${site.links.email}` },
  ],

  title: "About Me",
  iconSrc: "/Hassan_Lion_Website_1_Logo.png",
  // TODO: replace with your own bio
  bio: "Software developer building web apps, Discord bots, and games. Most of my work uses Next.js, Godot and Sanity — from a fast-paced trivia website hosted on Vercel, to a Discord bot running on AWS, to a video game made in Godot. This site is built with Next.js and TypeScript.",
};
