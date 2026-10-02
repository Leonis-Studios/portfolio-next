import type { CSSProperties } from "react";
import styles from "./Bonfire.module.css";

// Fixed (not random) so server and client render the same markup.
const EMBERS = Array.from({ length: 12 }, (_, i) => ({
  x: 470 + ((i * 37) % 60), // px across the 1000px-wide bonfire box; flame is centered at 500
  drift: ((i * 29) % 80) - 40,
  rise: 220 + ((i * 53) % 120),
  duration: 2.4 + (i % 4) * 0.5,
  delay: (i * 0.61) % 4,
}));

export default function Bonfire() {
  return (
    <div className={styles.bonfire}>
      <img
        className="block object-contain"
        src="/images/HWP_Fix_3_Small_CF_Idle_166ms_Sc200.gif"
        alt=""
        height={225}
        width={1000}
      />
      <div className={styles.glow} />
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className={styles.ember}
          style={
            {
              left: e.x,
              "--drift": `${e.drift}px`,
              "--rise": `${-e.rise}px`,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
