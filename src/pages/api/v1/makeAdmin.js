import dbConnect from "@/config/mongodb";
import User from "@/models/user";

dbConnect();
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, adminId } = req.body;
    const adminUser = await User.findOne({ _id: adminId });

    if (adminUser.role === "admin") {
      await User.findOneAndUpdate({ _id: userId }, { role: "admin" });
      return res.status(200).json({
        data: "updated",
      });
    } else {
      return res.status(400).json({
        data: "no updated",
      });
    }
  }
}
