import { Schema, models, model } from "mongoose";

const UserSchema = new Schema (
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    provider: {
      type: String,
      enum: ["github"],
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", UserSchema);

export default User;
