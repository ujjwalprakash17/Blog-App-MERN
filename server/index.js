import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import userAuthRoutes from "./Routes/userAuthRoutes.js";
import userDetailsRoutes from "./Routes/userDetailsRoutes.js";
import userPostRoutes from "./Routes/userPostRoutes.js";
import connectDB from "./Config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
configDotenv();

//MiddleWare
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); //used to enable cors policy
// Increase payload size limit
app.use(express.json({ limit: "2mb" })); //used to parse json request from client side
app.use(express.urlencoded({ limit: "2mb", extended: true })); //used to parse url encoded request from postman


// Serve static files from Vite's dist directory
app.use(express.static(path.join(__dirname, 'dist')));


//Connecting to MongoDB database
connectDB();

//Home route
// app.get("/", (req, res)=> {
//     res.send("Ujjwal Welcomes you to the MERN Stack Blogging Application");
// });

app.get("/", (req, res) => {
  app.use(express.static(path.join(__dirname, "client/build")));
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

//Routes to handle authentication requests
app.use("/api/auth/", userAuthRoutes);

//Routes to CRUD the user Details
app.use("/api/user/", userDetailsRoutes);

//Routes to CRUD the posts of the user
app.use("/api/post/", userPostRoutes);

// Catch-all handler for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
