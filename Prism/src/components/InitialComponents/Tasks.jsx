import React from "react";
import { Link } from "react-router-dom"; 
import styles from "./Tasks.module.css";
import Level from "../datas/LevelObject"; 

const Tasks = () => {
  return (
    <div className={styles.TasksContainerRunner}>
      <h1>Fases</h1>
      <main className={styles.LevelModule}>
        {Level.map((phase) => (
          <div key={phase.id} className={styles.losangoContainer}>
            <Link 
              to={`nivel/${phase.id}`} 
              className={`${styles.losangoLink} ${phase.isFinished ? styles.completed : ""}`}
            >
              <div className={styles.losango}>
                <div className={styles.reflex}></div>
                <span className={styles.phaseId}>{phase.id}</span>
              </div>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Tasks;
