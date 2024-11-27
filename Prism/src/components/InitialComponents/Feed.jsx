import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ChatFeed from "./FeedComponents/ChatFeed";
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

  const acceptFriendRequest = async (request) => {
      if (!userInfo) return

      try {
        const response = await axios.patch(
          `http://localhost:8081/prisma/acceptInvite?id_aluno=${userInfo.aluno_id}`
        )

        if(response.status === 200) {
          setFriendRequests((prevRequests) => 
            prevRequests.filter(
              (req) => req.id_solicitante !== request.id_solicitante
            )
          )
          console.log("Solicitação aceita com sucesso")
        } else {
          console.log("Error ao tentar aceitar")
        }
      } catch (err) {
        console.error(err)
      }
  };
  
const rejectFriendRequest = async (idSolicitante) => {
  if (!userInfo) return;

  try {
    const response = await axios.delete(
      `http://localhost:8081/prisma/rejectInvite?id_aluno=${userInfo.aluno_id}`
    )

    if(response.status === 200) {
      setFriendRequests(
        (prevRequests) => 
          prevRequests.filter((req) => req.id_enviado !== idSolicitante)
      )
      console.log("Reijeitada com sucesso!")
    }else {
      console.error("Erro ao recusar o pedido")
    }
  } catch (err) {
    console.log(err)
  }
} 
  

  useEffect(() => {
    fetchFriendRequests();
    const intervalId = setInterval(fetchFriendRequests, 5000);

    return () => clearInterval(intervalId);
  }, [userInfo]);

  useEffect(() => {
    socket.on("oneQuestion", (user) => {
      if (user !== userInfo?.nome) {
        setQuestionAsked(user);

        setTimeout(() => {
          setQuestionAsked(null);
        }, 10000);
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
                      {request.nome_enviado} enviou um pedido de amizade:{" "}
                      <button
                        onClick={() => acceptFriendRequest(request)}
                        className={styles.acceptButton}
                      >
                        Aceitar
                      </button>
                      <button
                        onClick={() => rejectFriendRequest(request.id_enviado)}
                        className={styles.rejectButton}
                      >
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
