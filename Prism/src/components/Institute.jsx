import React from "react";
import "./CSS/Institute.css"
import Rainbow from "../assets/imgs/rainbow.png"

const Institute = () => {
  return (
    <div>
    <div className="plan-page-container">
      <div className="plan-description">
        <div className="plan-title">
          <h1>INSTITUIÇÃO</h1>
        </div>
        <p>
          Ótimo para centros que cuidam de várias escolas! Com esse plano você
          tem acesso ao cadastro de unidades e pode deixar todos os alunos de
          todas as unidades criarem conexões e colaborarem entre si!
        </p>
        <button className="subscribe-button">Assinar</button>
        <div className="rainbow-overlay">
          <img src={Rainbow} alt="Rainbow decoration" />
        </div>
      </div>
      <div className="plan-card">
        <div className="card-title">
          <h1>Instituição</h1>
        </div>
        <div className="card-price">
          <sup>R$:</sup> <h1>112,35</h1>
        </div>
        <div className="card-features">
          <ul>
            <li>Cadastro de até 4 unidades.</li>
            <li>Cadastro de alunos por unidade.</li>
            <li>Tarefas e atividades interativas.</li>
            <li>Plataforma aberta para colaboração entre alunos.</li>
            <li>Acesso a todas as atualizações.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Institute;
