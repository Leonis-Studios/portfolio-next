import { about } from "@/lib/about";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/*
 * The modals only render after a click, so search engines and AI crawlers never see that text.
 * This mirrors it as plain server-rendered HTML (visually hidden, still read by crawlers and screen readers),
 * plus JSON-LD structured data. Everything comes from src/lib, so it stays in sync with the modals.
 */
export default function SeoContent() {
  const personId = `${site.url}/#person`;
  const sameAs = [site.links.github, site.links.linkedin].filter((url) => !url.includes("TODO"));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: `${site.name} | ${site.jobTitle}`,
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        jobTitle: site.jobTitle,
        description: about.bio,
        image: `${site.url}${about.iconSrc}`,
        knowsAbout: about.skills,
        sameAs,
      },
      ...projects.map((project) => ({
        "@type": "CreativeWork",
        name: project.title,
        description: project.details,
        image: `${site.url}${encodeURI(project.iconSrc)}`,
        creator: { "@id": personId },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="sr-only">
        <section aria-labelledby="seo-about">
          <h2 id="seo-about">
            About {site.name}, {site.jobTitle}
          </h2>
          <p>{about.bio}</p>
          <h3>{about.skillsHeading}</h3>
          <ul>
            {about.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <ul>
            <li>
              <a href={site.links.github}>GitHub</a>
            </li>
            <li>
              <a href={site.links.linkedin}>LinkedIn</a>
            </li>
            {about.links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="seo-projects">
          <h2 id="seo-projects">Projects</h2>
          {projects.map((project) => (
            <article key={project.title}>
              <h3>{project.title}</h3>
              <p>{project.details}</p>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
