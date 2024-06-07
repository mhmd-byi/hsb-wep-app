// pages/api/subscribe.js

import dbConnect from "@/utils/dbConnect";
import Subscription from "@/models/Subscription";

export default async function handler(req, res) {
  const { its, subscriptionYears } = req.body;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startDate = new Date(currentYear, 3, 1);
  const endDate = new Date(currentYear + Number(subscriptionYears), 2, 31);

  try {
    await dbConnect();

    const newSubscription = await Subscription.create({
      its,
      subscriptionStartDate: startDate.toISOString().split("T")[0],
      subscriptionEndDate: endDate.toISOString().split("T")[0],
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Subscription created successfully",
        data: newSubscription,
      });
  } catch (error) {
    console.error("Failed to create subscription:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
