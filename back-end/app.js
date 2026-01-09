const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session);
const app = express();
dotenv.config();
const MONGO_URL = process.env.MONGO_URI;
const { urlencoded } = require("body-parser");
const fileUpload = require("express-fileupload");
const os = require("os");
const { authRouter } = require("./routes/authRoutes");
const { eventRoutes } = require("./routes/eventRoutes");
app.use(urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.ORIGIN_URL],
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(), // important: explicit temp dir
    createParentPath: true,
  })
);
const store = new MongoDbStore({
  uri: MONGO_URL,
  collection: "sessions",
});
app.use(
  session({
    secret: process.env.API_SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false, // set true only if using https
      sameSite: "lax", // or "none" if using https
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use("/", authRouter);
app.use("/api", eventRoutes);
const PORT = process.env.PORT;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("mongo is connected");
    app.listen(PORT, () => {
      console.log(`server is listening at : http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting to DB", err);
  });
