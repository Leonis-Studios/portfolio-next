import styles from "./Fireflies.module.css";

// Scene-px positions in the bushes behind the campfire (scene is 2560x1440).
const FIREFLIES = [
  { x: 520, y: 900, delay: 0 },
  { x: 760, y: 820, delay: 2.1 },
  { x: 1020, y: 880, delay: 4.3 },
  { x: 1480, y: 840, delay: 1.2 },
  { x: 1720, y: 910, delay: 3.4 },
  { x: 1960, y: 860, delay: 5.6 },
  { x: 2140, y: 930, delay: 2.8 },
];

export default function Fireflies() {
  return FIREFLIES.map((f, i) => (
    <span
      key={i}
      className={styles.firefly}
      style={{ left: f.x, top: f.y, animationDelay: `${f.delay}s, ${f.delay}s` }}
    />
  ));
}
