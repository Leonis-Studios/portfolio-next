import { useState } from "react";
import { useHover } from "@/hooks/useHover";
import { projects } from "@/lib/projects";
import styles from "./Chest.module.css";

export default function Chest() {
  const { hovered, ref } = useHover<HTMLDivElement>();
  const [opened, setOpened] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

  const selected = projects.find((p) => p.id === selectedProjectId)!;
  const open = () => setOpened(true);
  const close = () => setOpened(false);

  return (
    <>
      {opened && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={close}
        >
          <div
            className={styles.modalScaler}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 h-full">
              <div className={`${styles.portfolioItemCol} min-w-0`}>
                <div className={styles.slotGrid}>
                  {projects.map((project) => (
                    <div key={project.id} className={styles.slotWrap}>
                      <img
                        src="/images/HWP_Ind_Inv_Slot_1920x1080.png"
                        alt=""
                        height={280}
                        width={280}
                        className={`${styles.slotBox} object-fill`}
                      />
                      <img
                        src={project.iconSrc}
                        alt={project.title}
                        className={`${styles.slotIcon} object-fill`}
                        onClick={() => setSelectedProjectId(project.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${styles.descriptionCol} min-w-0`}>
                <div className={styles.descriptionDiv}>
                  <img
                    src="/images/HWP_Inner_Inv_w_Textbox_1920x1080.png"
                    alt=""
                    height={688}
                    width={1096}
                    className="object-fill"
                  />
                  <div className={styles.projectIconDiv}>
                    <img
                      src={selected.iconSrc}
                      alt={selected.title}
                      className="h-full w-full object-fill"
                    />
                  </div>
                  <div className={styles.projectTitleDiv}>
                    <p className={styles.titleText}>{selected.title}</p>
                  </div>
                  <div className={styles.projectDetailsDiv}>
                    <p className={styles.detailsText}>{selected.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div onClick={open}>
        <div className={styles.chestContainer} ref={ref}>
          {hovered && (
            <div className={styles.arrowContainerChest}>
              <img
                src="/images/HWP_Yellow_Arrow_Sc200.gif"
                alt=""
                height={35}
                width={30}
                className="object-fill"
              />
            </div>
          )}
          <img
            src={
              opened
                ? "/images/HWP_Chest_Opening_Sc200.gif"
                : "/images/HWP_Chest_Eye_Sc200.gif"
            }
            alt="Chest"
            height={100}
            width={180}
            className="rounded-sm object-fill"
          />
        </div>
      </div>
    </>
  );
}
