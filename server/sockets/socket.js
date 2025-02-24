const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Usuário conectado:", socket.id);

    socket.on("message", (message) => {
      io.emit("message", message);
    });

    socket.on("typing", (user) => {
      socket.broadcast.emit("typing", user);
    });

    socket.on("sendInvite", (data) => {
        console.log("Pedido de amizade recebido no servidor:", data);
        const { from, to, name } = data;
        io.to(to).emit("receiveFriendRequest", {
          fromUserId: from,
          message: `Você recebeu um pedido de amizade de ${name}`,
        });
      });

    socket.on("oneQuestion", (user) => {
      console.log("Pergunta")
      io.emit("oneQuestion", user);
    })

      socket.on("Conquista", (user) => {
        io.emit("Conquista", user)
      })

      socket.on("join_room", (room) => {
        socket.join(room);

        console.log(`Usuário ${socket.id} entrou na sala ${room}`);
      })
    
      socket.on("private_message", ({ room, from, message }) => {
        io.to(room).emit("private_message", { from, message, room });
      });

    socket.on("disconnect", () => {
      console.log("Usuário desconectado:", socket.id);
    });
  });
};

module.exports = setupSocket;
