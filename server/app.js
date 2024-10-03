const cors = require("cors");
const express = require("express");
const session = require("express-session")
const cookie = require("cookie-parser")
const InstituteRouter = require("./Routers/InstituteRoutes")

const app = express();
app.use(express.json());
app.use(cookie());
app.use(session({
  secret: 'SJKAHRJKLHASDFKLJSHAD', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.use(cors({
  origin: "http://localhost:5173", 
  allowedHeaders: "Content-Type,Authorization", 
  methods: "GET,POST,PUT,DELETE",
  credentials: true 
}));

app.use('/prisma', InstituteRouter)

app.listen(8081, () => {
  console.log("The server is running...");
});

/* Lembrar de fazer a blacklist de Tokens! */