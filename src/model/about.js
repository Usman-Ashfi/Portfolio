import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is Required!"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is Required!"],
    },
    img: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
      unique: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: [true, "Phone is Required!"],
      unique: true,
      trim: true,
    },
    tech: [],
    fb: {
      type: String,
      required: [true, "Facebook is Required!"],
      unique: true,
      trim: true,
    },
    insta: {
      type: String,
      required: [true, "Insta is Required!"],
      unique: true,
      trim: true,
    },
    twitter: {
      type: String,
      required: [true, "twitter is Required!"],
      unique: true,
      trim: true,
    },
    git: {
      type: String,
      required: [true, "Github is Required!"],
      unique: true,
      trim: true,
    },
    upw: {
      type: String,
      required: [true, "Upwork is Required!"],
      unique: true,
      trim: true,
    },
    lk: {
      type: String,
      required: [true, "Linkdien is Required!"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.About || mongoose?.model("About", aboutSchema);
