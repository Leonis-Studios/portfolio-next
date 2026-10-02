import type { ReactNode } from "react";
import styles from "./InventoryModal.module.css";

export interface DetailCard {
  iconSrc: string;
  title: string;
  text: string;
}

/** Framed two-page inventory screen: `children` fills the scrollable left page, `detail` the right textbox. */
export default function InventoryModal({
  onClose,
  detail,
  children,
}: {
  onClose: () => void;
  detail: DetailCard;
  children: ReactNode;
}) {
  return (
    <div
      className={`${styles.overlay} fixed inset-0 z-50 flex items-center justify-center bg-black/60`}
      onClick={onClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.leftPanel}>{children}</div>
        <div className={styles.details}>
          <img src={detail.iconSrc} alt="" className={styles.detailsIcon} />
          <p className={styles.detailsTitle}>{detail.title}</p>
          <p className={styles.detailsText}>{detail.text}</p>
        </div>
      </div>
    </div>
  );
}
