import dbConnect from "@/config/mongodb";
import User from "@/models/user";

dbConnect();
export default async function handler(req, res) {
  const users = await User.find({});
  res.status(200).json({ users });
}
