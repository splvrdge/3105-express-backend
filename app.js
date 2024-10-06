const express = require("express");
const logger = require("./middleware/loggingMiddleware");
const routes = require("./routes/user");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 30 * 1000,
  max: 5,
  message: "Too many requests! Try again after 30 seconds.",
});

const app = express();

app.use(limiter);
app.use(express.json());
app.use(logger);
app.use("/api/user", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
