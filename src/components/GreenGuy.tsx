import { useHover } from "@/hooks/useHover";
import styles from "./GreenGuy.module.css";

// TODO: replace with real GitHub profile URL
const GITHUB_URL = "https://github.com/TODO-hassan-shirazi";

export default function GreenGuy() {
  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div className={styles.greenGuyContainer} ref={ref}>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.greenGuy}
      >
        {hovered && (
          <div className={styles.textContainerGreen}>
            <div className={styles.arrowContainerGreen}>
              <img
                src="/images/HWP_Yellow_Arrow_Sc200.gif"
                alt=""
                height={35}
                width={30}
                className="object-fill"
              />
            </div>
            <div className={styles.greenText}>
              <span className="text-3xl font-bold text-red-600">Github</span>
            </div>
          </div>
        )}
        <img
          src={hovered ? "/images/HWP_Gr_Turn_Sc200.png" : "/images/HWP_Gr_Idle_Sc200.gif"}
          alt="Green character"
          height={200}
          width={220}
          className="rounded-sm object-fill"
        />
      </a>
    </div>
  );
}
