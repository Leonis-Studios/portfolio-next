import { useHover } from "@/hooks/useHover";
import styles from "./BlueGuy.module.css";

// TODO: replace with real LinkedIn profile URL
const LINKEDIN_URL = "https://www.linkedin.com/in/TODO-hassan-shirazi";

export default function BlueGuy() {
  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div className={styles.blueGuyContainer} ref={ref}>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.blueGuy}
      >
        {hovered && (
          <div className={styles.textContainerBlue}>
            <div className={styles.arrowContainerBlue}>
              <img
                src="/images/HWP_Yellow_Arrow_Sc200.gif"
                alt=""
                height={35}
                width={30}
                className="object-fill"
              />
            </div>
            <div className={styles.blueText}>
              <span className="text-3xl font-bold text-red-600">LinkedIn</span>
            </div>
          </div>
        )}
        <img
          src={hovered ? "/images/HWP_Blu_Turn_Sc200.png" : "/images/HWP_Blu_Idle_Sc200.gif"}
          alt="Blue character"
          height={220}
          width={220}
          className="rounded-sm object-fill"
        />
      </a>
    </div>
  );
}
