const express = require("express"),
  app = express(),
  port = process.env.port || 8000;
require("dotenv").config();
const { connectWithDB } = require("./db");
const { handleError } = require("./middleware/error")


const userRouter = require("./routes/user");

connectWithDB();
app.use(express.json());
app.use("/users", userRouter);
app.use(handleError);

app.listen(port, () => console.log(`Server listening on ${port}`));
