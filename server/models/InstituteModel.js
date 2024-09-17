const db = require("./mysql/db.js");

exports.createInstitute = async (userData) => {
  const query =
    "INSERT INTO registerUnits (`NameInstitute`, `emailInstitute`, `city`, `CE`, `qtdStudents`, `pwd`) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    userData.NameInst,
    userData.emailInstitute,
    userData.city,
    userData.CE,
    userData.qtdStudents,
    userData.pwd,
  ];

  try {
    const [result] = await db.query(query, values);
    return { IuD: result.insertId };
  } catch (err) {
    console.error("Erro ao criar o instituto:", err);
    throw err; // Propaga o erro para o controlador
  }
};

/* 
Isso tá funcionando!

:Caique
*/

exports.getInstituteUser = async (emailInstitute) => {
  const query = "SELECT NameInstitute, pwd FROM registerUnits WHERE emailInstitute = ?";

  try {
    const [results] = await db.query(query, [emailInstitute]);
    return results.length > 0 ? results[0] : null;
  } catch (err) {
    console.error("Erro ao procurar o usuário:", err);
    throw err;
  }
};

