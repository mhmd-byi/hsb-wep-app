// pages/api/users.js

// import dbConnect from "@/utils/dbConnect";
// import User from "@/models/User";

// export default async function handler(req, res) {
//   await dbConnect();

//   const users = await User.find();

//   res.status(200).json(users);
// }

// pages/api/users.js

import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  // Handle POST request for specific user lookup
  if (req.method === "POST") {
    const { userId } = req.body;

    if (!userId) {
      console.log("No user ID provided for POST request");
      return res.status(400).json({ error: "No user ID provided" });
    }

    try {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const user = await User.findOne({ _id: userObjectId });

      if (user) {
        console.log("User found:", user);
        return res.status(200).json({ userExists: true });
      } else {
        console.log("User not found for ID:", userId);
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error in user lookup:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const users = await User.find();
      console.log("Fetching all users");
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  } else {
    console.log("Incorrect method used:", req.method);
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
