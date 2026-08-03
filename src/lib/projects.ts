export interface Project {
  id: string;
  title: string;
  details: string;
  iconSrc: string;
}

export const projects: Project[] = [
  {
    id: "gavlans",
    title: "Gavlans Game Website",
    details:
      "This site was created using React, MongoDB, Node.js, Express.js, and Material-UI. This is a fast paced trivia game where the faster the player answers the question right, the more points they get. Fullstack website hosted firebase with a custom database using MongoDB.",
    iconSrc: "/images/Gavlans_Game_Logo_v2.png",
  },
  {
    id: "hashashin",
    title: "Hashashin Discord Bot",
    details:
      "A discord bot created with discord.js. Using multiple API's like Pokemon and Steam to give users information with slash commands. MongoDB is being used for some commands, and the bot is hosted using AWS.",
    iconSrc: "/images/Hassan_Discord_Lion_Logo.png",
  },
  {
    id: "statue",
    title: "Idyllic Statue",
    details:
      "Clicker game made in Unity2D. Game focuses on clicking the statue to gain currency and purchase currency generators. Random events spawn throughout playing the game.",
    iconSrc: "/images/Statue 112x112.png",
  },
];
