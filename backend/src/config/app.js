import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174","https://project-hackathon-theta.vercel.app/"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
  res.status(200).json({ message: "GET is successful" });
});

export { app };