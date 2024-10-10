import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import enviado from "../../assets/imgs/enviado.png";
import caique from "../../assets/imgs/caique_conquista.png";
import saori from "../../assets/imgs/saori_conquista.png";
import erick from "../../assets/imgs/erick_conquista.png";
import { useSpring, animated } from 'react-spring';

const names = ["Caique", "Saori", "Erick"];

const Feed = () => {
  const [messagesState, setMessagesState] = useState([]);
  const [input, setInput] = useState("");
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);
  const [usedImages, setUsedImages] = useState(new Set());

  const notificationSpring = useSpring({
    opacity: imageVisible ? 1 : 0,
    transform: imageVisible ? 'scale(1)' : 'scale(0.8)',
    config: { duration: 500 },
  });

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessagesState((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "Caíque" },
      ]);
      setInput("");

      setTimeout(() => {
        let response;

        if (input.toLowerCase().includes("prisma")) {
          response = "Simmm! O prisma é muito bom!";
        } else if (input.toLowerCase().includes("olá") || input.toLowerCase().includes("oi") || input.toLowerCase().includes("e aí")) {
          response = "Olá! Como você está?";
        } else if (input.toLowerCase().includes("tudo bem")) {
          response = "Tudo bem, e você?";
        } else if (input.toLowerCase().includes("qual é a boa")) {
          response = "Estou aqui para ajudar! O que você precisa?";
        } else if (input.toLowerCase().includes("ajuda") || input.toLowerCase().includes("socorro")) {
          response = "Claro! Como posso te ajudar?";
        } else {
          response = "Desculpe, não entendi sua mensagem.";
        }

        setMessagesState((prevMessages) => [
          ...prevMessages,
          { text: response, sender: "Soraia" },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * names.length);
      const currentName = names[randomIndex];
      const imageSrc = currentName.toLowerCase() === "caique" ? caique : currentName.toLowerCase() === "saori" ? saori : erick;

      if (!usedImages.has(imageSrc)) {
        setActiveImage(imageSrc);
        setImageVisible(true);
        setUsedImages((prevUsedImages) => new Set(prevUsedImages).add(imageSrc));

        setTimeout(() => {
          setActiveImage(null);
          setImageVisible(false);
          setUsedImages((prevUsedImages) => {
            const newUsedImages = new Set(prevUsedImages);
            newUsedImages.delete(imageSrc);
            return newUsedImages;
          });
        }, 5000);
      }
    }, 3000);

    return () => clearInterval(notificationInterval);
  }, [usedImages]);

  return (
    <div className={styles.containerFeed}>
      <div className={styles.containerMessagesFeed}>
        <div className={styles.containerMessages}>
          {messagesState.map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageBox} ${
                msg.sender === "Caíque" ? styles.messageBoxCaíque : styles.messageBoxSoraia
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.containerInput}>
          <input
            type="text"
            className={styles.inputMessage}
            placeholder="Envie sua mensagem aqui!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <img
            src={enviado}
            alt="Enviar"
            className={styles.Send}
            onClick={handleSend}
          />
        </div>
      </div>
      <div className={styles.Notification}>
        {activeImage && (
          <animated.div
            style={notificationSpring}
            className={styles.notificationImages}
          >
            <img src={activeImage} alt="Imagem da notificação" />
          </animated.div>
        )}
      </div>
    </div>
  );
};

export default Feed;
