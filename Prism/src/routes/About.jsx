import React from 'react'
import styles from "./pages/CSS/About.module.css"
import Lumino from "@assets/imgs/logo_lumino.png"

const About = () => {
  return (
    <div className={styles.ContainerAbout}>
      <section className={styles.FirstSection}>
          <section className={styles.FirstSubSection}>
            <h1>Sobre Nós</h1>
              <div className={styles.ContainerImageAndText}>
                <img src={Lumino} alt="Logo da empresa lumino" />
                <div className="containerText">
                  <span>Quem somos?</span>
                </div>
              </div>
          </section>
          <section className={styles.SecondSubSection}>

          </section>
      </section>
    </div>
  )
}

export default About