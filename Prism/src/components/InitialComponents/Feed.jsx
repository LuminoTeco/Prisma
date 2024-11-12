import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import axios from "axios";
import ChatFeed from "./FeedComponents/ChatFeed";

const Feed = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
    }
  }, []);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      if (!userInfo) return;
      setLoading(true);

      try {
        const response = await axios.get(
          `http://localhost:8081/prisma/getInvites?id_aluno=${userInfo.aluno_id}`
        );
        setFriendRequests(response.data);
      } catch (error) {
        console.error("Erro ao buscar solicitações pendentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
    const intervalId = setInterval(fetchFriendRequests, 5000);

    return () => clearInterval(intervalId);
  }, [userInfo]);

  const acceptFriendRequest = async (request) => {
    if (!userInfo) return;

    try {
      const response = await axios.patch(
        `http://localhost:8081/prisma/acceptInvite?id_aluno=${userInfo.aluno_id}`
      );

      if (response.status === 200) {
        setFriendRequests((prevRequests) =>
          prevRequests.filter(
            (req) => req.id_solicitante !== request.id_solicitante
          )
        );
        console.log(
          `Solicitação de amizade de ${request.nome_enviado} aceita com sucesso!`
        );
      } else {
        console.error("Erro ao aceitar a solicitação de amizade");
      }
    } catch (error) {
      console.error("Erro ao aceitar a solicitação:", error);
    }
  };

  const rejectFriendRequest = async (idSolicitante) => {
    if (!userInfo) return;

    try {
      const response = await axios.delete(
        `http://localhost:8081/prisma/rejectInvite?id_aluno=${userInfo.aluno_id}`
      );

      if (response.status === 200) {
        setFriendRequests(
          (prevRequests) =>
            prevRequests.filter((req) => req.id_enviado !== idSolicitante)
        );
        console.log(
          `Solicitação de amizade de usuário com id ${idSolicitante} rejeitada com sucesso!`
        );
      } else {
        console.error("Erro ao recusar a solicitação de amizade");
      }
    } catch (err) {
      console.log(err, "Erro ao recusar amizade");
    }
  };

  return (
    <div className={styles.containerFeed}>
      <div className={styles.FeedMessagesContainer}>
        <ChatFeed />
      </div>
      <div className={styles.AchivementContainer}>
        {loading ? (
          <p className={styles.loadingText}>Carregando solicitações...</p>
        ) : (
          <div>
            {friendRequests.length > 0 && (
              <ul className={styles.requestList}>
                {friendRequests.map((request, index) => (
                  <li key={index} className={styles.requestItem}>
                    <span className={styles.requestSender}>
                      {request.nome_enviado} enviou um pedido de amizade: 
                      <button onClick={() => acceptFriendRequest(request)}>
                        Aceitar
                      </button>
                      <button onClick={() => rejectFriendRequest(request.id_enviado)}>
                        Rejeitar
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
