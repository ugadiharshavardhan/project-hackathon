// main API file
import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { userModel } from "./models/userModels.js";
import { AdminModel } from "./models/adminModel.js";
import { TechEventsModel } from "./models/TechEvents.js";
import { verifyAdmin } from "./authorizeAdmin.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get("/", (req, res) => {
  res.status(200).json({ message: "GET is successful" });
});

// USER REGISTER
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const UserRules = z.object({
    username: z.string().min(4).max(15),
    email: z.string().email(),
    password: z.string().min(6).max(15)
  });

  const parsedData = UserRules.safeParse({ username, email, password });
  if (!parsedData.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: "User created", result: newUser });
});

// USER LOGIN
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const isUserPresent = await userModel.findOne({ email });
  if (!isUserPresent) return res.status(400).json({ message: "Invalid email" });

  const verification = await bcrypt.compare(password, isUserPresent.password);
  if (!verification) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: isUserPresent._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.status(200).json({ message: "Signin successful", jwt_token: token });
});

// ADMIN REGISTER
app.post("/admin/register", async (req, res) => {
  const { email, code } = req.body;
  const AdminRules = z.object({
    email: z.string().email(),
    code: z.string()
  });

  const AdminData = AdminRules.safeParse({ email, code });
  if (!AdminData.success) return res.status(400).json({ message: "Invalid input" });

  const existingAdmin = await AdminModel.findOne({ email });
  if (existingAdmin) return res.status(400).json({ message: "Email already exists" });

  const hashedAdminCode = await bcrypt.hash(code, 10);
  const newAdmin = await AdminModel.create({ email, code: hashedAdminCode });

  res.status(201).json({ message: "Admin created", admin: newAdmin });
});

// ADMIN LOGIN
app.post("/admin/login", async (req, res) => {
  const { email, code } = req.body;
  const isAdminPresent = await AdminModel.findOne({ email });
  if (!isAdminPresent) return res.status(400).json({ message: "Invalid Email" });

  const AdminVerify = await bcrypt.compare(code, isAdminPresent.code);
  if (!AdminVerify) return res.status(400).json({ message: "Invalid CODE" });

  const AdminToken = jwt.sign({ id: isAdminPresent._id }, process.env.SECRET_KEY, { expiresIn: "7d" });
  res.status(200).json({ message: "Login Successful", adminToken: AdminToken });
});

// GET each event
app.get("/user/allevents/:eventid", async (req, res) => {
  try {
    const event = await TechEventsModel.findById(req.params.eventid);
    if (!event) {
      return res.status(404).json({ message: "Event Not Found" });
    }
    res.status(200).json({ message: event });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all events
app.get("/events/all", async (req, res) => {
  try {
    const events = await TechEventsModel.find().populate("createdBy", "email");
    res.status(200).json({ message: "All Events", allevents: events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE EVENT
app.post("/events/post", verifyAdmin, async (req, res) => {
  try {
    const newEvent = new TechEventsModel({
      ...req.body,
      createdBy: req.adminId
    });

    await newEvent.save();
    res.status(200).json({
      message: "Event Created Successfully",
      EventDetails: newEvent
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

// GET admin events
app.get("/admin/events", verifyAdmin, async (req, res) => {
  try {
    const events = await TechEventsModel.find({ createdBy: req.adminId });
    res.status(200).json({ message: "Admin's events", events });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET my events (same as above)
app.get("/events/my", verifyAdmin, async (req, res) => {
  try {
    const events = await TechEventsModel.find({ createdBy: req.adminId });
    res.status(200).json({ message: "My Events", events });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE EVENT
app.put("/events/:id", verifyAdmin, async (req, res) => {
  try {
    const event = await TechEventsModel.findOne({ _id: req.params.id, createdBy: req.adminId });
    if (!event) return res.status(404).json({ message: "Event not found or not owned by you" });

    Object.assign(event, req.body);
    await event.save();

    res.status(200).json({ message: "Event updated", event });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE EVENT
app.delete("/events/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedEvent = await TechEventsModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.adminId
    });

    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found or not owned by you" });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DATABASE CONNECTION
async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(5678, () => console.log("Server running at port 5678"));
  } catch (err) {
    console.error("Error connecting:", err);
    process.exit(1);
  }
}

connection();
