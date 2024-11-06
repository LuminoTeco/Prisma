import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import axios from "axios";
import ChatFeed from "./FeedComponents/ChatFeed";

const Feed = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      setLoading(true);
      const storedUserInfo = localStorage.getItem("user_info"); 
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        const alunoId = parsedUserInfo.aluno_id; 

        try {
          const response = await axios.get(
            `http://localhost:8081/prisma/getInvites?id_aluno=${alunoId}`
          );

          const requests = response.data;
          setFriendRequests(requests);
        } catch (error) {
          console.error("Erro ao buscar solicitações pendentes:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFriendRequests();
    const intervalId = setInterval(fetchFriendRequests, 5000);

    return () => clearInterval(intervalId);
  }, []);

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
            <h3 className={styles.title}>Solicitações de Amizade Pendentes</h3>
            {friendRequests.length > 0 ? (
              <ul className={styles.requestList}>
                {friendRequests.map((request, index) => (
                  <li key={index} className={styles.requestItem}>
                    <span className={styles.requestSender}>
                      Um pedido de amizade foi enviado por {request.nome_enviado}
                      <button>Aceitar</button><button>Rejeitar</button>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noRequestsText}>Sem solicitações pendentes</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
