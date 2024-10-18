import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import TecoHome from "../assets/svg/TecoHome.jsx";
import line from "../assets/imgs/vector-line.png";
import CardTeco from "../assets/imgs/teco-card.png";
import PurpleTeco from "../assets/svg/PurpleTeco.jsx";
import Trinkets from "../assets/imgs/trinkets.png";

const Home = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 800,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="home-container-f">
        <div className="home-container">
          <TecoHome />
        </div>
        <div className="letter-box">
          <h1>A Conexão</h1>
          <h1>Reflete o</h1>
          <h1>Conhecimento</h1>
        </div>
        <div className="letter-button-box">
          <button onClick={handleClick}>Saiba Mais</button>
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
              A <span className="spotlight">colaboração</span> é o principal!
            </h1>
            <p>
              Você tambem é recompensado por ajudar seus amigos! É assim que se
              ganha experiencias e novos cohecimentos
            </p>
          </div>
        </div>
      </div>
      <div class="fourth-section">
        <div class="line-container">
          <img src={line} alt="Linha" />
        </div>
        <div className="container-plan">
          <h1>Planos</h1>
          <div className="plans">
            <Link to="/plans/school" className="plan-1">
              <h2>Escola</h2>
              <p>
                Perfeito para as intituições de ensino menores, que querem
                melhorar a experiencia dos seus alunos e trabalhar a colaboração
                e conexão entre eles!{" "}
              </p>
            </Link>
            <Link to="/plans/institution" className="plan-2">
              <h2>Instituição</h2>
              <p>
                Ótimo para centros que cuidam de várias escolas! Com esse plano
                você tem acesso ao cadastro de unidades e pode deixar todos os
                alunos de todas as unidades criarem conexões e colaborarem entre
                si!
              </p>
            </Link>
          </div>
          <img src={CardTeco} alt="Card Teco" className="card-teco" />
        </div>
        <div className="container-trinkets">
          <img src={Trinkets} alt="coisinhas" />
        </div>
      </div>
      <div className="fifth-container">
        <div className="container-text-footer">
          <h1>ilumine suas ideias</h1>
          <h2>Reflita novas</h2>
          <h1>
            <span className="spotlight">conexões</span>
          </h1>
        </div>
        <footer className="container-fifth"></footer>
      </div>
    </div>
  );
};

export default Home;
