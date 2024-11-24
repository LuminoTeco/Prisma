import React, { useEffect, useState } from "react";
import styles from "./ranking.module.css";
import axios from "axios";

const Ranking = () => {
  const [CodEscolarInstituicao, SetCodEscolarInstituicao] = useState("");
  const [ranking, setRanking] = useState([]);
  const [friendsRanking, setFriendsRanking] = useState([]); // Novo estado para os amigos
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      setUserId(JSON.parse(storedUser));
    }
  }, []);

  const { aluno_id } = userId || {};

  // Buscando o Cod_Escolar da instituição
  useEffect(() => {
    if (aluno_id) {
      axios
        .get(`http://localhost:8081/prisma/allinformation/${aluno_id}`)
        .then((response) => {
          const { cod_escolar } = response.data.result[0];
          SetCodEscolarInstituicao(cod_escolar);
          console.log("Cod_Escolar:", cod_escolar);
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados:", error);
        });
    }
  }, [aluno_id]);

  // Buscando o ranking principal
  useEffect(() => {
    if (CodEscolarInstituicao) {
      axios
        .get(`http://localhost:8081/prisma/ranking`, {
          params: {
            Cod_Escolar: CodEscolarInstituicao,
          },
        })
        .then((response) => {
          setRanking(response.data);
          console.log("Ranking:", response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar o ranking:", error.response || error);
        });
    }
  }, [CodEscolarInstituicao]);

  useEffect(() => {
    if (CodEscolarInstituicao && aluno_id) {
      axios
        .get(`http://localhost:8081/prisma/friendsRank`, {
          params: {
            Cod_Escolar: CodEscolarInstituicao,
            id_aluno: aluno_id,
          },
        })
        .then((response) => {
          setFriendsRanking(response.data);
          console.log("Ranking dos amigos:", response.data);
        })
        .catch((error) => {
          console.error(
            "Erro ao buscar o ranking dos amigos:",
            error.response || error
          );
        });
    }
  }, [CodEscolarInstituicao, aluno_id]);

  return (
    <div className={styles.RankingContainer}>
      <div className={styles.RankingInsituicao}>
        <div className={styles.TextRanking}>
          <h1>Ranking</h1>
          <p>
            Aqui você pode ver o ranking da sua escola. Não fique para trás!
          </p>
        </div>
        <hr />
        <main>
          {ranking.length > 0 ? (
            <ul className={styles.RankingList}>
              {ranking.map((item, index) => (
                <li
                  key={item.aluno_id}
                  className={`${styles.RankingItem} ${
                    aluno_id === item.aluno_id ? styles.Highlighted : ""
                  }`}
                >
                  <span className={styles.RankingPosition}>{index + 1}°</span>
                  <img
                    src={`http://localhost:8081${item.foto_perfil}`}
                    alt={`${item.nome_aluno}`}
                    className={styles.ProfileImage}
                  />
                  <div className={styles.RankingDetails}>
                    <span className={styles.StudentName}>
                      {item.nome_aluno}
                    </span>
                    <span className={styles.StudentXP}>{item.total_xp} XP</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Carregando ranking...</p>
          )}
        </main>
      </div>

      <div className={styles.ShowMyFriends}>
      <h1>Meus amigos</h1>
        {friendsRanking.length > 0 && (
          <div className={styles.ShowMyFriends}>
            <ul className={styles.RankingList}>
              {friendsRanking.map((item, index) => (
                <li
                  key={item.aluno_id}
                  className={`${styles.RankingItem} ${
                    aluno_id === item.aluno_id ? styles.Highlighted : ""
                  }`}
                >
                  <span className={styles.RankingPosition}>{index + 1}°</span>
                  <img
                    src={`http://localhost:8081${item.foto_perfil}`}
                    alt={`${item.nome_aluno}`}
                    className={styles.ProfileImage}
                  />
                  <div className={styles.RankingDetails}>
                    <span className={styles.StudentName}>
                      {item.nome_aluno}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ranking;
