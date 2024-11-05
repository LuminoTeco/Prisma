import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import styles from "./FeedComponents.module.css";
import send from "@assets/imgs/message.png";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8081");

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const lightenColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const r = (num >> 16) + amt;
  const g = ((num >> 8) & 0x00ff) + amt;
  const b = (num & 0x0000ff) + amt;

  // Garantir que os valores RGB não sejam superiores a 240 para evitar cores muito claras
  const cappedR = Math.min(r, 240);
  const cappedG = Math.min(g, 240);
  const cappedB = Math.min(b, 240);

  return (
    "#" +
    (
      0x1000000 +
      (cappedR < 255 ? (cappedR < 1 ? 0 : cappedR) : 255) * 0x10000 +
      (cappedG < 255 ? (cappedG < 1 ? 0 : cappedG) : 255) * 0x100 +
      (cappedB < 255 ? (cappedB < 1 ? 0 : cappedB) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

const ChatFeed = () => {
  const [message, setMessage] = useState("");
  const [userColors, setUserColors] = useState({});
  const storedUserInfo = JSON.parse(localStorage.getItem("user_info"));
  const storedUserName = storedUserInfo.nome;

  const { data: chatMessages = [], refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:8081/prisma/all_messages"
      );
      return response.data.map((msg) => ({
        foto_perfil: msg.foto_perfil,
        user: msg.nome,
        message: msg.conteudo,
      }));
    },
    refetchInterval: 1000,
  });

  useEffect(() => {
    const messageHandler = () => {
      refetch();
    };

    socket.on("message", messageHandler);
    return () => {
      socket.off("message", messageHandler);
    };
  }, [refetch]);

  useEffect(() => {
    chatMessages.forEach((msg) => {
      if (!userColors[msg.user]) {
        setUserColors((prevColors) => ({
          ...prevColors,
          [msg.user]: getRandomColor(),
        }));
      }
    });
  }, [chatMessages, userColors]);

  useEffect(() => {});

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const messageData = {
      user: storedUserName,
      message: message,
    };

    try {
      await axios.post("http://localhost:8081/prisma/messages", {
        conteudo: message,
        aluno_id_fk: storedUserInfo.aluno_id,
      });
      socket.emit("message", messageData);
      setMessage("");
    } catch (err) {
      console.error("Erro ao enviar a mensagem:", err);
    }
  };

  const baseURL = "http://localhost:8081";

  return (
    <div className={styles.ChatContainerFeed}>
      <div className={styles.messages}>
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={styles.message}
            style={{
              borderColor: lightenColor(
                msg.user === storedUserName
                  ? userColors[storedUserName] || "#000"
                  : userColors[msg.user] || getRandomColor(),
                30
              ),
              borderWidth: "2px",
              borderStyle: "solid",
              backgroundColor: "transparent",
            }}
          >
            <div className={styles.messageContent}>
              <img
                src={`${baseURL}${msg.foto_perfil}`}
                alt="foto do usuário"
                className={styles.userImage}
              />
              <strong
                style={{
                  color:
                    msg.user === storedUserName
                      ? userColors[storedUserName] || "#000"
                      : userColors[msg.user] || getRandomColor(),
                }}
              >
                {msg.user}
              </strong>
            </div>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className={styles.InputSubmit}>
        <form className={styles.FormMessages} onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Digite algo..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.InputMessage}
          />
          <button type="submit" className={styles.SendMessage}>
            <img src={send} alt="enviar mensagem" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatFeed;
