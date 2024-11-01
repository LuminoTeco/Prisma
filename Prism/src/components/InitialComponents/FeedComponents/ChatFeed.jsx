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

const ChatFeed = () => {
  const [message, setMessage] = useState("");
  const [userColors, setUserColors] = useState({});
  const [typingUser, setTypingUser] = useState(null);
  const [messageColor, setMessageColor] = useState("#000000");
  const storedUserInfo = JSON.parse(localStorage.getItem("user_info"));
  const storedUserName = storedUserInfo.nome;

  const { data: chatMessages = [], refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:8081/prisma/all_messages"
      );
      return response.data.map((msg) => ({
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const messageData = {
      user: storedUserName,
      message: message,
      color: messageColor
    };

    try {
      await axios.post("http://localhost:8081/prisma/messages", {
        conteudo: message,
        aluno_id_fk: storedUserInfo.aluno_id,
        color: messageColor
      });
      socket.emit("message", messageData);
      setMessage("");
    } catch (err) {
      console.error("Erro ao enviar a mensagem:", err);
    }
  };

  const handleMessageColorSwitch = (color) => {
    setMessageColor(color);
  };

  return (
    <div className={styles.ChatContainerFeed}>

      <div className={styles.messages}>
        {chatMessages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong
              style={{
                color:
                  msg.user === storedUserName
                    ? userColors[storedUserName] || "#000"
                    : userColors[msg.user] || getRandomColor(),
              }}
            >
              {msg.user}:
            </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <div className={styles.InputSubmit}>
        <div className={styles.containerChoiceType}>
          <span onClick={() => handleMessageColorSwitch("#ffcc00")}>
            Pergunta
          </span>
          <span onClick={() => handleMessageColorSwitch("#FD8FFF")}>
            Resposta
          </span>
          <span onClick={() => handleMessageColorSwitch("#AFE6F8")}>Dica</span>
        </div>
        <form className={styles.FormMessages} onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Digite algo..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              socket.emit("typing", storedUserName);
            }}
            className={styles.InputMessage}
            style={{ borderColor: messageColor }}
          />
          <button type="submit" className={styles.SendMessage}>
            <img src={send} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatFeed;
