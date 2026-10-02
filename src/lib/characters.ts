export interface Character {
  /** Matches the --{id}-bottom / --{id}-left / --{id}-z position vars in Scene.module.css. */
  id: string;
  /** Hover label shown above the character. */
  label: string;
  /** External link. Leave out to make the character open the About Me sheet instead. */
  href?: string;
  alt: string;
  idleSrc: string;
  hoverSrc: string;
  width: number;
  height: number;
  /** Point (px from the sprite's top-left) the hover arrow + label sit centered above. */
  head: { x: number; y: number };
}

export const characters: Character[] = [
  {
    id: "greenguy",
    label: "Github",
    // TODO: replace with real GitHub profile URL
    href: "https://github.com/TODO-hassan-shirazi",
    alt: "Green character",
    idleSrc: "/images/HWP_Gr_Idle_Sc200.gif",
    hoverSrc: "/images/HWP_Gr_Turn_Sc200.png",
    width: 220,
    height: 200,
    head: { x: 134, y: 9 },
  },
  {
    id: "blueguy",
    label: "LinkedIn",
    // TODO: replace with real LinkedIn profile URL
    href: "https://www.linkedin.com/in/TODO-hassan-shirazi",
    alt: "Blue character",
    idleSrc: "/images/HWP_Blu_Idle_Sc200.gif",
    hoverSrc: "/images/HWP_Blu_Turn_Sc200.png",
    width: 220,
    height: 220,
    head: { x: 119, y: 12 },
  },
  {
    id: "brownguy",
    label: "About Me",
    alt: "Brown character",
    idleSrc: "/images/HWP_Brn_Idle_Sc200.gif",
    hoverSrc: "/images/HWP_Brn_Turn_Sc200.png",
    width: 220,
    height: 220,
    head: { x: 95, y: 8 },
  },
];
