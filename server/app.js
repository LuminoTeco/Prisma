const cors = require("cors");
const express = require("express");
const InstituteRouter = require("./Routers/InstituteRoutes")

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  allowedHeaders: "Content-Type,Authorization", 
  credentials: true 
}));

app.use('/api', InstituteRouter)

app.listen(8081, () => {
  console.log("The server is running...");
});
