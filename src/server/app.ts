import express from "express";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/user.routes";
import boardRoutes from "./routes/board.routes";
import wordRoutes from "./routes/word.routes";
import uploadRoutes from "./routes/upload.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/upload",
  express.static(path.resolve(__dirname, "../../public/uploads"))
);
app.use(
  "/thumbnails",
  express.static(path.resolve(__dirname, "../../public/thumbnails"))
);
app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/word", wordRoutes);
app.use("/upload", uploadRoutes);

export default app;
