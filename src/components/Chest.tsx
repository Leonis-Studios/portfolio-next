import { useState } from "react";
import { projects } from "@/lib/projects";
import InventoryModal from "./InventoryModal";
import styles from "./Chest.module.css";

export default function Chest() {
  const [opened, setOpened] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = projects[selectedIndex];

  return (
    <>
      {opened && (
        <InventoryModal
          onClose={() => setOpened(false)}
          detail={{ iconSrc: selected.iconSrc, title: selected.title, text: selected.details }}
        >
          <div className={styles.slotGrid}>
            {projects.map((project, i) => (
              <button
                key={project.title}
                type="button"
                className={styles.slot}
                onClick={() => setSelectedIndex(i)}
              >
                <img src={project.iconSrc} alt={project.title} className={styles.slotIcon} />
              </button>
            ))}
          </div>
        </InventoryModal>
      )}
      <button type="button" className={styles.chestContainer} onClick={() => setOpened(true)}>
        <img
          src="/images/HWP_Yellow_Arrow_Sc200.gif"
          alt=""
          height={35}
          width={30}
          className={styles.arrowContainerChest}
        />
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
      </button>
    </>
  );
}
