require("dotenv").config();
const app = require("./app");
require("./sendMail");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

