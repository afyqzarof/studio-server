import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
// import boardRoutes from "./routes/board-routes.js";
// import wordRoutes from "./routes/word-routes.js";
// import uploadRoutes from "./routes/upload-routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/upload", express.static("server/public/uploads"));
app.use("/thumbnails", express.static("server/public/thumbnails"));
app.use("/users", userRoutes);
// app.use("/boards", boardRoutes);
// app.use("/word", wordRoutes);
// app.use("/upload", uploadRoutes);

export default app;
