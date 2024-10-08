const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const e = require("cors");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/static", express.static("public"));
app.use((req, res, next) => {
  console.log("----- HTTP Request -----");
  console.log(`Method: ${req.method}`); // HTTP Method
  console.log(`URL: ${req.originalUrl}`); // Requested URL
  console.log("Headers:", req.headers); // Request Headers
  console.log(`IP: ${req.ip}`); // IP Address
  console.log("------------------------");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/res", (req, res) => {
  res.status(200).send("Response from server");
});

app.post("/cookie", (req, res) => {
  console.log(req.body.location);

  res.cookie("location", req.body.location, {
    maxAge: 200000,
  });

  res.status(200).send("Cookie has been made");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
