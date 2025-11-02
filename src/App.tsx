import React, { useEffect, useState } from "react";
import styles from "./styles/main.module.css";
import Player from "./components/Player";
import ProjectsStatus from "./components/ProjectsStatus";
import lovelySong from "../src/assets/lovely.mp3";

const START_DATE = new Date("2025-11-10T00:00:00Z").getTime();
const END_DATE = new Date("2026-11-10T00:00:00Z").getTime();

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(END_DATE - Date.now());
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = END_DATE - now;
      setTimeLeft(remaining > 0 ? remaining : 0);

      const total = END_DATE - START_DATE;
      const elapsed = total - remaining;
      const percentage = Math.min((elapsed / total) * 100, 100);
      setProgress(percentage);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const declension = (num: number, words: [string, string, string]) => {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return words[2];
    if (n1 > 1 && n1 < 5) return words[1];
    if (n1 === 1) return words[0];
    return words[2];
  };

  const getTimeParts = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      { value: days, label: declension(days, ["день", "дня", "дней"]) },
      { value: hours, label: declension(hours, ["час", "часа", "часов"]) },
      { value: minutes, label: declension(minutes, ["минута", "минуты", "минут"]) },
      { value: seconds, label: declension(seconds, ["секунда", "секунды", "секунд"]) },
    ];
  };

  const parts = getTimeParts(timeLeft);

  return (
    <div className={styles.app}>
      <section className={styles.fullscreenSection}>
        <div className={styles.page}>
          <div
            className={styles.iceOverlay}
            style={{ clipPath: `inset(${progress}% 0 0 0)` }}
          />
          <div className={styles.content}>
            <h1 className={styles.title}>До возвращения</h1>
            <p className={styles.subtitle}>всё ещё тает, но время идёт</p>

            <div className={styles.timer}>
              {parts.map((p, idx) => (
                <div key={idx} className={styles.timeBlock}>
                  <span className={styles.timeValue}>{p.value}</span>
                  <span className={styles.timeLabel}>{p.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.playerWrapper}>
              <Player src={lovelySong} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.scrollSection}>
        <ProjectsStatus />
      </section>
    </div>
  );
};

export default App;
