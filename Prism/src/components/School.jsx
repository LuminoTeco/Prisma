import React from "react";
import Rainbow from "../assets/imgs/rainbow.png"
import "./CSS/School.css";

const School = () => {
  return (
    <div>
      <div className="container-plan-page">
        <div className="container-plan-text">
          <div className="plan-h1">
            <h1>ESCOLA</h1>
          </div>
          <p>
            Perfeito para as intituições de ensino menores, que querem melhorar
            a experiencia dos seus alunos e trabalhar a colaboração e conexão
            entre eles!
          </p>
          <button className="button-sign-school">Assinar</button>
          <div className="container-rainbow">
            <img src={Rainbow} alt="" />
          </div>
        </div>
        <div className="container-plan-card">
          <div className="part-text-h1">
            <h1>ESCOLA</h1>
          </div>
          <div className="part-price-h1">
            <sup>R$:</sup> <h1>86,97</h1>
          </div>
          <div className="part-list-li">
            <ul>
              <li>Cadastro de até 600 alunos.</li>
              <li>Tarefas e atividades interativas.</li>
              <li>Plataforma aberta para colaboração entre alunos.</li>
              <li>Cadastro de representantes.</li>
              <li>Acesso a todas as atualizações.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default School;
