import mongoose from "mongoose";
import { Schema } from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stack: {
    type: [String], 
    required: true,
  },
  figmaLink : {
    type:String,
    required:false
  },
  githublink : {
    type : String,
    required:false
  },
  EventType: {
    type:String,
    required:true
  },
  functionality : {
    type:String,
    required:false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "admindetails",
    required: true
  }
});

export const projectModel = mongoose.model("Project", projectSchema)
