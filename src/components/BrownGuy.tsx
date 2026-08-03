import { useHover } from "@/hooks/useHover";
import styles from "./BrownGuy.module.css";

// TODO: replace with real resume/CV URL
const RESUME_URL = "https://example.com/TODO-hassan-shirazi-resume";

export default function BrownGuy() {
  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div className={styles.brownGuyContainer} ref={ref}>
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.brownGuy}
      >
        {hovered && (
          <div className={styles.textContainerBrown}>
            <div className={styles.arrowContainerBrown}>
              <img
                src="/images/HWP_Yellow_Arrow_Sc200.gif"
                alt=""
                height={35}
                width={30}
                className="object-fill"
              />
            </div>
            <div className={styles.brownText}>
              <span className="text-3xl font-bold text-red-600">Hello</span>
            </div>
          </div>
        )}
        <img
          src={hovered ? "/images/HWP_Brn_Turn_Sc200.png" : "/images/HWP_Brn_Idle_Sc200.gif"}
          alt="Brown character"
          height={220}
          width={220}
          className="rounded-sm object-fill"
        />
      </a>
    </div>
  );
}
