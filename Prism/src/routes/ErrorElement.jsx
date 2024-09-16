import React from 'react'
import "../App.css"
import Error from '../assets/imgs/error.png'

const ErrorElement = () => {
  return (
    <div>
      <div className="container-error">
       <img src={Error} alt="" />
       <h1>A investigação termina aqui... 🕵️‍♂️</h1>
      </div>
    </div>
  )
}

export default ErrorElement