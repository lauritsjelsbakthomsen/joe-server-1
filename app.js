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
app.use(express.static("public"));
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

app.get("/viggo", (req, res) => {
  console.log("Viggo billede");

  res.sendFile(path.join(__dirname, "public", "viggo.html"));
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

const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database (creates a new one if it doesn't exist)
const db = new sqlite3.Database("mydatabase.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Step 3: Define Functions to Work with the Database

// Function to create a table
const createTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
    )`;
  db.run(sql, (err) => {
    if (err) {
      return console.error("Error creating table:", err.message);
    }
    console.log("Table created successfully.");
  });
};

const createUser = (name, age) => {
  const sql = `INSERT INTO users (name, age) VALUES (?, ?)`;

  db.run(sql, [name, age], function (err) {
    if (err) {
      return console.error("Error creating user:", err.message);
    }
    console.log(`User created successfully with ID: ${this.lastID}`);
  });
};

const getAllUsers = () => {
  const sql = `SELECT * FROM users`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error("Error getting user:", err.message);
    }
    // Convert the result to JSON format if needed, or simply log rows
    console.log(rows);
  });
};
// ejej
const dropAllData = () => {
  const sql = `DELETE FROM users;`; // This will delete all records from the users table

  db.run(sql, (err) => {
    if (err) {
      return console.error("Error dropping all data:", err.message);
    }
    console.log("All data dropped successfully from the users table.");
  });
};

db.serialize(() => {
  // createTable();
  // createUser("Seb", 33);
  // createUser("Lau", 11);
  getAllUsers();
  //dropAllData();
});

db.close();

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Hvis man gerne vl have fat i cookies, kan man sende dem vi et endpoint i res.send
