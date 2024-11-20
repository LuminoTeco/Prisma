import React from "react";
import styles from "./pages/CSS/About.module.css";
import Lumino from "@assets/imgs/logo_lumino.png";
import mascote from "@assets/imgs/tecos-mascote.png";
import equipe from "@assets/imgs/equipa.png";

const About = () => {
  return (
    <div>
      <div className={styles.containerAbout}>
        {/* First section */}

        <section className={styles.containerTextAboutUs}>
          <h1>Sobre Nós</h1>
          <div className={styles.TextImgContainer}>
            <div className={styles.ImgContainer}>
              <img src={Lumino} alt="Lumino" />
            </div>
            <div className={styles.TextContainer}>
              <span>Quem somos?</span>
              <p>
                A Lumino Tecnologia é uma empresa de desenvolvimento de
                softwares personalizados. <br />
                Com uma equipe apaixonada, entregamos soluções inovadoras que
                impulsionam o sucesso de nossos clientes. Na Lumino, estamos
                comprometidos em iluminar o caminho dos nossos clientes por meio
                de soluções de software personalizados.
              </p>
            </div>
          </div>
        </section>

        {/* Second section */}

        <section className={styles.ValueContainer}>
          <div className={styles.containerTextCard}>
            <h2>A luz da atualidade na sua empresa!</h2>
          </div>
          <div className={styles.containerCard}>
            <div className={styles.Card}>
              <span>Missão</span>

              <p>
                Expandir e compartilhar nossos conhecimentos em desenvolvimento
                de softwares, para empresas de pequeno porte .
              </p>
            </div>
            <div className={styles.Card}>
              <span>Visão</span>

              <p>
                Crescer e aumentar nosso raio de alcance para todas as empresas!
                Em breve, expandir nossos serviços para aplicativos mobile.
              </p>
            </div>
            <div className={styles.Card}>
              <span>Valores</span>

              <p className={styles.list}>
                1. Personalidade <br />
                2. Adaptabilidae <br />
                3. Conhecimento <br />
                4. Qualidade <br />
                5. Segurança <br />
                6. Sucesso <br />
              </p>
            </div>
          </div>
        </section>

        {/* Third section */}

        <section className={styles.ContainerMascote}>
          <div className={styles.CenterContainer}>
            <div className={styles.containerTextMasc}>
              <h1>Mascote</h1>
              <span>Conheça o teco!</span>
              <p>
                Feito de cores sólidas, formas geométricas e com uma barriguinha
                de nuvem que reflete suas emoções, o TECO é o mascote da Lumino,
                ele está sempre nas nossas produções como uma assinatura da
                empresa!
              </p>
            </div>
            <div className={styles.containerMascImg}>
              <img src={mascote} alt="" />
            </div>
            <hr />
          </div>
        </section>

        {/* Fourth section */}

        <section className={styles.ContainerTeam}>
          <div className={styles.ContainerTeamCenter}>
            <div className={styles.ContainerTextTeam}>
              <h1>Nossa Equipe</h1>
              <p>
                Somos mais do que apenas desenvolvedores. Somos inovadores,
                solucionadores de problemas e contadores de histórias. Nosso
                objetivo é construir softwares que não apenas funcionem, mas que
                inspirem. Focamos em soluções adaptáveis, cheias de
                personalidade e que reflitam a essência do cliente!
              </p>
            </div>
            <div className={styles.ContainerImgTeam}>
              <img src={equipe} alt="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
