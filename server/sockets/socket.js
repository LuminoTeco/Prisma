const { Server } = require("socket.io");

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('Usuário conectado:', socket.id);

        socket.on('message', (message) => {
            io.emit('message', message);
        });

        socket.on("typing", (user) => {
            socket.broadcast.emit("typing", user);
        });

        socket.on('disconnect', () => {
            console.log('Usuário desconectado:', socket.id);
        });
    });
};

module.exports = setupSocket;
