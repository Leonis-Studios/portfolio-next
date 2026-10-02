import type { Character as CharacterData } from "@/lib/characters";
import styles from "./Character.module.css";

/** Renders a link when the character has an `href`, otherwise a button that calls `onClick`. */
export default function Character({
  character: c,
  onClick,
}: {
  character: CharacterData;
  onClick?: () => void;
}) {
  const style = {
    bottom: `var(--${c.id}-bottom)`,
    left: `var(--${c.id}-left)`,
    zIndex: `var(--${c.id}-z)`,
  };

  const content = (
    <>
      <span className={styles.label} style={{ left: c.head.x, top: c.head.y }}>
        <img src="/images/HWP_Yellow_Arrow_Sc200.gif" alt="" height={35} width={30} />
        <span className="text-3xl font-bold text-red-600">{c.label}</span>
      </span>
      <img
        src={c.idleSrc}
        alt={c.alt}
        width={c.width}
        height={c.height}
        className={`${styles.idleSprite} rounded-sm object-fill`}
      />
      <img
        src={c.hoverSrc}
        alt=""
        width={c.width}
        height={c.height}
        className={`${styles.hoverSprite} rounded-sm object-fill`}
      />
    </>
  );

  return c.href ? (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.character}
      style={style}
    >
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={styles.character} style={style}>
      {content}
    </button>
  );
}
