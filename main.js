require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const boardRoutes = require("./routes/board-routes");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);

app.listen(port, () => {
  console.log(`listening on  http://localhost:${port}`);
});
