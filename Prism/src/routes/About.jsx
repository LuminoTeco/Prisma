import React from 'react'
import styles from "./pages/CSS/About.module.css"
import Lumino from "@assets/imgs/logo_lumino.png"

const About = () => {
  return (
    <div>
       <div className={styles.aboutContainer}>
      <h1>Sobre Nós</h1>

      <section id="SobreNos">
        <div className={styles.container}>
          <div className={styles.introLumino}>
            <img className={styles.luminoLogo} src={Lumino} alt="Logo Lumino Tecnologia" />
          </div>
          <article className={styles.quemSomos}>
            <h2>Quem Somos</h2>
            <p>
              A Lumino Tecnologia é uma empresa de desenvolvimento de softwares personalizados.
              <br />
              Com uma equipe apaixonada, entregamos soluções inovadoras que impulsionam o sucesso de nossos clientes.
              Na Lumino, estamos comprometidos em iluminar o caminho dos nossos clientes por meio de soluções de software personalizadas.
            </p>
          </article>
        </div>
      </section>

      <hr />

      <section id="MVV">
        <h2>A luz da atualidade na sua empresa!</h2>
        <div className={styles.mvvContainer}>
          <div className={styles.missao}>
            <article className={styles.mvv}>
              <h3>Missão</h3>
              <p>
                Expandir e compartilhar nossos conhecimentos em desenvolvimento de softwares, para empresas de pequeno porte.
              </p>
            </article>
          </div>
          <div className={styles.visao}>
            <article className={styles.mvv}>
              <h3>Visão</h3>
              <p>
                Crescer e aumentar nosso raio de alcance para empresas de todos os portes!
                E em breve, expandir nossos serviços para aplicativos mobile.
              </p>
            </article>
          </div>
          <div className={styles.valores}>
            <article className={styles.mvv}>
              <h3>Valores</h3>
              <ol className={styles.valoresList}>
                <li>Personalidade</li>
                <li>Adaptabilidade</li>
                <li>Conhecimento</li>
                <li>Qualidade</li>
                <li>Segurança</li>
              </ol>
            </article>
          </div>
        </div>
      </section>

      <section id="SobreNos">
        <div className={styles.tecoContainer}>
          <article className={styles.mascote}>
            <h2>Mascote</h2>
            <h3>Conheça o Teco!</h3>
            <p>
              Feito de cores sólidas, formas geométricas e com uma barriguinha de nuvem que reflete suas emoções,
              o <span className={styles.destaque}>Teco</span> é o mascote da Lumino, ele está sempre nas nossas produções
              como uma assinatura da empresa!
            </p>
            <div className={styles.introTeco}>
              <img className={styles.tecoEmocoes} src="imgs/Tecos.png" alt="6 mascotes Teco feito em várias poses, cores e expressões diferentes" />
            </div>
          </article>
          <img className={styles.teco} src="imgs/tecoPiscando.gif" alt="Mascote Teco sorrindo e piscando" />
        </div>
      </section>

      <hr />

      <section id="SobreNos">
        <div className={styles.equipeContainer}>
          <article className={styles.nossaEquipe}>
            <h2>Nossa Equipe!</h2>
            <p>
              Somos mais do que apenas desenvolvedores. Somos inovadores, solucionadores de problemas e contadores de histórias.
              Nosso objetivo é construir softwares que não apenas funcionem, mas que inspirem.
              Focamos em soluções adaptáveis, cheias de personalidade e que reflitam a essência do cliente!
            </p>
          </article>
          <div className={styles.equipe}>
            <img className={styles.membrosEquipe} src="imgs/equipa.png" alt="Foto dos membros da equipe da Lumino Tecnologia como seus avatares" />
          </div>
        </div>
      </section>

      <footer id="rodape">
        <ul className={styles.rodapeDevs}>
          <span className={styles.destaque}>Desenvolvido por:</span>
          <li>Caique Santos Damasceno</li>
          <li>Emily Saori Uchino Aoki</li>
          <li>Erick Gonçalves</li>
          <li>Rafael de Souza Berloni</li>
          <li>Soraia Rocha Messias dos Santos</li>
        </ul>
        <ul className={styles.rodapeContatos}>
          <span className={styles.destaque}>Fale Conosco</span>
          <li>
            <a href="mailto:bolt.teco@gmail.com">
              <img src="icons/Mail.png" alt="Email" /> bolt.teco@gmail.com
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/lumino_dev?igsh=dXRzbzh1N244dW1u">
              <img src="icons/Instagram.png" alt="Instagram" /> @Lumino.dev
            </a>
          </li>
          <li>
            <a href="https://wa.me/qr/G4F7CQN24F7VO1">
              <img src="icons/Phone.png" alt="WhatsApp" /> +55 11 91234-5678
            </a>
          </li>
          <li>
            <img src="icons/Clock.png" alt="Horário de Atendimento" /> seg à sex 09:00 - 18:00
          </li>
        </ul>
      </footer>
    </div>
    </div>
  )
}

export default About