const express = require("express");
const logger = require("./middleware/loggingMiddleware");
const routes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/user", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
