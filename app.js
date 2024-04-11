// THIS FILE IS USED TO CREATE & RUN LOCAL SERVER (PORT:3110)

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { sequelize } = require("./database/tablestructure");
const routes = require("./routes/routes");
const jsonMiddleware = require("./middleware/JSON_middleware");

const app = express();
const port = 3110;

app.use(express.json());

// Middleware
app.use(jsonMiddleware);

// Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
