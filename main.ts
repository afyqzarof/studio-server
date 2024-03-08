require("dotenv").config();
const port = process.env.PORT;
const baseUrl = process.env.BASE_URL;
const app = require("./src/server/app");

app.listen(port, () => {
  console.log(`listening on  ${baseUrl + port}`);
});
