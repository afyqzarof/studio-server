require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;
const cors = require("cors");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const userRoutes = require("./routes/user-routes");
const boardRoutes = require("./routes/board-routes");
const wordRoutes = require("./routes/word-routes.js");
const uploadRoutes = require("./routes/upload-routes.js");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/word", wordRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`listening on  ${baseUrl + port}`);
});
