import { about } from "@/lib/about";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

// /llms.txt (llmstxt.org): a plain-markdown summary for AI assistants, generated from the same data as the modals.
export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    about.bio,
    "",
    "## Skills",
    "",
    ...about.skills.map((skill) => `- ${skill}`),
    "",
    "## Projects",
    "",
    ...projects.map((project) => `- **${project.title}**: ${project.details}`),
    "",
    "## Links",
    "",
    `- [Website](${site.url})`,
    `- [GitHub](${site.links.github})`,
    `- [LinkedIn](${site.links.linkedin})`,
    ...about.links.map((link) => `- [${link.label}](${link.href.startsWith("/") ? site.url + link.href : link.href})`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
