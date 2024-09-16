import React from 'react'
import './plans.css'
const Plans = () => {
  return (
    <div>
  
      <div className='container'>

        <div className='esquerda'>
          <h1>Plano</h1>
          <h1>ESCOLA</h1>
          <p>Perfeito para as intituições de ensino menores, que querem melhorar a experiencia dos seus alunos e trabalhar a colaboração e conexão entre eles!</p>
          <br /><br /><br /><br /><br />
          <button>Assinar</button>
          <br />
          <img src="/src/routes/pages/Public/imagens/rainbow.png" alt="arco-íris"/>
        </div>

        <div className='direita'>
          <img src="/src/routes/pages/Public/imagens/Image.png" alt="card do plano escola" className='card-imagem'/>
        </div>

        
      </div>


    </div>
  )
}

export default Plans
