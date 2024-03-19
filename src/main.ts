import dotenv from "dotenv";
import app from "./server/app";

dotenv.config();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
