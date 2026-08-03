import styles from "./Cat.module.css";

export default function Cat() {
  return (
    <img
      className={`${styles.cat} rounded-sm object-fill`}
      src="/images/HWP_Bush_Eye_Sc200.gif"
      alt=""
      height={50}
      width={70}
    />
  );
}
