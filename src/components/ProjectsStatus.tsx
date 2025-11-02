import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/ProjectsStatus.module.css";

const ProjectsStatus: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${styles.container} ${isVisible ? styles.visible : ""}`}
    >
      <h2 className={styles.title}>Статус проектов</h2>
      <p className={styles.text}>
        Все текущие проекты временно находятся в состоянии приостановки — процессы
        «заморожены» до дальнейшего распоряжения. На данном этапе задачи фиксируются
        в исходном состоянии, документация и техническая подготовка ведутся командой
        проектов.
      </p>
      <p className={styles.text}>
        Все IT-заказы находятся под контролем и обеспечиваются командой проектов,
        которая гарантирует сохранность данных и готовность к оперативной реализации
        после «разморозки».
      </p>
      <p className={styles.text}>
        Эта мера позволяет централизованно координировать ресурсы и обеспечить
        максимальную эффективность выполнения задач в момент, когда проекты будут
        активированы. Все процессы ведутся строго в рамках внутреннего регламента и
        с соблюдением конфиденциальности.
      </p>
      <p className={styles.signature}>Отец Назар</p>
    </section>
  );
};

export default ProjectsStatus;
