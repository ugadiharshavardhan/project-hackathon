import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { z } from "zod";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel } from "./models/userModels.js";
import { AdminModel } from "./models/adminModel.js";
import { TechEventsModel } from "./models/TechEvents.js";
import { verifyAdmin } from "./middleware/authorizeAdmin.js";
import { AppliedEventModel } from "./models/applyEvent.js";
import { verifyUserToken } from "./middleware/userAuth.js";
import { projectModel } from "./models/ProjectSchema.js";
import { SavedModel } from "./models/Saved.js";


const app = express();
app.use(express.json());


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.status(200).json({ message: "GET is successful" });
});

// USER REGISTER
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const UserRules = z.object({
    username: z.string().min(4).max(15),
    email: z.email(),
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
    email: z.email(),
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
    res.status(200).json(event);
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


app.delete("/projects/:id", verifyAdmin, async (req, res) => {
  try {
    const deletedEvent = await projectModel.findOneAndDelete({
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

//public home data
app.get("/publicdata",async(req,res)=> {
  try{
    const activeEvents = await TechEventsModel.find() 
    const registered = await AppliedEventModel.find()
    res.status(200).json({
      message:"Active Events and Registered Students",
      event:activeEvents,
      register:registered
    })
  }
  catch(err) {
    console.log(err)
    res.status(500).json({
      message:err.message
    })
  }
})

//create project by admin
app.post("/createproject",verifyAdmin,async(req,res)=> {
  try {
    const newProject = new projectModel({
      ...req.body,
      createdBy:req.adminId
    })
    await newProject.save();
    res.status(201).json({
      message:"Project Created Successfully"
    })
  }
  catch(err) {
    console.log(err)
    res.status(500).json({
      message:err.message
    })
  }
})

//retrive projects
app.get("/user/projects",verifyUserToken,async(req,res)=> {
  try {
    const projects = await projectModel.find();
    res.status(200).json({
      mesaage:"Projects",
      events:projects
    })
  }
  catch(err) {
    console.log(err)
    res.status(500).json({
      message:err.message
    })
  }
})


app.get("/projects",verifyAdmin,async(req,res)=> {
  try {
    const projects = await projectModel.find({ createdBy: req.adminId });
    res.status(200).json({
      mesaage:"Projects",
      events:projects
    })
  }
  catch(err) {
    console.log(err)
    res.status(500).json({
      message:err.message
    })
  }
})

//get applied events
app.get("/user/appliedevents",verifyUserToken,async(req,res)=> {
  try {
    const userId = req.user._id;
    const events = await AppliedEventModel.find({user:userId})
    res.status(200).json({
      message:"AppliedEvents",
      events:events
    })
  }
  catch(error) {
    console.error("Error applying for event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
})


app.get("/allappliedevents",verifyUserToken,async(req,res)=> {
  try {
    const events = await AppliedEventModel.find()
    res.status(200).json({
      message:"AppliedEvents",
      events:events
    })
  }
  catch(error) {
    console.error("Error applying for event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }

})

app.get("/projects/:id",verifyUserToken,async(req,res)=> {
  try {
    const {id} = req.params;
    const projectDetails = await projectModel.findById(id)
    res.status(200).json({
      message:"Each Project Details",
      events:projectDetails
    })
  }
  catch(error) {
    console.error("Error applying for event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
})

//apply event
app.post("/event/apply/:eventId", verifyUserToken, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const eventTitle = req.body.eventTitle;
    const eventType = req.body.eventType;
    const eventCity = req.body.EventCity;
    const StartDate = req.body.StartDate;
    const EndDate = req.body.EndDate;
    const Venue = req.body.Venue;
    const userId = req.userId;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    
    const event = await TechEventsModel.findById(eventId);
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    const deadline = new Date(event.StartDate);
    deadline.setDate(deadline.getDate() - 5);

    if (new Date() >= deadline) {
        return res.status(400).json({ message: "Registration deadline has passed" });
    }

    const existingApplication = await AppliedEventModel.findOne({
        user: userId,
        event: eventId
    });

    if (existingApplication) {
        return res.status(400).json({ message: "You have already applied to this event" });
    }

    const application = new AppliedEventModel({
        ...req.body,
        user: userId,
        eventTitle:eventTitle,
        eventType:eventType,
        Venue:Venue,
        StartDate :StartDate,
        EndDate :EndDate,
        EventCity:eventCity,
        admin: event.createdBy,
        event: eventId
    });

    await application.save();

    return res.status(201).json({
        message: "Application submitted successfully",
        applicationId: application._id
    });

  } catch (error) {
    console.error("Error applying for event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


app.get("/user/account",verifyUserToken,async(req,res)=> {
  try {
     const user = await userModel.findOne({ userId: req.user.userId }).select("-password").lean();
     res.status(200).json({ userDetails: user });
  }
  catch(error){ 
    console.error("Error applying for event:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
})

// Get user's applications
app.get("/user/applications", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const applications = await AppliedEventModel.find({ user: decoded.id })
            .populate('event', 'EventTitle StartDate EndDate Venue')
            .sort({ createdAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Server error" });
    }
});


app.post("/user/saved", verifyUserToken, async (req, res) => {
  try {
    const { eventid, save } = req.body;
    const userId = req.user._id;

    const savedEvent = await SavedModel.findOneAndUpdate(
      { eventid, userId },
      { save },
      { new: true, upsert: true }
    );

    res.status(200).json({
      message: save ? "Event Saved" : "Event Unsaved",
      event: savedEvent,
    });
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get("/user/savedevents", verifyUserToken, async (req, res) => {
  try {
    const userId = req.user._id;

    const savedEvents = await SavedModel.find({
      userId,
      save: true,
    }).populate("eventid");


    res.status(200).json({
      success: true,
      events: savedEvents,
    });
  } catch (error) {
    console.error("Error fetching saved events:", error);
    res.status(500).json({ success: false, message: "Server error" });
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
