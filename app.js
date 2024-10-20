const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const e = require("cors");
const app = express();
const responseTime = require("response-time");

// Add response time packets

app.use(cors());
// Use the response time
app.use(
  responseTime({
    digits: 3, // Number of decimal places for the response time
    header: "X-Response-Time", // Custom header name
  })
);
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

app.get("/response-time", (req, res) => {
  res.status(200).json(responseTime);
});

app.get("/res", (req, res) => {
  let currentDate = Date.now();

  res
    .status(200)
    .send({ message: "Responeeese from server", time: currentDate });
});

app.post("/cookie", (req, res) => {
  console.log(req.body.location); // Logger lokationen

  res.cookie("location", req.body.location, {
    maxAge: 200000, // varighed på 2 min
  });

  res.status(200).send("Cookie added");
});

app.get("/allCookies", (req, res) => {
  console.log(req.cookies);

  res.status(200).json(req.cookies);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Hvis man gerne vl have fat i cookies, kan man sende dem vi et endpoint i res.send
