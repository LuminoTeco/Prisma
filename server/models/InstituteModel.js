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

exports.getInstitueUser = async () => {
  const query = "SELECT IdU, NameInstitute, CE FROM registerUnits";

  try {
    const [results] = await db.query(query);
    return results;
  } catch (err) {
    console.error("Erro ao procurar o usuário:", err);
    throw err; // Propaga o erro para o controlador
  }
};
