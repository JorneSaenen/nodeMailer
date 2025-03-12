// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { sendEmail } from "./utils/mail";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    console.error(error);
  }
});

app.post("/mail", async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;
    const data = {
      from_email: email,
      name,
      subject,
      message,
    };
    await sendEmail(data);
  } catch (error) {
    console.log(error);
  }
});

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
