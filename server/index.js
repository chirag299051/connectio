const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const morgan = require("morgan");

const { MONGODB_URL, PORT } = process.env;

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on Port: ", PORT);
});
