require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;
const cors = require("cors");

const userRoutes = require("./routes/user-routes");
const boardRoutes = require("./routes/board-routes");
const wordRoutes = require("./routes/word-routes.js");
const uploadRoutes = require("./routes/upload-routes.js");

app.use(cors());
app.use(express.json());
app.use("/upload", express.static("public/uploads"));
app.use("/thumbnails", express.static("public/thumbnails"));
app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/word", wordRoutes);
app.use("/upload", uploadRoutes);

app.listen(port, () => {
  console.log(`listening on  ${baseUrl + port}`);
});
