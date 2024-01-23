const express = require("express");
const userRoutes = require("./routes/user-routes.js");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`listening on  http://localhost:${port}`);
});
