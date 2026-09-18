const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const route = require("./routes/auth.routes.js");

const mongodb = require("./config/db.js");

const enverment = process.env.NODE_ENV || "development";

dotenv.config({
  path: `.env.${enverment}`,
});

// console.log("MAIL USER:", process.env.MAIL_USER);
// console.log("PASSWORD EXISTS:", !!process.env.MAIL_PASSWORD);

const port = process.env.PORT || 3000;
const mongoourl = process.env.MONGOO_URL;

const app = express();
app.use(express.json());

app.use(cors());

if (!mongoourl) {
  console.log("envpost mongoose error");
} else {
  mongodb(mongoourl);
}

app.get("/", (req, res) => {
  res.send("hellow world ");
});

app.use("/api/v1", route);

app.listen(port, () => {
  console.log(`server connected ${port}`);
});
