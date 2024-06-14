import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  const { userId } = req.query;
  const { name, email, phone, batch, role } = req.body;

  try {
    await dbConnect();
    const user = await User.findOne({ its: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.batch = batch || user.batch;
    user.role = role || user.role;
    const updatedUser = await user.save();

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
