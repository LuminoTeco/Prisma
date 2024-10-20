const cors = require("cors");
const express = require("express");
const session = require("express-session")
const bodyParser = require("body-parser")
const cookie = require("cookie-parser")
const path = require("path")
const InstituteRouter = require("./Routers/InstituteRoutes")
const studentRoutes = require("./Routers/studentRoutes")

const app = express();
app.use(express.json());
app.use(cookie());
app.use(bodyParser.json())
app.use(session({
  secret: 'SJKAHRJKLHASDFKLJSHAD', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 
  }
}));
app.use("/images", express.static(path.join(__dirname, "public", "images")))

const port = 8081

app.use(cors({
  origin: "http://localhost:5173", 
  allowedHeaders: "Content-Type,Authorization", 
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true 
}));

app.use('/prisma', InstituteRouter)
app.use('/prisma', studentRoutes)

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}!`);
});

/* Lembrar de fazer a blacklist de Tokens! */