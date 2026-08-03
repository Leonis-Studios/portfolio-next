"use client";

import Cat from "./Cat";
import BlueGuy from "./BlueGuy";
import BrownGuy from "./BrownGuy";
import GreenGuy from "./GreenGuy";
import Bonfire from "./Bonfire";
import Chest from "./Chest";
import styles from "./Scene.module.css";

export default function Scene() {
  return (
    <div className={styles.mainPageDiv}>
      <div className={styles.blackBar}></div>
      <div className={styles.mainContentDiv}>
        <div className={styles.titleContainer}>
          <div className={styles.titleText}>
            <h1 className="text-[110px]">Hassan Shirazi</h1>
          </div>
          <div className={styles.chooseCharacter}>
            <h2 className="text-[60px]">Choose Your Character!</h2>
          </div>
        </div>
        <Bonfire />
        <GreenGuy />
        <Cat />
        <BlueGuy />
        <BrownGuy />
        <Chest />
      </div>
      <div className={styles.blackBar}></div>
    </div>
  );
}
