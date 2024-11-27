import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./PrivateChat.module.css";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8081"); // Configura o socket

const PrivateChat = () => {
  const storedUserInfo = JSON.parse(localStorage.getItem("user_info"));
  const storedUserId = storedUserInfo ? storedUserInfo.aluno_id : null;

  const [selectedFriend, setSelectedFriend] = useState(null); // Add selectedFriend state
  const [newMessage, setNewMessage] = useState(""); // Add state for new messages
  const [selectedRoom, setSelectedRoom] = useState(null); // Add state for room name

  // Função para buscar amigos usando React Query
  const { data: friends, isLoading, error: fetchError } = useQuery({
    queryKey: ["getFriends", storedUserId],
    queryFn: async () => {
      if (!storedUserId) {
        throw new Error("Usuário não encontrado. Faça login novamente.");
      }
      
      const response = await axios.get("http://localhost:8081/prisma/getMyFriends", {
        params: { aluno_id_fk: storedUserId },
      });
      return response.data;
    }
  });

  // Função para buscar as mensagens entre o usuário e o amigo usando React Query
  const { data: messages, error: messagesError, refetch } = useQuery({
    queryKey: ["getMessages", storedUserId, selectedFriend?.aluno_id],
    queryFn: async () => {
      if (!storedUserId || !selectedFriend) {
        return [];
      }
      const response = await axios.get("http://localhost:8081/prisma/getMessagesFriends", {
        params: { from_user: storedUserInfo.nome, to_user: selectedFriend.nome_amigo },
      });
      return response.data;
    },
    enabled: !!selectedFriend // only fetch when a friend is selected
  });

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const messageData = {
      conteudo: newMessage,
      from_user: storedUserInfo.nome,
      to_user: selectedFriend.nome_amigo,
    };

    try {
      await axios.post("http://localhost:8081/prisma/SendMessageFriends", messageData);
      socket.emit("private_message", { room: selectedRoom, from: storedUserInfo.nome, message: newMessage });
      setNewMessage("");
    } catch (err) {
      console.error("Erro ao enviar a mensagem:", err);
    }
  };

  // Function to join a chat room and set selectedFriend
  const joinRoom = (friend) => {
    setSelectedFriend(friend);
    const roomName = `${storedUserId}_${friend.aluno_id}`; // Generates unique room name
    setSelectedRoom(roomName);
    socket.emit("join_room", roomName); // Emit event to join room
    refetch(); // Fetch messages for the selected friend
  };

  useEffect(() => {
    socket.on("private_message", (message) => {
      if (message.room === selectedRoom) {
        // Optionally update local messages here
        refetch(); // Refetch messages when new message is received
      }
    });

    return () => {
      socket.off("private_message");
    };
  }, [selectedRoom, refetch]);

  useEffect(() => {
    if (selectedFriend) {
      refetch(); // Refetch messages when a new friend is selected
    }
  }, [selectedFriend, refetch]);

  const renderFriends = () => {
    if (isLoading) return <p>Carregando...</p>;
    if (fetchError) return <p>{fetchError.message}</p>;
    if (!friends.length) return <p>Você ainda não tem amigos.</p>;

    return (
      <ul className={styles.friendList}>
        {friends.map((friend) => (
          <li
            key={friend.aluno_id}
            className={`${styles.friendItem} ${selectedFriend?.aluno_id === friend.aluno_id ? styles.active : ""}`}
            onClick={() => joinRoom(friend)} // Update selected friend when clicked
          >
            <img
              src={"http://localhost:8081" + friend.foto_perfil || "/default-avatar.png"}
              className={styles.friendAvatar}
              alt="Avatar"
            />
            <span>{friend.nome_amigo}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderMessages = () => {
    if (!selectedFriend) return <p>Selecione um amigo para iniciar a conversa.</p>;
  
    // Verifique se messages é um array válido
    if (!Array.isArray(messages)) return <p>Carregando mensagens...</p>;
  
    return (
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${msg.from_user === storedUserInfo.nome ? styles.ownMessage : styles.friendMessage}`}>
            <div className={styles.messageHeader}>
              <span className={styles.messageSender}>
                {msg.from_user === storedUserInfo.nome ? 'Você' : msg.from_user}
              </span>
            </div>
            <span>{msg.conteudo}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.ContainerChat}>
      <aside className={styles.ContainerChatContacts}>
        {renderFriends()}
      </aside>
      <main className={styles.ContainerChatMessages}>
        <header className={styles.chatHeader}>
          {selectedFriend ? (
            <h3>Conversando com {selectedFriend.nome_amigo}</h3>
          ) : (
            <h3>Selecione um amigo</h3>
          )}
        </header>
        {renderMessages()}
        {selectedFriend && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={styles.messageInput}
            />
            <button onClick={sendMessage} className={styles.sendButton}>
              Enviar
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PrivateChat;
