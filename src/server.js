require("dotenv").config();
require("express-async-errors");
require("./utils/db");

const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "src/client/build")));
app.use(cors());
const postsRouter = require("./routes/posts");
app.use("/api/", require("./routes/index"));
app.use("/server/", postsRouter);

app.get("*", (req, res, next) =>
  res.sendFile(path.join(__dirname + "src/client/build/index.html"))
);

// catch all middleware/route
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => console.log("listen to port:", port));

module.exports = app;
