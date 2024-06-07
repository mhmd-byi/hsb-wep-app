// pages/api/users.js

import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  const users = await User.find();

  res.status(200).json(users);
}
