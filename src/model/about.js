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
    tech:[
      
    ]
  },
  { timestamps: true }
);

export default mongoose?.models?.About || mongoose?.model("About", aboutSchema);
