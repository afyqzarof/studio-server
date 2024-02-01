const express = require("express");
const app = express();

const cors = require("cors");

const userRoutes = require("./routes/user-routes.js");
const boardRoutes = require("./routes/board-routes.js");
const wordRoutes = require("./routes/word-routes.js");
const uploadRoutes = require("./routes/upload-routes.js");

app.use(cors());
app.use(express.json());
app.use("/upload", express.static("server/public/uploads"));
app.use("/thumbnails", express.static("server/public/thumbnails"));
app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/word", wordRoutes);
app.use("/upload", uploadRoutes);

module.exports = app;
