import { about } from "@/lib/about";
import InventoryModal from "./InventoryModal";
import styles from "./AboutModal.module.css";

export default function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <InventoryModal
      onClose={onClose}
      detail={{ iconSrc: about.iconSrc, title: about.title, text: about.bio }}
    >
      <div className={styles.sheet}>
        <div className={styles.header}>
          <div className={styles.portrait}>
            <img src={about.portrait.src} alt={about.portrait.alt} />
          </div>
          <div className={styles.headerText}>
            <h2 className={styles.name}>{about.name}</h2>
            <dl className={styles.stats}>
              {about.stats.map((stat) => (
                <div key={stat.label} className="contents">
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <section>
          <h3 className={styles.heading}>{about.skillsHeading}</h3>
          <ul className={styles.skills}>
            {about.skills.map((skill) => (
              <li key={skill} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.actions}>
          {about.links.map((link) => {
            const newTab = !link.href.startsWith("mailto:");
            return (
              <a
                key={link.label}
                href={link.href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
                className={styles.action}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </InventoryModal>
  );
}
