const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
