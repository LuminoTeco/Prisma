import React, { useEffect, useState, useRef } from "react";
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

const ChatFeed = ({ setQuestionAsked }) => {
  const [message, setMessage] = useState("");
  const [userColors, setUserColors] = useState({});
  const messagesEndRef = useRef(null);
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    const messageHandler = () => {
      refetch();
    };

    socket.on("message", messageHandler);
    socket.on("oneQuestion", (user) => {
      setQuestionAsked(user);
    });

    return () => {
      socket.off("message", messageHandler);
      socket.off("oneQuestion", (user) => {
        setQuestionAsked(user);
      });
    };
  }, [refetch, setQuestionAsked]);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const messageData = {
      user: storedUserName,
      message: message,
    };

    try {
      // Envia a mensagem ao servidor
      await axios.post("http://localhost:8081/prisma/messages", {
        conteudo: message,
        aluno_id_fk: storedUserInfo.aluno_id,
      });

      socket.emit("message", messageData);

      // Emitir o evento 'oneQuestion' se a mensagem for uma pergunta
      if (message.includes("?")) {
        socket.emit("oneQuestion", storedUserName);
      }

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
        <div ref={messagesEndRef} />
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
