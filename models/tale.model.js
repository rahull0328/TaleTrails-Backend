import mongoose, { Schema } from "mongoose";

const taleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tale: {
      type: String,
      required: true,
    },
    visitedLocation: {
      type: [String],
      default: [],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    visitedDate: {
      type: Date,
      requied: true,
    },
  },
  { timestamps: true }
);

export const Tale = mongoose.model("Tale", taleSchema);