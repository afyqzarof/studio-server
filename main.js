require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const boardRoutes = require("./routes/board-routes");
const wordRoutes = require("./routes/word-routes.js");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/word", wordRoutes);

app.listen(port, () => {
  console.log(`listening on  ${baseUrl + port}`);
});
