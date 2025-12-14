import mongoose from "mongoose";

const savedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TechEvents",
      required: true,
    },
    save: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

savedSchema.index({ userId: 1, eventid: 1 }, { unique: true });

export const SavedModel = mongoose.model("Saved", savedSchema);
