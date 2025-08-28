require("dotenv").config();
const app = require("./app");
require("./sendMail");

const PORT = process.env.PORT || 3000; // Render injects PORT, else use .env, else 3000

app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
