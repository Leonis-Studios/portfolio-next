import styles from "./Bonfire.module.css";

export default function Bonfire() {
  return (
    <img
      className={`${styles.bonfire} object-contain`}
      src="/images/HWP_Fix_3_Small_CF_Idle_166ms_Sc200.gif"
      alt=""
      height={225}
      width={1000}
    />
  );
}
