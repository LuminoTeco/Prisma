import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ChatFeed from "./FeedComponents/ChatFeed";
import Ranking from "./FeedComponents/Ranking";
import { io } from "socket.io-client";
import trofeu from "@assets/imgs/trofeu.png";

const socket = io("http://localhost:8081");

const Feed = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [questionAsked, setQuestionAsked] = useState(null); // Estado para a pergunta

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

  useEffect(() => {
    socket.on("oneQuestion", (user) => {
      if (user !== userInfo?.nome) {
        setQuestionAsked(user);
      }
    });

    return () => {
      socket.off("oneQuestion");
    };
  }, [userInfo]);

  return (
    <div className={styles.containerFeed}>
      <div className={styles.FeedMessagesContainer}>
        <ChatFeed setQuestionAsked={setQuestionAsked} />
      </div>
      <div className={styles.AchivementContainer}>
        <Link to="../ranking">
          <img src={trofeu} alt="Trofeu" className={styles.trofeu} />
        </Link>
        {questionAsked && userInfo?.nome !== questionAsked && (
          <div className={styles.questionNotification}>
            <strong>{questionAsked}</strong> fez uma pergunta!
          </div>
        )}
        {loading ? (
          <p className={styles.loadingText}></p>
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
