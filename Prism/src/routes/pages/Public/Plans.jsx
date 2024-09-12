import React from 'react'
import './plans.css'
const Plans = () => {
  return (
    <div>
  
      <nav>
        <img src="/src/routes/pages/Public/imagens/Logo.svg" alt="logo prisma" />  
      </nav>
  
      <div className='container'>

        <div className='esquerda'>
         <h1>Plano</h1>
         <h1>ESCOLA</h1>
         <p>Perfeito para as intituições de ensino menores, que querem melhorar a experiencia dos seus alunos e trabalhar a colaboração e conexão entre eles! </p>
        </div>
      
        <div className='direita'>
          <div className='card'>
           <img src="/src/routes/pages/Public/imagens/Image.png" alt="card com informações do plano escola" />
          </div>
        </div>
        
        <button>Assinar</button> 
          <br/> 
          <img src="/src/routes/pages/Public/imagens/rainbow.png" alt="arco-íris" />
          
      </div>


    </div>
  )
}

export default Plans
