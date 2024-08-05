import React from "react";
import TecoHome from "../assets/svg/TecoHome.jsx";
import line from "../assets/imgs/vector-line.png";
import CardTeco from "../assets/imgs/teco-card.png"
import PurpleTeco from "../assets/svg/PurpleTeco.jsx";
import "../App.css";

const Home = () => {
  return (
    <div>
      <div className="home-container-f">
        <div className="home-container">
          <TecoHome />
        </div>
        <div className="letter-box">
          <h1>A Conexão</h1>
          <h1>Reflete</h1>
          <h1>Conhecimento</h1>
        </div>
        <div className="letter-button-box">
          <button>Saiba Mais</button>
        </div>
      </div>
      <div className="second-section">
        <div className="sector-cicle-1"></div>
        <div className="sector-cicle-2"></div>
      </div>
      <div className="second-section-glass">
        <div className="container-group-text-img">
          <div className="container-purple-teco">
            <PurpleTeco />
            <div className="shadow"></div>
          </div>
          <div className="container-second-section-text">
            <h1>Tarefas para</h1>
            <h1>Te manter</h1>
            <h1>Afiado!</h1>
            <hr />
            <p>
              Curtas, dinâmicas e cheias de energia, essas tarefas são perfeitas
              para garantir que você nunca esqueça de praticar o que aprendeu.
              Além disso, são ótimas para descobrir novas habilidades aos
              pouquinhos. Vamos embarcar nessa jornada de aprendizado contínuo e
              divertido!
            </p>
          </div>
        </div>
      </div>
      <div className="third-section">
        <div className="container-center">
          <div className="container-white">
            <h1>
              Juntos somos mais <span className="spotlight">forte!</span>
            </h1>
            <p>
              Dentro do Prisma, você não apenas trabalha, você transforma. 🌟
              Aqui, a colaboração não é apenas uma opção; é a essência do
              sucesso! 🚀 Ajude seu amigo e crie algo verdadeiramente incrível
              juntos. Com o poder da colaboração e o potencial do Prisma, o
              impossível se torna possível. Juntos, vocês vão além dos limites,
              inovando e conquistando novas alturas! 💪✨
            </p>
          </div>
        </div>
      </div>
      <div className="fourth-section">
        <div className="line-container">
          <img src={line} alt="" />
        </div>
        <div className="container-plan">
          <h1>Planos</h1>
          <div className="plans">
          <img src={CardTeco} alt="" />
            <div className="plan-1"></div>
            <div className="plan-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
