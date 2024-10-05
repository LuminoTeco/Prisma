import React from "react";
import { useParams } from "react-router-dom";

const ClassDetails = () => {
  const { id } = useParams();
  console.log("ID da turma:", id); 

  return (
    <div>
      <h1>Detalhes da Turma com ID: {id}</h1>
    </div>
  );
};

export default ClassDetails;
