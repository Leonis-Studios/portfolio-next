"use client";

import { useState } from "react";
import Cat from "./Cat";
import Character from "./Character";
import Bonfire from "./Bonfire";
import Chest from "./Chest";
import Fireflies from "./Fireflies";
import AboutModal from "./AboutModal";
import { characters } from "@/lib/characters";
import styles from "./Scene.module.css";

export default function Scene() {
  const [aboutOpen, setAboutOpen] = useState(false);

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
        <Fireflies />
        <Bonfire />
        <Cat />
        {characters.map((c) => (
          <Character key={c.id} character={c} onClick={() => setAboutOpen(true)} />
        ))}
        <Chest />
        {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}
      </div>
      <div className={styles.blackBar}></div>
    </div>
  );
}
